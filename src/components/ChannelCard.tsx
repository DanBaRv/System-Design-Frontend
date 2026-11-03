import type{ Channel } from '../data/channels'
interface ChannelCardProps {//описание формы оюъекта, в нашем случае - у нашего 
    //объекта будут пропс channel попадает тип  Channel
    channel: Channel
}

export function ChannelCard({ channel }: ChannelCardProps) {
    const DEFAULT_COVER = '/default_cover.jpg'

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #e2e8f0'
    }}>
      {/* Картинка карточки */}
      <img
        src={channel.coverUrl ?? DEFAULT_COVER}
        alt={channel.name}
        style={{
          width: '100%',
          height: '170px',
          objectFit: 'cover'
        }}
      />

      {/* Инфо и кнопка */}
      <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{
          fontWeight: 'bold',
          fontSize: '13px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {channel.name}
        </div>

        {/* Метрики */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
          <span>🔄 412</span>
          <span>👥 {channel.subscribersCount ?? 0}</span>
        </div>

        {/* Кнопка "Удалить" */}
        <button style={{
          marginTop: '4px',
          backgroundColor: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '16px',
          padding: '6px 0',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          Удалить
        </button>
      </div>
    </div>
  )
}