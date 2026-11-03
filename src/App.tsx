import { Navbar } from './components/navbar'
import { useState } from 'react'
import { FeedPage } from './components/feedPage'
import { CatalogPage } from './components/CatalogPage'


function App() {

  const [page, setPage] = useState('feed')

  
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1, overflowY: page === 'feed' ? 'hidden' : 'auto', position: 'relative' }}>
            {/* если  page === 'feed' - истина то риусеум <FeedPage /> ,
            ёёё а это вообще функция
            .а если ложь - ничего*/}
            {page === 'feed' && <FeedPage />}
            {page === 'catalog' && <CatalogPage />}
            </main>


            {/* здесь Navbar - это обращение к ребенку а 
            именно к файлу navbar.tsx и его функиции navbar */}
            {/* здесь page = {page} -   page - просто имя которое мы писали
            в navbar.tsx в интерфейсе , а {page} - переменная полученная из
              const [page, setPage] = useState('feed')
              */}
              {/* сначало мы кликаем по кнпке из навбара, затем там выполняется
              onClick={() => onNavigate('feed') которая смотрит на
              onNavigate: (page: string) => void куда мы передали в App  setPage*/}

            <Navbar page ={page} onNavigate = {setPage} />
        </div>
    )
}

export default App