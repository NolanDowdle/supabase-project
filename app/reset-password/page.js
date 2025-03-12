"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../supabase';
import React from 'react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Extract access_token from the URL hash and update Supabase session
    const extractToken = async () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.replace('#', '?')); // Convert hash to query params
        const accessToken = params.get('access_token');

        if (accessToken) {
          setToken(accessToken);

          // Update Supabase session with the access token
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: params.get('refresh_token'),
          });

          if (error) {
            console.error('Session update failed:', error);
            alert('Session update failed. Try requesting another reset email.');
            router.push('/');
          }
        } else {
          alert('Invalid or expired reset link.');
          router.push('/');
        }
      }
    };

    extractToken();
  }, []);

  const handleResetPassword = async () => {
    if (!password) {
      alert('Please enter a new password.');
      return;
    }
    
    setLoading(true);
    
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      alert(error.message);
    } else {
      alert('Password updated successfully! Please log in.');
      router.push('/');
    }
    
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Reset Password</h1>
      <input
        type="password"
        className="input-field"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn" onClick={handleResetPassword} disabled={loading || !token}>
        {loading ? 'Updating...' : 'Update Password'}
      </button>
    </div>
  );
}
