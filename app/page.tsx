// app/page.tsx - Home/Login Page
'use client';
import { useState } from 'react';
import { supabase } from '../supabase';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function HomePage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
  
    const handleSignUp = async () => {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else alert('Check your email for verification link');
    };
  
    const handleSignIn = async () => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
      else router.push('/dashboard');
    };
  
    const handleForgotPassword = async () => {
        if (!email) {
          alert('Please enter your email to reset your password');
          return;
        }
        
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
      
        if (error) alert(error.message);
        else alert('Check your email for the password reset link');
      };

    const handleSignInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/dashboard`,
        },
    });
    if (error) alert(error.message);
    };
    
      
      
  
    return (
      <div className="container">
        <h1>Login / Sign Up</h1>
        <input type="email" className="input-field" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="input-field" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn" onClick={handleSignIn}>Login</button>
        <button className="btn google-btn" onClick={handleSignInWithGoogle}>Sign in with Google</button>
        <button className="btn btn-alt" onClick={handleSignUp}>Sign Up</button>
        <button className="btn-link" onClick={handleForgotPassword}>Forgot Password?</button>
      </div>
    );
  }
  