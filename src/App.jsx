import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Pendaftaran from './pages/Pendaftaran'
import DaftarPeserta from './pages/DaftarPeserta'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pendaftaran" element={<Pendaftaran />} />
          <Route path="peserta" element={<DaftarPeserta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
