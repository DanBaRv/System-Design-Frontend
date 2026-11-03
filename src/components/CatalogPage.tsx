import { useState } from 'react'
import { channels } from '../data/channels'
import { ChannelCard } from './ChannelCard'
import { Button } from 'react-bootstrap'

export function CatalogPage() {
//сейчас в topic лежит ''


    const[topic, setTopic] = useState('')
    
    const filteredchannel = topic === '' ? channels
    :channels.filter((ch)=>ch.topic === topic)

    return (
    <div style={{ padding: '16px', backgroundColor: '#fff', minHeight: '100%' }}>
      <h2 style={{ fontSize: '20px',  color: '#000000', fontWeight: 'bold', marginBottom: '14px' }}>
        Каталог каналов
      </h2>


      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '12px',
        marginBottom: '12px',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
         flexWrap: 'wrap',
      }}>
        {['', 'Технологии', 'Новости', 'Юмор', 'Бизнес', 'Путешествия'].map((t) => {
          const isActive = topic === t
          return (
            <button
              key={t}
              onClick={() => setTopic(t)}
              style={{
                padding: '6px 8px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                border: isActive ? '1px solid #2563eb' : '1px solid #e2e8f0',
                backgroundColor: isActive ? '#2563eb' : '#f1f5f9',
                color: isActive ? '#fff' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {t === '' ? 'Все' : t}
            </button>
          )
        })}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        paddingBottom: '80px'
      }}>
        {filteredchannel.map((ch) => (
          <ChannelCard key={ch.id} channel={ch} />
        ))}
      </div>
    </div>
  )
}