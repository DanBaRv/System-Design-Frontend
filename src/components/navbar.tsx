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
      className="navbar-bar"
    >
      {/* Лента */}
      <button
        disabled={isBusy}
        onClick={() => onNavigate('feed')}
        style={{
          background: 'none',
          border: 'none',
          color: page === 'feed' ? '#2563eb' : '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          cursor: 'pointer',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        <span style={{ fontSize: '11px' }}>Лента</span>
      </button>

      {/* Добавить */}
      <button
        disabled={!isAuthenticated || isBusy}
        onClick={() => onNavigate('add')}
        style={{
          background: 'none',
          border: 'none',
          color: page === 'add' ? '#2563eb' : isAuthenticated ? '#fff' : '#cbd5e1',
          opacity: isAuthenticated ? 1 : 0.65,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          cursor: isAuthenticated ? 'pointer' : 'not-allowed',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span style={{ fontSize: '11px' }}>Добавить</span>
      </button>

      {/* Каталог */}
      <button
        disabled={isBusy}
        onClick={() => onNavigate('catalog')}
        style={{
          background: 'none',
          border: 'none',
          color: page === 'catalog' || page === 'detail' ? '#2563eb' : '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          cursor: 'pointer',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
        <span style={{ fontSize: '11px' }}>Каталог</span>
      </button>

      {/* Вход / Выход */}
      {isAuthenticated ? (
        <button
          disabled={isBusy}
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            cursor: 'pointer',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span style={{ fontSize: '11px' }}>Выход</span>
        </button>
      ) : (
        <button
          disabled={isBusy}
          onClick={() => onNavigate('auth')}
          style={{
            background: 'none',
            border: 'none',
            color: page === 'auth' ? '#2563eb' : '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            cursor: 'pointer',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span style={{ fontSize: '11px' }}>Вход</span>
        </button>
      )}
    </div>
  );
}