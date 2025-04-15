import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import ServiceOrderCrud from './pages/ServiceOrderCrud';
import AmbientCrud from './pages/AmbientCrud';
import Logout from './pages/Logout';
import MaintainerCrud from './pages/MaintainerCrud';
import HeritageCrud from './pages/HeritageCrud';
import ManagerCrud from './pages/ManagerCrud';
import ResponsibleCrud from './pages/ResponsibleCrud';
import HistoricoCrud from './pages/HistoryCrud';
import Register from './pages/Register';

function App() {
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('jwt_token'));

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100 text-gray-800">
        {/* Sidebar */}
        <aside className="w-64 bg-teal-600 text-white p-6 space-y-6 hidden md:block">
          <div>
            <h1 className="text-2xl font-bold mb-2">Gerenciador</h1>
            <p className="text-sm text-teal-200">Ordens de Serviço</p>
          </div>
          <nav>
            <ul className="space-y-3">
              <li>
                <Link to="/register" className="block hover:text-teal-100">Registrar</Link>
              </li>
              <li>
                <Link to="/login" className="block hover:text-teal-100">Login</Link>
              </li>
              {authenticated && (
                <>
                  <li><Link to="/serviceorder" className="block hover:text-teal-100">Ordens</Link></li>
                  <li><Link to="/maintainer" className="block hover:text-teal-100">Manutentores</Link></li>
                  <li><Link to="/heritage" className="block hover:text-teal-100">Patrimônios</Link></li>
                  <li><Link to="/ambient" className="block hover:text-teal-100">Ambientes</Link></li>
                  <li><Link to="/manager" className="block hover:text-teal-100">Gestores</Link></li>
                  <li><Link to="/responsible" className="block hover:text-teal-100">Responsáveis</Link></li>
                  <li><Link to="/history" className="block hover:text-teal-100">Histórico</Link></li>
                  <li><Link to="/logout" className="block hover:text-teal-100">Sair</Link></li>
                </>
              )}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="bg-white shadow p-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-teal-700">Gerenciador de Ordens</h2>
              <p className="text-sm text-gray-500">Mantenha tudo sob controle</p>
            </div>
          </header>

          <main className="p-6 flex-1 overflow-y-auto">
            <div className="bg-white shadow rounded-lg p-6">
              <Routes>
                <Route path="/register" element={<Register setAuthenticated={setAuthenticated} />} />
                <Route path="/" element={<Login setAuthenticated={setAuthenticated} />} />
                <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
                <Route path="/serviceorder" element={authenticated ? <ServiceOrderCrud /> : <Login setAuthenticated={setAuthenticated} />} />
                <Route path="/maintainer" element={authenticated ? <MaintainerCrud /> : <Login setAuthenticated={setAuthenticated} />} />
                <Route path="/heritage" element={authenticated ? <HeritageCrud /> : <Login setAuthenticated={setAuthenticated} />} />
                <Route path="/ambient" element={authenticated ? <AmbientCrud /> : <Login setAuthenticated={setAuthenticated} />} />
                <Route path="/manager" element={authenticated ? <ManagerCrud /> : <Login setAuthenticated={setAuthenticated} />} />
                <Route path="/responsible" element={authenticated ? <ResponsibleCrud /> : <Login setAuthenticated={setAuthenticated} />} />
                <Route path="/history" element={authenticated ? <HistoricoCrud /> : <Login setAuthenticated={setAuthenticated} />} />
                <Route path="/logout" element={<Logout setAuthenticated={setAuthenticated} />} />
              </Routes>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-gray-200 text-center text-sm text-gray-600 py-3">
            &copy; 2025 Gerenciador de OS. Todos os direitos reservados.
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
