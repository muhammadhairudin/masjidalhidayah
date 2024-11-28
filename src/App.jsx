import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegistrationProvider } from './context/RegistrationContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Pendaftaran from './pages/Pendaftaran'
import DaftarPeserta from './pages/DaftarPeserta'

function App() {
  return (
    <RegistrationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="pendaftaran" element={<Pendaftaran />} />
            <Route path="peserta" element={<DaftarPeserta />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RegistrationProvider>
  )
}

export default App
