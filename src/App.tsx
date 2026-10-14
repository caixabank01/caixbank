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

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('CaixaBank Application Error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // ignore
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 text-slate-900 font-sans">
          <div className="max-w-md w-full bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center space-y-4 shadow-xl">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-100 text-[#007eae] flex items-center justify-center font-black text-xl">
              CB
            </div>
            <h1 className="text-xl font-black text-slate-950">CaixaBank - Banca Privada</h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              Se ha producido una incidencia técnica temporal. Pulse el botón inferior para restablecer la sesión bancaria segura.
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-3 px-4 rounded-2xl bg-[#007eae] hover:bg-[#006a94] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Restablecer y Recargar Página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <BankProvider>
        <MainLayout />
      </BankProvider>
    </ErrorBoundary>
  );
}

