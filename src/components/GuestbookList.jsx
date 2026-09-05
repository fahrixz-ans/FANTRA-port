import { useState } from 'react'
import { data } from '../data/portfolioData'
import ScrollReveal from './ScrollReveal'

function timeAgo(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now - date) / 1000)

  if (seconds < 60) return 'baru saja'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} menit yang lalu`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} jam yang lalu`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} hari yang lalu`
  return date.toLocaleDateString('id-ID')
}

function CommentCard({ comment }) {
  const initial = comment.name ? comment.name.charAt(0).toUpperCase() : '?'

  return (
    <div className="galaxy-card-alt">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-galaxy-primary to-galaxy-secondary flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-galaxy-bg">{initial}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-galaxy-text text-sm">
              {comment.name}
            </span>
            <span className="text-xs text-galaxy-muted">
              {timeAgo(comment.created_at)}
            </span>
          </div>
          <p className="text-galaxy-muted text-sm">{comment.message}</p>
        </div>
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="galaxy-card-alt animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-white/10 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-white/10 rounded w-1/3" />
          <div className="h-3 bg-white/10 rounded w-full" />
          <div className="h-3 bg-white/10 rounded w-2/3" />
        </div>
      </div>
    </div>
  )
}

export default function GuestbookList({ comments, loading, onLoadMore, hasMore }) {
  const guestbook = data.guestbook

  return (
    <div>
      <ScrollReveal>
        <h3 className="text-xl font-bold text-galaxy-text mb-6">
          {guestbook.listHeading}
        </h3>
      </ScrollReveal>

      <div className="space-y-4">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : comments.length === 0 ? (
          <p className="text-galaxy-muted text-center py-8">
            Belum ada komentar. Jadilah yang pertama!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        )}
      </div>

      {hasMore && !loading && (
        <div className="mt-6 text-center">
          <button
            onClick={onLoadMore}
            className="btn-outline text-sm"
          >
            {guestbook.loadMore}
          </button>
        </div>
      )}
    </div>
  )
}
