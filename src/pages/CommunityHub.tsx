import React, { useState, useEffect } from 'react';
import { commentStore, Comment } from '../store/commentStore';
import UserProfile from '../components/UserProfile';
import NotificationsPanel from '../components/NotificationsPanel';

const CommunityHub: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filter, setFilter] = useState<'all' | 'article' | 'reel'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [reportingComment, setReportingComment] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [dateFilterStart, setDateFilterStart] = useState('');
  const [dateFilterEnd, setDateFilterEnd] = useState('');

  // Subscribe to comment updates
  useEffect(() => {
    const updateComments = () => {
      setComments(commentStore.getComments());
      if (currentUser) {
        setUnreadNotifCount(commentStore.getUnreadNotificationCount(currentUser));
      }
    };
    
    // Set a default user if not set
    if (!currentUser) {
      const defaultUser = 'CurrentUser';
      setCurrentUser(defaultUser);
      commentStore.setCurrentUser(defaultUser);
    }
    
    updateComments(); // Initial load
    const unsubscribe = commentStore.subscribe(updateComments);
    return unsubscribe;
  }, [currentUser]);

  const getFilteredComments = () => {
    let filtered = filter === 'all' 
      ? comments 
      : comments.filter(c => c.sourceType === filter);

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = commentStore.searchComments(searchQuery);
      if (filter !== 'all') {
        filtered = filtered.filter(c => c.sourceType === filter);
      }
    }

    // Apply date filter
    if (dateFilterStart && dateFilterEnd) {
      const start = new Date(dateFilterStart);
      const end = new Date(dateFilterEnd);
      filtered = filtered.filter(c => {
        const commentDate = new Date(c.timestamp);
        return commentDate >= start && commentDate <= end;
      });
    }

    return filtered;
  };

  const filteredComments = getFilteredComments();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const handleLikeComment = (commentId: string) => {
    commentStore.likeComment(commentId, currentUser);
  };

  const handleReply = (commentId: string) => {
    if (!replyContent.trim()) return;
    const parentComment = commentStore.findCommentById(commentId);
    if (parentComment) {
      commentStore.addComment({
        author: currentUser,
        content: replyContent,
        sourceType: parentComment.sourceType,
        sourceId: parentComment.sourceId,
        sourceTitle: parentComment.sourceTitle,
      }, commentId);
      setReplyContent('');
      setReplyingTo(null);
    }
  };

  const handleEditComment = (commentId: string) => {
    if (!editContent.trim()) return;
    commentStore.editComment(commentId, editContent, currentUser);
    setEditingComment(null);
    setEditContent('');
  };

  const handleDeleteComment = (commentId: string) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      commentStore.deleteComment(commentId, currentUser);
    }
  };

  const handleReportComment = (commentId: string) => {
    if (!reportReason.trim()) return;
    commentStore.reportComment(commentId, reportReason, currentUser);
    alert('Comment reported. Thank you for helping keep our community safe.');
    setReportingComment(null);
    setReportReason('');
  };

  const renderComment = (comment: Comment, depth: number = 0) => {
    const isOwnComment = comment.author === currentUser;
    const marginLeft = depth > 0 ? `${depth * 2}rem` : '0';

    return (
      <div key={comment.id} style={{ marginLeft }}>
        <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors mb-3">
          <div className="flex items-start space-x-3">
            <div 
              className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 cursor-pointer hover:opacity-80"
              onClick={() => setSelectedUser(comment.author)}
            >
              {getInitials(comment.author)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h4 
                  className="font-semibold text-blue-900 cursor-pointer hover:underline"
                  onClick={() => setSelectedUser(comment.author)}
                >
                  {comment.author}
                </h4>
                <span className="text-xs text-gray-500">{getTimeAgo(comment.timestamp)}</span>
                {comment.edited && (
                  <span className="text-xs text-gray-400 italic">(edited)</span>
                )}
                <span className={`text-xs px-2 py-1 rounded-full ${
                  comment.sourceType === 'article' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {comment.sourceType === 'article' ? '📰 Article' : '🎬 Reel'}
                </span>
                {comment.reported && (
                  <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
                    🚩 Reported
                  </span>
                )}
              </div>

              {editingComment === comment.id ? (
                <div className="mt-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    rows={3}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEditComment(comment.id)}
                      className="px-3 py-1 bg-blue-900 text-white rounded hover:bg-blue-800 text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingComment(null);
                        setEditContent('');
                      }}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-700 mb-2">{comment.content}</p>
                  {depth === 0 && (
                    <p className="text-sm text-gray-500 mb-2">
                      <span className="font-medium">on:</span> {comment.sourceTitle}
                    </p>
                  )}
                </>
              )}

              <div className="flex gap-4 text-sm text-gray-500 flex-wrap">
                <button 
                  onClick={() => handleLikeComment(comment.id)}
                  className={`hover:text-blue-900 transition-colors ${
                    comment.likedBy.includes(currentUser) ? 'text-blue-900 font-semibold' : ''
                  }`}
                >
                  👍 Like ({comment.likes})
                </button>
                <button 
                  onClick={() => setReplyingTo(comment.id)}
                  className="hover:text-blue-900 transition-colors"
                >
                  💬 Reply
                </button>
                {isOwnComment && !editingComment && (
                  <>
                    <button 
                      onClick={() => {
                        setEditingComment(comment.id);
                        setEditContent(comment.content);
                      }}
                      className="hover:text-yellow-600 transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteComment(comment.id)}
                      className="hover:text-red-600 transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </>
                )}
                {!isOwnComment && (
                  <button 
                    onClick={() => setReportingComment(comment.id)}
                    className="hover:text-red-600 transition-colors"
                  >
                    🚩 Report
                  </button>
                )}
                {comment.replies && comment.replies.length > 0 && (
                  <span className="text-gray-400">
                    {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                  </span>
                )}
              </div>

              {/* Reply Form */}
              {replyingTo === comment.id && (
                <div className="mt-3 bg-white p-3 rounded border border-gray-300">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write your reply..."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    rows={2}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleReply(comment.id)}
                      className="px-3 py-1 bg-blue-900 text-white rounded hover:bg-blue-800 text-sm"
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyContent('');
                      }}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Report Form */}
              {reportingComment === comment.id && (
                <div className="mt-3 bg-red-50 p-3 rounded border border-red-200">
                  <p className="text-sm font-semibold text-red-900 mb-2">Report this comment</p>
                  <input
                    type="text"
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    placeholder="Reason for reporting..."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent mb-2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReportComment(comment.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Submit Report
                    </button>
                    <button
                      onClick={() => {
                        setReportingComment(null);
                        setReportReason('');
                      }}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Render Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="space-y-3">
            {comment.replies.map(reply => renderComment(reply, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-md p-6">
        {/* Header with User Info and Notifications */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-bold text-blue-900">Community Hub</h2>
            <p className="text-sm text-gray-600">Welcome, {currentUser}!</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowNotifications(true)}
              className="relative px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              🔔 Notifications
              {unreadNotifCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {unreadNotifCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setSelectedUser(currentUser)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              👤 My Profile
            </button>
          </div>
        </div>

        <p className="text-gray-700 mb-6">
          Connect with fellow Colombians and share your experiences. All comments from articles and reels appear here with reply threading, moderation tools, and more!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">Forums</h3>
            <ul className="space-y-2">
              <li className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">General Discussion</span>
                <span className="text-sm text-gray-500">234 posts</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Culture & Traditions</span>
                <span className="text-sm text-gray-500">189 posts</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Travel Tips</span>
                <span className="text-sm text-gray-500">156 posts</span>
              </li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">Events</h3>
            <div className="space-y-3">
              <div className="bg-yellow-50 rounded p-3">
                <h4 className="font-semibold text-blue-900">Cultural Festival</h4>
                <p className="text-sm text-gray-600">Next Saturday, 3:00 PM</p>
              </div>
              <div className="bg-yellow-50 rounded p-3">
                <h4 className="font-semibold text-blue-900">Community Meetup</h4>
                <p className="text-sm text-gray-600">Next Sunday, 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          {/* Advanced Search and Filters */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  🔍 Search Comments
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by content or author..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    📅 From Date
                  </label>
                  <input
                    type="date"
                    value={dateFilterStart}
                    onChange={(e) => setDateFilterStart(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    📅 To Date
                  </label>
                  <input
                    type="date"
                    value={dateFilterEnd}
                    onChange={(e) => setDateFilterEnd(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            {(searchQuery || dateFilterStart || dateFilterEnd) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setDateFilterStart('');
                  setDateFilterEnd('');
                }}
                className="mt-3 text-sm text-blue-900 hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>

          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h3 className="text-xl font-semibold text-blue-900">Activity Feed ({filteredComments.length})</h3>
            
            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  filter === 'all'
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('article')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  filter === 'article'
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                📰 Articles
              </button>
              <button
                onClick={() => setFilter('reel')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  filter === 'reel'
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🎬 Reels
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredComments.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg mb-2">No activity found!</p>
                <p className="text-gray-400 text-sm">
                  {searchQuery || dateFilterStart || dateFilterEnd
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Comments from News articles and Political Reels will appear here.'}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Visit the <strong>News</strong> or <strong>Reels</strong> section to start commenting!
                </p>
              </div>
            ) : (
              filteredComments.map((comment) => renderComment(comment))
            )}
          </div>
        </div>
      </section>

      {/* User Profile Modal */}
      {selectedUser && (
        <UserProfile 
          username={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <NotificationsPanel 
          username={currentUser}
          onClose={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
};

export default CommunityHub;
