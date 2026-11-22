import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { getChannels, setMinSubscribers, deleteChannel } from '../slices/channelsSlice';
import { ChannelCard } from './ChannelCard';

export function CatalogPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { channels, minSubscribers, loading } = useSelector((s: RootState) => s.channels);
  const { isAuthenticated } = useSelector((s: RootState) => s.auth);

  useEffect(() => {
    dispatch(getChannels());
  }, [dispatch, isAuthenticated]);

  const sliderValue = Number(minSubscribers || 0);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(getChannels());
  };

  return (
    <div style={{ padding: '16px', backgroundColor: '#fff', minHeight: '100%' }}>
      <h2 style={{ fontSize: '20px', color: '#000', fontWeight: 'bold', marginBottom: '12px' }}>
        Каталог каналов
      </h2>

      {/* Карточка ползунка из бэкенда */}
      <form
        onSubmit={handleFilterSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          padding: '12px 14px',
          marginBottom: '16px',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '13px',
              color: '#334155',
              marginBottom: '6px',
            }}
          >
            <span>От подписчиков:</span>
            <span style={{ color: '#2563eb', fontWeight: 600 }}>{sliderValue}</span>
          </div>

          <input
            type="range"
            min={0}
            max={120000}
            step={1000}
            value={sliderValue}
            onChange={(e) => dispatch(setMinSubscribers(e.target.value === '0' ? '' : e.target.value))}
            style={{
              width: '100%',
              accentColor: '#2563eb',
              cursor: 'pointer',
              margin: 0,
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '11px',
              color: '#64748b',
              marginTop: '4px',
            }}
          >
            <span>0</span>
            <span>30k</span>
            <span>60k</span>
            <span>90k</span>
            <span>120k</span>
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1px solid #cbd5e1',
            backgroundColor: '#fff',
            color: '#2563eb',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Показать
        </button>
      </form>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          paddingBottom: '80px',
        }}
      >
        {channels.map((ch) => (
          <ChannelCard
            key={ch.id}
            channel={ch}
            disabled={loading}
            canDelete={isAuthenticated && ch.isMine === 1}
            onDelete={(id) => dispatch(deleteChannel(id))}
          />
        ))}
      </div>
    </div>
  );
}