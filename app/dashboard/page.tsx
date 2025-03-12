// app/dashboard/page.tsx - Protected Dashboard Page
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { useRouter } from 'next/navigation';
import React from 'react';
import SidePanel from '../components/SidePanel';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) router.push('/');
      else setUser(data.user);
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="dashboard-layout">
      <SidePanel />
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        {user && <p>Welcome, {user.email}</p>}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
