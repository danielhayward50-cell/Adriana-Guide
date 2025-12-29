// Advanced comment store with threading, profiles, notifications, and moderation
// In production, this would be replaced with a proper backend and state management solution

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  sourceType: 'article' | 'reel';
  sourceId: number;
  sourceTitle: string;
  likes: number;
  likedBy: string[]; // Track who liked
  parentId?: string; // For reply threading
  replies: Comment[]; // Nested replies
  edited?: boolean;
  editedAt?: Date;
  reported?: boolean;
  reportReason?: string;
  deleted?: boolean;
}

export interface UserProfile {
  username: string;
  commentsCount: number;
  likesReceived: number;
  joinedAt: Date;
  recentActivity: { type: string; timestamp: Date; content: string }[];
}

export interface Notification {
  id: string;
  type: 'reply' | 'like' | 'mention';
  fromUser: string;
  toUser: string;
  commentId: string;
  timestamp: Date;
  read: boolean;
  content: string;
}

class CommentStore {
  private comments: Comment[] = [];
  private listeners: Array<() => void> = [];
  private userProfiles: Map<string, UserProfile> = new Map();
  private notifications: Notification[] = [];
  private currentUser: string = ''; // Tracks the current user session

  setCurrentUser(username: string) {
    this.currentUser = username;
    if (!this.userProfiles.has(username)) {
      this.userProfiles.set(username, {
        username,
        commentsCount: 0,
        likesReceived: 0,
        joinedAt: new Date(),
        recentActivity: [],
      });
    }
  }

  getCurrentUser(): string {
    return this.currentUser;
  }

  addComment(comment: Omit<Comment, 'id' | 'timestamp' | 'likes' | 'likedBy' | 'replies'>, parentId?: string) {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      likes: 0,
      likedBy: [],
      replies: [],
      parentId,
    };

    if (parentId) {
      // Add as a reply to parent comment
      const parent = this.findCommentById(parentId);
      if (parent) {
        parent.replies.push(newComment);
        // Create notification for parent comment author
        if (parent.author !== comment.author) {
          this.addNotification({
            type: 'reply',
            fromUser: comment.author,
            toUser: parent.author,
            commentId: newComment.id,
            content: `${comment.author} replied to your comment`,
          });
        }
      }
    } else {
      // Add as top-level comment
      this.comments.unshift(newComment);
    }

    // Update user profile
    this.updateUserProfile(comment.author, 'comment', newComment.content);
    this.notifyListeners();
    return newComment;
  }

  getComments(): Comment[] {
    return this.comments.filter(c => !c.deleted);
  }

  getCommentsBySource(sourceType: 'article' | 'reel', sourceId: number): Comment[] {
    return this.comments.filter(
      (c) => c.sourceType === sourceType && c.sourceId === sourceId && !c.deleted
    );
  }

  findCommentById(commentId: string): Comment | undefined {
    for (const comment of this.comments) {
      if (comment.id === commentId) return comment;
      const found = this.findInReplies(comment.replies, commentId);
      if (found) return found;
    }
    return undefined;
  }

  private findInReplies(replies: Comment[], commentId: string): Comment | undefined {
    for (const reply of replies) {
      if (reply.id === commentId) return reply;
      const found = this.findInReplies(reply.replies, commentId);
      if (found) return found;
    }
    return undefined;
  }

  likeComment(commentId: string, username: string) {
    const comment = this.findCommentById(commentId);
    if (comment && !comment.likedBy.includes(username)) {
      comment.likes++;
      comment.likedBy.push(username);
      
      // Update user profile who received the like
      const profile = this.userProfiles.get(comment.author);
      if (profile) {
        profile.likesReceived++;
      }

      // Create notification
      if (comment.author !== username) {
        this.addNotification({
          type: 'like',
          fromUser: username,
          toUser: comment.author,
          commentId,
          content: `${username} liked your comment`,
        });
      }

      this.notifyListeners();
    }
  }

  editComment(commentId: string, newContent: string, username: string) {
    const comment = this.findCommentById(commentId);
    if (comment && comment.author === username && !comment.deleted) {
      comment.content = newContent;
      comment.edited = true;
      comment.editedAt = new Date();
      this.notifyListeners();
      return true;
    }
    return false;
  }

  deleteComment(commentId: string, username: string) {
    const comment = this.findCommentById(commentId);
    if (comment && comment.author === username) {
      comment.deleted = true;
      comment.content = '[Comment deleted by user]';
      this.notifyListeners();
      return true;
    }
    return false;
  }

  reportComment(commentId: string, reason: string, username: string) {
    const comment = this.findCommentById(commentId);
    if (comment && comment.author !== username) {
      comment.reported = true;
      comment.reportReason = reason;
      this.notifyListeners();
      return true;
    }
    return false;
  }

  searchComments(query: string): Comment[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllComments().filter(c => 
      !c.deleted && (
        c.content.toLowerCase().includes(lowerQuery) ||
        c.author.toLowerCase().includes(lowerQuery)
      )
    );
  }

  filterCommentsByUser(username: string): Comment[] {
    return this.getAllComments().filter(c => !c.deleted && c.author === username);
  }

  filterCommentsByDateRange(startDate: Date, endDate: Date): Comment[] {
    return this.getAllComments().filter(c => 
      !c.deleted &&
      c.timestamp >= startDate && 
      c.timestamp <= endDate
    );
  }

  private getAllComments(): Comment[] {
    const allComments: Comment[] = [];
    const collectComments = (comments: Comment[]) => {
      for (const comment of comments) {
        allComments.push(comment);
        collectComments(comment.replies);
      }
    };
    collectComments(this.comments);
    return allComments;
  }

  // User Profile Methods
  getUserProfile(username: string): UserProfile | undefined {
    return this.userProfiles.get(username);
  }

  private updateUserProfile(username: string, type: string, content: string) {
    let profile = this.userProfiles.get(username);
    if (!profile) {
      profile = {
        username,
        commentsCount: 0,
        likesReceived: 0,
        joinedAt: new Date(),
        recentActivity: [],
      };
      this.userProfiles.set(username, profile);
    }

    if (type === 'comment') {
      profile.commentsCount++;
    }

    profile.recentActivity.unshift({
      type,
      timestamp: new Date(),
      content: content.slice(0, 100),
    });

    // Keep only last 20 activities
    if (profile.recentActivity.length > 20) {
      profile.recentActivity = profile.recentActivity.slice(0, 20);
    }
  }

  // Notification Methods
  private addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    };
    this.notifications.unshift(newNotification);
    this.notifyListeners();
  }

  getNotifications(username: string): Notification[] {
    return this.notifications.filter(n => n.toUser === username);
  }

  getUnreadNotificationCount(username: string): number {
    return this.notifications.filter(n => n.toUser === username && !n.read).length;
  }

  markNotificationAsRead(notificationId: string) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.notifyListeners();
    }
  }

  markAllNotificationsAsRead(username: string) {
    this.notifications
      .filter(n => n.toUser === username)
      .forEach(n => n.read = true);
    this.notifyListeners();
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }
}

export const commentStore = new CommentStore();
