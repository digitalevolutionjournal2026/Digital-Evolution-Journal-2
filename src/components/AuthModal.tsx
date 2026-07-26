import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  Mail, 
  Lock, 
  ShieldCheck, 
  ExternalLink,
  Award,
  Globe
} from 'lucide-react';

interface AuthModalProps {
  initialMode?: 'signin' | 'register';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  initialMode = 'signin',
  onClose,
}) => {
  const [mode, setMode] = useState<'signin' | 'register'>(initialMode);
  const [role, setRole] = useState<'Author' | 'Reviewer' | 'Editor' | 'Reader'>('Author');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orcid, setOrcid] = useState('');
  const [signedInUser, setSignedInUser] = useState<string | null>(null);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setSignedInUser(email || 'dr.scholar@oxford.ac.uk');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-serif-editorial text-white">
              {mode === 'signin' ? 'Sign In to Digital Evolution' : 'Register Academic Account'}
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Unified Portal for Authors, Reviewers & Editors
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {signedInUser ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-serif-editorial">
              Welcome back, {signedInUser}!
            </h3>
            <p className="text-xs text-slate-500 font-mono">
              Role active: <span className="text-amber-500 font-bold">{role}</span>
            </p>
            <button
              onClick={onClose}
              className="bg-amber-500 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl w-full"
            >
              Enter Workspace Dashboard
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            
            {/* Mode Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setMode('signin')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setMode('register')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* ORCID iD One-Click Login Button */}
            <button
              onClick={() => setSignedInUser('0000-0002-1825-0097')}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span className="bg-white text-emerald-700 font-mono text-[10px] px-1.5 py-0.5 rounded font-bold">
                iD
              </span>
              <span>Sign In with ORCID iD</span>
            </button>

            <div className="flex items-center gap-3 text-xs text-slate-400 my-2">
              <div className="h-[1px] bg-slate-200 dark:bg-slate-800 flex-1" />
              <span>or use email</span>
              <div className="h-[1px] bg-slate-200 dark:bg-slate-800 flex-1" />
            </div>

            {/* Form */}
            <form onSubmit={handleAuth} className="space-y-4 text-xs">
              
              {mode === 'register' && (
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-mono font-bold uppercase mb-1">
                    Primary Academic Role:
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-semibold focus:outline-none focus:border-amber-500"
                  >
                    <option value="Author">Author (Submit Manuscripts)</option>
                    <option value="Reviewer">Reviewer (Earn RRI Credential)</option>
                    <option value="Editor">Journal Editor</option>
                    <option value="Reader">Reader / Scholar</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono font-bold uppercase mb-1">
                  Institutional Email:
                </label>
                <input
                  type="email"
                  required
                  placeholder="author@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-mono font-bold uppercase mb-1">
                  Password:
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-mono font-bold uppercase mb-1">
                    ORCID iD (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="0000-0002-1825-0097"
                    value={orcid}
                    onChange={(e) => setOrcid(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer shadow-md"
              >
                {mode === 'signin' ? 'Sign In to Account' : 'Complete Registration'}
              </button>

            </form>

          </div>
        )}

      </div>
    </div>
  );
};
