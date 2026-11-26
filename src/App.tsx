import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import { Navbar } from './components/navbar';
import { FeedPage } from './components/feedPage';
import { CatalogPage } from './components/CatalogPage';
import { AddChannelPage } from './components/AddChannelPage';
import { AuthPage } from './components/AuthPage';
import { LoadingOverlay } from './components/LoadingOverlay';
import { ChannelDetailPage } from './components/ChannelDetailPage';

function App() {
  const [page, setPage] = useState('feed');
  const channelsLoading = useSelector((s: RootState) => s.channels.loading);
  const authLoading = useSelector((s: RootState) => s.auth.loading);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <LoadingOverlay visible={channelsLoading || authLoading} />

      <main style={{ flex: 1, overflowY: page === 'feed' ? 'hidden' : 'auto', position: 'relative' }}>
        {page === 'feed' && <FeedPage />}
        {page === 'catalog' && <CatalogPage onOpenDetail={() => setPage('detail')} />}
        {page === 'detail' && <ChannelDetailPage onBack={() => setPage('catalog')} />}        {page === 'add' && <AddChannelPage onPublished={() => setPage('catalog')} />}
        {page === 'auth' && <AuthPage onSuccess={() => setPage('feed')} />}

      </main>

      <Navbar page={page} onNavigate={setPage} />
    </div>
  );
}

export default App;