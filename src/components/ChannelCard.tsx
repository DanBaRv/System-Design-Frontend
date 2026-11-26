import type { ChannelResponseDto } from '../api/Api';
import { mediaUrl } from '../helpers/mediaUrl';

interface ChannelCardProps {
  channel: ChannelResponseDto;
  canDelete: boolean;
  disabled: boolean;
  onDelete: (id: number) => void;
  onOpenDetail: (channel: ChannelResponseDto) => void;
}

export function ChannelCard({ channel, canDelete, disabled, onDelete, onOpenDetail }: ChannelCardProps) {
  return (
    <div className="channel-card-item">
      <img
        src={mediaUrl(channel.coverUrl, '/default_cover.jpg')}
        alt={channel.name}
        className="channel-card-img"
        onClick={() => onOpenDetail(channel)}
      />

      <div className="channel-card-body">
        <div className="channel-card-title">{channel.name}</div>

        <div className="channel-card-metrics">
          <span>📊 {channel.averageReach ?? 0}</span>
          <span>👥 {channel.subscribersCount ?? 0}</span>
        </div>

        <div className="channel-card-actions">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onOpenDetail(channel)}
            className="btn-detail"
          >
            Подробнее
          </button>

          {canDelete && (
            <button
              type="button"
              disabled={disabled}
              onClick={() => onDelete(channel.id)}
              className="btn-delete"
            >
              Удалить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}