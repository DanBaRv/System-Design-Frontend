import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { loginSuccess, setAuthError, setAuthLoading } from '../slices/authSlice';

export function AuthPage({ onSuccess }: { onSuccess: () => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((s: RootState) => s.auth);

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [info, setInfo] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setAuthError(null));
    setInfo(null);
    dispatch(setAuthLoading(true));

    try {
      if (isRegister) {
        await axios.post('/api/users/registration', { name, email, password }, { withCredentials: true });
        setInfo('Регистрация успешна! Теперь войдите.');
        setIsRegister(false);
      } else {
        const res = await axios.post('/api/users/login', { email, password }, { withCredentials: true });
        dispatch(loginSuccess(res.data.user));
        onSuccess();
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Ошибка авторизации';
      dispatch(setAuthError(Array.isArray(msg) ? msg.join(', ') : msg));
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  return (
    <div style={{ padding: '24px 16px', backgroundColor: '#fff', minHeight: '100%', color: '#000' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#000', marginBottom: '16px' }}>
        {isRegister ? 'Регистрация' : 'Вход в аккаунт'}
      </h2>

      {error && <div style={{ color: '#dc2626', fontSize: '13px', marginBottom: '10px' }}>{error}</div>}
      {info && <div style={{ color: '#16a34a', fontSize: '13px', marginBottom: '10px' }}>{info}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {isRegister && (
          <input
            required
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        )}
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          required
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          disabled={loading}
          type="submit"
          style={{
            padding: '12px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#2563eb',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          {isRegister ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>

      <button
        type="button"
        disabled={loading}
        onClick={() => {
          setIsRegister(!isRegister);
          dispatch(setAuthError(null));
        }}
        style={{
          marginTop: '14px',
          background: 'none',
          border: 'none',
          color: '#2563eb',
          fontSize: '13px',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
      </button>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderRadius: '10px',
  border: '1px solid #cbd5e1',
  backgroundColor: '#ffffff',
  color: '#0f172a',
  colorScheme: 'light',
  fontSize: '14px',
};