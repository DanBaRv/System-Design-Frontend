import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { deleteChannel } from '../slices/channelsSlice';
import { mediaUrl } from '../helpers/mediaUrl';

export function ChannelDetailPage({ onBack }: { onBack: () => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedChannel, loading } = useSelector((s: RootState) => s.channels);
  const { isAuthenticated } = useSelector((s: RootState) => s.auth);

  if (!selectedChannel) {
    return (
      <div className="detail-page">
        <button type="button" onClick={onBack} className="detail-back-btn">
          ← Назад к каталогу
        </button>
        <p style={{ color: '#0f172a', marginTop: '16px' }}>Канал не выбран.</p>
      </div>
    );
  }

  const canDelete = isAuthenticated && selectedChannel.isMine === 1;

  const handleDelete = async () => {
    await dispatch(deleteChannel(selectedChannel.id));
    onBack();
  };

  return (
    <div className="detail-page">
      <button type="button" onClick={onBack} className="detail-back-btn">
        ← Назад к каталогу
      </button>

      <div className="detail-layout">
        <div className="detail-media-col">
          <img
            src={mediaUrl(selectedChannel.coverUrl, '/default_cover.jpg')}
            alt={selectedChannel.name}
            className="detail-cover"
          />
          <video
            src={mediaUrl(selectedChannel.videoUrl, '/default_video.mp4')}
            poster={mediaUrl(selectedChannel.coverUrl, '/default_cover.jpg')}
            controls
            playsInline
            className="detail-video"
          />
        </div>

        <div className="detail-info-col">
          <h2 className="page-title" style={{ marginBottom: '8px' }}>
            {selectedChannel.name}
          </h2>

          {selectedChannel.topic && (
            <div className="detail-topic">{selectedChannel.topic}</div>
          )}

          <div className="detail-stats-grid">
            <div className="detail-stat-box">
              <span className="detail-stat-label">👥 Подписчиков</span>
              <strong className="detail-stat-num">{selectedChannel.subscribersCount ?? 0}</strong>
            </div>
            <div className="detail-stat-box">
              <span className="detail-stat-label">📊 Средний охват</span>
              <strong className="detail-stat-num">{selectedChannel.averageReach ?? 0}</strong>
            </div>
            {selectedChannel.likes !== undefined && (
              <div className="detail-stat-box">
                <span className="detail-stat-label">❤️ Лайков</span>
                <strong className="detail-stat-num">{selectedChannel.likes}</strong>
              </div>
            )}
          </div>

          <div className="detail-desc">
            {selectedChannel.description || 'Описание отсутствует'}
          </div>

          {canDelete && (
            <button
              type="button"
              disabled={loading}
              onClick={handleDelete}
              className="btn-delete"
              style={{ marginTop: '16px', padding: '10px 16px' }}
            >
              Удалить канал
            </button>
          )}
        </div>
      </div>
    </div>
  );
}