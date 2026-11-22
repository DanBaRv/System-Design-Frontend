import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { logoutSuccess, setAuthLoading } from '../slices/authSlice';
import { clearDraft, resetFilters } from '../slices/channelsSlice';

interface NavbarProps {
  page: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ page, onNavigate }: NavbarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading: authLoading } = useSelector((s: RootState) => s.auth);
  const channelsLoading = useSelector((s: RootState) => s.channels.loading);
  const isBusy = authLoading || channelsLoading;

  const handleLogout = async () => {
    dispatch(setAuthLoading(true));
    try {
      await axios.post('/api/users/logout', {}, { withCredentials: true });
    } finally {
      dispatch(logoutSuccess());
      dispatch(resetFilters());
      dispatch(clearDraft());
      dispatch(setAuthLoading(false));
      if (page === 'add') onNavigate('feed');
    }
  };

  return (
    <div
      style={{
        height: '65px',
        backgroundColor: '#1e293b',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 100,
        color: '#fff',
        borderTop: '1px solid #334155',
      }}
    >
      <button
        disabled={isBusy}
        onClick={() => onNavigate('feed')}
        style={{
          background: 'none',
          border: 'none',
          color: page === 'feed' ? '#60a5fa' : '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: '18px' }}>▶️</span>
        <span style={{ fontSize: '11px' }}>Лента</span>
      </button>

      <button
        disabled={!isAuthenticated || isBusy}
        onClick={() => onNavigate('add')}
        title={!isAuthenticated ? 'Доступно после входа' : 'Добавить канал'}
        style={{
          background: 'none',
          border: 'none',
          color: page === 'add' ? '#60a5fa' : isAuthenticated ? '#fff' : '#64748b',
          opacity: isAuthenticated ? 1 : 0.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          cursor: isAuthenticated ? 'pointer' : 'not-allowed',
        }}
      >
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>＋</span>
        <span style={{ fontSize: '11px' }}>Добавить</span>
      </button>

      <button
        disabled={isBusy}
        onClick={() => onNavigate('catalog')}
        style={{
          background: 'none',
          border: 'none',
          color: page === 'catalog' ? '#60a5fa' : '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: '18px' }}>▦</span>
        <span style={{ fontSize: '11px' }}>Каталог</span>
      </button>

      {isAuthenticated ? (
        <button
          disabled={isBusy}
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            color: '#f87171',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: '18px' }}>🚪</span>
          <span style={{ fontSize: '11px' }}>Выход</span>
        </button>
      ) : (
        <button
          disabled={isBusy}
          onClick={() => onNavigate('auth')}
          style={{
            background: 'none',
            border: 'none',
            color: page === 'auth' ? '#60a5fa' : '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: '18px' }}>👤</span>
          <span style={{ fontSize: '11px' }}>Вход</span>
        </button>
      )}
    </div>
  );
}