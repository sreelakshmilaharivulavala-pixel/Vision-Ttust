import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@visiontrust.ai');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await login({ email, password });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <div className="glass-panel w-full max-w-5xl overflow-hidden rounded-[28px] border border-slate-800/80">
        <div className="grid md:grid-cols-2">
          <div className="bg-gradient-to-br from-cyan-500/25 via-slate-900 to-violet-500/15 p-8 md:p-10">
            <div className="mb-8 flex items-center gap-3 text-cyan-300">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/15 ring-1 ring-cyan-400/40">
                <ShieldCheck size={22} />
              </div>
              <span className="text-2xl font-semibold text-white">VisionTrust</span>
            </div>

            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Welcome back</p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-white">
              Trustworthy computer vision integrity assurance.
            </h1>
            <p className="mt-5 max-w-md text-base text-slate-300">
              Monitor model trust, image authenticity, contributor accountability, and evidence trails across your full AI pipeline.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col justify-center p-6 md:p-10">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Secure access</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Sign in to your workspace</h2>

            <div className="mt-8 space-y-4 text-sm">
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="form-input"
                  placeholder="admin@visiontrust.ai"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="form-input"
                  placeholder="Enter your password"
                />
              </label>
            </div>

            {error && <p className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{error}</p>}

            <button
              type="submit"
              className="primary-button mt-8 w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Enter dashboard'}
              {!loading && <ArrowRight size={18} />}
            </button>

            <p className="mt-6 text-center text-sm text-slate-400">
              New here?{' '}
              <Link to="/register" className="font-medium text-cyan-300 transition hover:text-cyan-200">
                Create account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
