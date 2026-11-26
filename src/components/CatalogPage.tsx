import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import type { ChannelResponseDto } from '../api/Api';
import { getChannels, setMinSubscribers, deleteChannel, setSelectedChannel } from '../slices/channelsSlice';
import { ChannelCard } from './ChannelCard';

export function CatalogPage({ onOpenDetail }: { onOpenDetail: () => void }) {
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

  const handleOpenDetail = (channel: ChannelResponseDto) => {
    dispatch(setSelectedChannel(channel));
    onOpenDetail();
  };

  return (
    <div className="catalog-page">
      <h2 className="page-title">Каталог каналов</h2>

      <form onSubmit={handleFilterSubmit} className="catalog-filter-card">
        <div className="catalog-filter-slider-wrap">
          <div className="catalog-filter-header">
            <span>От подписчиков:</span>
            <span className="catalog-filter-value">{sliderValue}</span>
          </div>

          <input
            type="range"
            min={0}
            max={120000}
            step={1000}
            value={sliderValue}
            onChange={(e) => dispatch(setMinSubscribers(e.target.value === '0' ? '' : e.target.value))}
            className="catalog-range-input"
          />

          <div className="catalog-range-ticks">
            <span>0</span>
            <span>30k</span>
            <span>60k</span>
            <span>90k</span>
            <span>120k</span>
          </div>
        </div>

        <button disabled={loading} type="submit" className="catalog-filter-btn">
          Показать
        </button>
      </form>

      <div className="catalog-grid-adaptive">
        {channels.map((ch) => (
          <ChannelCard
            key={ch.id}
            channel={ch}
            disabled={loading}
            canDelete={isAuthenticated && ch.isMine === 1}
            onDelete={(id) => dispatch(deleteChannel(id))}
            onOpenDetail={handleOpenDetail}
          />
        ))}
      </div>
    </div>
  );
}