import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password || !form.confirmPassword) {
      setError('Please complete all fields.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      setSuccess('Account created successfully. Redirecting to login...');
      setTimeout(() => navigate('/login', { replace: true }), 1200);
    } catch (err) {
      setError(err.message || 'Unable to create account.');
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

            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Create account</p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-white">
              Build trust into every AI decision.
            </h1>
            <p className="mt-5 max-w-md text-base text-slate-300">
              Secure your workspace, verify provenance, and track the integrity of your models, images, and evidence pipelines.
            </p>

            <div className="mt-8 space-y-3 text-sm text-slate-200">
              {[
                'Model integrity monitoring',
                'Evidence-backed verification',
                'Contributor accountability and audit trails',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-700/80 bg-slate-950/25 px-3 py-2.5">
                  <CheckCircle2 className="text-emerald-300" size={16} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col justify-center p-6 md:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Secure access</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Register your account</h2>

            <div className="mt-8 space-y-4 text-sm">
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">Full name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Jane Smith"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">Email</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="jane@visiontrust.ai"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">Password</span>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Create a strong password"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">Confirm password</span>
                <input
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Confirm your password"
                />
              </label>
            </div>

            {error && <p className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{error}</p>}
            {success && <p className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">{success}</p>}

            <button type="submit" className="primary-button mt-8 w-full justify-center disabled:cursor-not-allowed disabled:opacity-70" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
              {!loading && <ArrowRight size={18} />}
            </button>

            <p className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-cyan-300 transition hover:text-cyan-200">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
