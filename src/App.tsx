import React from 'react';
import { BankProvider, useBank } from './context/BankContext';
import { Navbar } from './components/common/Navbar';
import { AuthPage } from './components/auth/AuthPage';
import { UserSpace } from './components/user/UserSpace';
import { AdminSpace } from './components/admin/AdminSpace';

const MainLayout: React.FC = () => {
  const { currentUser, t } = useBank();

  return (
    <div
      className={`min-h-screen flex flex-col font-sans selection:bg-[#007eae] selection:text-white ${
        currentUser && currentUser.role === 'admin'
          ? 'bg-[#f8fafc] text-slate-900'
          : currentUser && currentUser.role === 'user'
          ? 'bg-[#f3f5f8] text-slate-800'
          : 'bg-white text-slate-900'
      }`}
    >
      <Navbar />

      <main className="flex-1">
        {!currentUser ? (
          <AuthPage />
        ) : currentUser.role === 'admin' ? (
          <AdminSpace />
        ) : (
          <UserSpace />
        )}
      </main>

      {/* Footer displayed on auth page or in admin space with pure white executive design */}
      {(!currentUser || currentUser.role === 'admin') && (
        <footer className="border-t border-slate-200/90 bg-white py-5 px-4 text-center text-xs text-slate-600 shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-800 font-bold">
              <span>CaixaBank, S.A.</span>
              <span>· Capital social 5.980.000.000 €</span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              Supervisión Banco de España / BCE #2100 · Garantía FGD 100.000 € · Cifrado bancario AES-256
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default function App() {
  return (
    <BankProvider>
      <MainLayout />
    </BankProvider>
  );
}
