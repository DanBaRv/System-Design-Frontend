import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { getDraft, createDraft, publishChannel, getChannels } from '../slices/channelsSlice';
import { mediaUrl } from '../helpers/mediaUrl';

export function AddChannelPage({ onPublished }: { onPublished: () => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const { draftChannel, loading, error } = useSelector((s: RootState) => s.channels);

  // Шаг 1: черновик
  const [draftName, setDraftName] = useState('');
  const [cover, setCover] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  // Шаг 2: публикация
  const [pubName, setPubName] = useState('');
  const [subscribersCount, setSubscribersCount] = useState('');
  const [averageReach, setAverageReach] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(getDraft());
  }, [dispatch]);

  useEffect(() => {
    if (draftChannel) {
      setPubName(draftChannel.name ?? '');
      setSubscribersCount(draftChannel.subscribersCount ? String(draftChannel.subscribersCount) : '');
      setAverageReach(draftChannel.averageReach ? String(draftChannel.averageReach) : '');
      setDescription(draftChannel.description ?? '');
    }
  }, [draftChannel]);

  const handleCreateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftName || !cover || !video) return;
    dispatch(createDraft({ name: draftName, cover, video }));
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await dispatch(
      publishChannel({
        name: pubName,
        subscribersCount: Number(subscribersCount),
        averageReach: Number(averageReach),
        description,
      }),
    );
    if (publishChannel.fulfilled.match(res)) {
      dispatch(getChannels());
      onPublished();
    }
  };

  return (
    <div style={{ padding: '16px', backgroundColor: '#fff', minHeight: '100%', color: '#0f172a' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '14px' }}>
        {draftChannel ? 'Публикация канала' : 'Новый канал (черновик)'}
      </h2>

      {error && (
        <div style={{ color: '#dc2626', fontSize: '13px', marginBottom: '10px' }}>{error}</div>
      )}

      {!draftChannel ? (
        <form onSubmit={handleCreateDraft} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{ fontSize: '13px' }}>
            Название канала
            <input
              required
              type="text"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="Например: Техноблог"
              style={inputStyle}
            />
          </label>

          <label style={{ fontSize: '13px' }}>
            Обложка (изображение)
            <input
              required
              type="file"
              accept="image/*"
              onChange={(e) => setCover(e.target.files?.[0] ?? null)}
              style={{ display: 'block', marginTop: '4px' }}
            />
          </label>

          <label style={{ fontSize: '13px' }}>
            Видеопрезентация (.mp4)
            <input
              required
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files?.[0] ?? null)}
              style={{ display: 'block', marginTop: '4px' }}
            />
          </label>

          <button disabled={loading || !draftName || !cover || !video} type="submit" style={btnStyle}>
            Далее (создать черновик)
          </button>
        </form>
      ) : (
        <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <img
            src={mediaUrl(draftChannel.coverUrl)}
            alt="Обложка черновика"
            style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '12px' }}
          />

          <label style={{ fontSize: '13px' }}>
            Название
            <input
              required
              type="text"
              value={pubName}
              onChange={(e) => setPubName(e.target.value)}
              style={inputStyle}
            />
          </label>

          <label style={{ fontSize: '13px' }}>
            Количество подписчиков
            <input
              required
              type="number"
              min={0}
              value={subscribersCount}
              onChange={(e) => setSubscribersCount(e.target.value)}
              style={inputStyle}
            />
          </label>

          <label style={{ fontSize: '13px' }}>
            Средний охват поста
            <input
              required
              type="number"
              min={0}
              value={averageReach}
              onChange={(e) => setAverageReach(e.target.value)}
              style={inputStyle}
            />
          </label>

          <label style={{ fontSize: '13px' }}>
            Описание
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={inputStyle}
            />
          </label>

          <button disabled={loading} type="submit" style={btnStyle}>
            Опубликовать
          </button>
        </form>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  marginTop: '4px',
  padding: '8px 10px',
  borderRadius: '10px',
  border: '1px solid #cbd5e1',
  fontSize: '14px',
};

const btnStyle: React.CSSProperties = {
  padding: '12px',
  borderRadius: '12px',
  border: 'none',
  backgroundColor: '#2563eb',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '14px',
  cursor: 'pointer',
};