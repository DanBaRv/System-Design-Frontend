import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { getFeed, setLike } from '../slices/channelsSlice';
import { mediaUrl } from '../helpers/mediaUrl';

export function FeedPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { feedChannel, loading } = useSelector((s: RootState) => s.channels);
  const { isAuthenticated } = useSelector((s: RootState) => s.auth);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(getFeed({}));
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    setExpanded(false);
  }, [feedChannel?.id]);

  const handleNext = () => {
    if (!feedChannel) return;
    dispatch(getFeed({ id: String(feedChannel.id), next: true }));
  };

  const handleLike = () => {
    if (!feedChannel || !isAuthenticated) return;
    const nextValue = feedChannel.liked === 1 ? 0 : 1;
    dispatch(setLike({ id: feedChannel.id, value: nextValue }));
  };

  if (!feedChannel) {
    return (
      <div style={{ padding: '24px', color: '#fff', backgroundColor: '#000', height: '100%' }}>
        Нет доступных каналов
      </div>
    );
  }

  const desc = feedChannel.description ?? '';
  const isLong = desc.length > 75;
  const shownDesc = expanded || !isLong ? desc : `${desc.slice(0, 75)}...`;

  return (
    <div className="feed-wrapper">
      <div className="feed-player">
        <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#000', color: '#fff', overflow: 'hidden' }}>
          <video
            key={feedChannel.id}
            src={mediaUrl(feedChannel.videoUrl, '/default_video.mp4')}
            poster={mediaUrl(feedChannel.coverUrl, '/default_cover.jpg')}
            autoPlay
            muted
            loop
            playsInline
            className="feed-video-el"
          />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 18%, transparent 55%)',
            }}
          />

          {/* Правая колонка: Лайк, Подписчики, Охват, След. */}
          <div
            style={{
              position: 'absolute',
              right: '12px',
              bottom: '22px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              zIndex: 5,
            }}
          >
            {/* Лайк */}
            <button
              disabled={!isAuthenticated || loading}
              onClick={handleLike}
              title={isAuthenticated ? 'Поставить / снять лайк' : 'Войдите, чтобы поставить лайк'}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: isAuthenticated ? 'pointer' : 'not-allowed',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                padding: 0,
                opacity: isAuthenticated ? 1 : 0.8,
              }}
            >
              <span style={{ fontSize: '28px', lineHeight: 1 }}>
                {feedChannel.liked === 1 ? '❤️' : '🤍'}
              </span>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{feedChannel.likes ?? 0}</span>
            </button>

            {/* Подписчики */}
            <div style={statBoxStyle}>
              <div style={{ fontSize: '15px' }}>👥</div>
              <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
                {feedChannel.subscribersCount ?? 0}
              </div>
            </div>

            {/* Средний охват */}
            <div style={statBoxStyle}>
              <div style={{ fontSize: '15px' }}>📊</div>
              <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
                {feedChannel.averageReach ?? 0}
              </div>
            </div>

            {/* Кнопка След. */}
            <button
              disabled={loading}
              onClick={handleNext}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: 0,
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  border: '2px solid #fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(0,0,0,0.35)',
                }}
              >
                ➔
              </div>
              <span style={{ fontSize: '12px', fontWeight: '500' }}>След.</span>
            </button>
          </div>

          {/* Нижний левый блок: название и описание */}
          <div
            style={{
              position: 'absolute',
              left: '14px',
              right: '86px',
              bottom: '22px',
              zIndex: 5,
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '4px' }}>
              {feedChannel.name}
            </div>
            {desc && (
              <p style={{ fontSize: '13px', color: '#f1f5f9', lineHeight: '1.35', margin: 0 }}>
                {shownDesc}{' '}
                {isLong && (
                  <span
                    onClick={() => setExpanded(!expanded)}
                    style={{ color: '#3b82f6', cursor: 'pointer', fontWeight: 500 }}
                  >
                    {expanded ? 'свернуть' : 'ещё'}
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
          </div>
    </div>
  );
}

const statBoxStyle: React.CSSProperties = {
  backgroundColor: 'rgba(15, 23, 42, 0.78)',
  borderRadius: '12px',
  padding: '6px 8px',
  minWidth: '52px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2px',
};