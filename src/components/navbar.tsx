//import { Button } from 'react-bootstrap'

// 2. Пропс
//а это именно интерфейс-то есть обложка пропса, с его уникальным именем, типо паспорт
interface NavbarProps {
    //вот это внизу пропсы, это коробка в которой могут быть
    //данные,функции
    page: string//это данные и ниже это функция  пропса, то естьполезная нагрузка
    onNavigate: (page: string) => void// функция принимающая строку и возвращает ничего
}

// 3. Сам компонент
export function Navbar({ page, onNavigate }: NavbarProps) {
  return (
    <div style={{
      height: '65px',
      backgroundColor: '#727c8d',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 100,
      color: '#fff'
    }}>
      {/* Кнопка Лента */}
      <button 
        onClick={() => onNavigate('feed')}
        style={{
          background: 'none', border: 'none', color: page === 'feed' ? '#2563eb' : '#fff',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        <span style={{ fontSize: '11px' }}>Лента</span>
      </button>

      {/* Кнопка Добавить */}
      <button 
        disabled
        style={{
          background: 'none', border: 'none', color: '#cbd5e1',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', opacity: 0.8
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span style={{ fontSize: '11px' }}>Добавить</span>
      </button>

      {/* Кнопка Каталог */}
      <button 
        onClick={() => onNavigate('catalog')}
        style={{
          background: 'none', border: 'none', color: page === 'catalog' ? '#2563eb' : '#fff',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
        <span style={{ fontSize: '11px' }}>Каталог</span>
      </button>
    </div>
  )
}