import type { ChannelResponseDto } from '../api/Api';
import { mediaUrl } from '../helpers/mediaUrl';

interface ChannelCardProps {
  channel: ChannelResponseDto;
  canDelete: boolean;
  disabled: boolean;
  onDelete: (id: number) => void;
}

export function ChannelCard({ channel, canDelete, disabled, onDelete }: ChannelCardProps) {
  return (
    <div
      style={{
        backgroundColor: '#f8fafc',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e2e8f0',
      }}
    >
      <img
        src={mediaUrl(channel.coverUrl, '/default_cover.jpg')}
        alt={channel.name}
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
      />

      <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '13px',
            color: '#0f172a',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {channel.name}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
          <span>📊 {channel.averageReach ?? 0}</span>
          <span>👥 {channel.subscribersCount ?? 0}</span>
        </div>

        {canDelete && (
          <button
            disabled={disabled}
            onClick={() => onDelete(channel.id)}
            style={{
              marginTop: 'auto',
              backgroundColor: '#dc2626',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '6px 0',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            Удалить
          </button>
        )}
      </div>
    </div>
  );
}