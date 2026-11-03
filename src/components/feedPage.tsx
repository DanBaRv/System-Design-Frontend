import { channels } from '../data/channels'
import { useState } from 'react'

export function FeedPage() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const channel = channels[currentIndex] || channels[0]
    const nextChannel = () => {
    setCurrentIndex((prev) => (prev + 1) % channels.length)
  }
return (
    <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#000', color: '#fff', overflow: 'hidden' }}>
      {/* Фоновое видео / обложка */}
<video 
    src={channel.videoUrl ?? '/default_video.mp4'}
    autoPlay
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 20%, transparent 60%)' }} />

      <div style={{ position: 'absolute', right: '12px', bottom: '90px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '24px' }}>🤍</span>
          <div style={{ fontSize: '12px' }}>1</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '24px' }}>💬</span>
          <div style={{ fontSize: '12px' }}>324</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '22px' }}>↗️</span>
          <div style={{ fontSize: '12px' }}>892</div>
        </div>
        <div>
          <span style={{ fontSize: '20px' }}>•••</span>
        </div>
        <div>
          <span style={{ fontSize: '20px' }}>🔊</span>
        </div>
      </div>

      {/* 3. Информационный блок над кнопкой */}
      <div style={{
        position: 'absolute',
        left: '16px',
        right: '65px', /* оставляем отступ справа под колонку с иконками */
        bottom: '80px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {/* Статистика */}
        <div style={{
          marginLeft: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
          fontSize: '13px'
        }}>
          <div>👥 Подписчиков: <b>{channel.subscribersCount ?? 123657}</b></div>
          <div>📊 Средний охват: <b>{channel.averageReach ?? 123657}</b></div>
          <div>💰 Цена поста: <b>{channel.adPrice ?? 123657}₽</b></div>
        </div>

        {/* Текст описания */}
        <p style={{ fontSize: '12px', color: '#fff', lineHeight: '1.3', margin: 0 }}>
          Самые важные новости за день, кратко и по делу без воды. Следим за главными...{' '}
          <span style={{ color: '#38bdf8', cursor: 'pointer', textDecoration: 'underline' }}>ещё</span>
        </p>
      </div>

      {/*Следующий канал */}
      <div style={{ position: 'absolute', bottom: '15px', left: '16px', right: '16px' }}>
        <button
          onClick={nextChannel}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#1d4ed8',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '15px',
            cursor: 'pointer'
          }}
        >
          Следующий канал
        </button>
      </div>
    </div>
  )
}