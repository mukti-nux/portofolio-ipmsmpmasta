import React, { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      alert('Registrasi berhasil! Cek email untuk verifikasi.');
      window.location.href = '/'; // atau langsung redirect ke login/dashboard
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <form
        onSubmit={handleRegister}
        className="bg-card p-8 rounded-lg shadow-md w-full max-w-sm space-y-6 border border-border"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        {errorMsg && (
          <div className="bg-destructive/10 text-destructive p-2 rounded text-sm">
            {errorMsg}
          </div>
        )}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-brand-primary text-white py-2 rounded font-semibold hover:bg-brand-primary/90 transition"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
