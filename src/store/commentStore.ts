// Simple in-memory store for comments
// In production, this would be replaced with a proper state management solution (Redux, Zustand, etc.)

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  sourceType: 'article' | 'reel';
  sourceId: number;
  sourceTitle: string;
  likes: number;
}

class CommentStore {
  private comments: Comment[] = [];
  private listeners: Array<() => void> = [];

  addComment(comment: Omit<Comment, 'id' | 'timestamp' | 'likes'>) {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      likes: 0,
    };
    this.comments.unshift(newComment);
    this.notifyListeners();
    return newComment;
  }

  getComments(): Comment[] {
    return [...this.comments];
  }

  getCommentsBySource(sourceType: 'article' | 'reel', sourceId: number): Comment[] {
    return this.comments.filter(
      (c) => c.sourceType === sourceType && c.sourceId === sourceId
    );
  }

  likeComment(commentId: string) {
    const comment = this.comments.find((c) => c.id === commentId);
    if (comment) {
      comment.likes++;
      this.notifyListeners();
    }
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
