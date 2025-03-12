// app/components/SidePanel.tsx
'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const words = [
  'React', 'Supabase', 'Next.js', 'JavaScript', 'TypeScript', 
  'Node.js', 'Authentication', 'Dashboard', 'Security', 'Performance'
];

export default function SidePanel() {
  const router = useRouter();

  return (
    <div className="side-panel">
      <h3>Topics</h3>
      <ul>
        {words.map((word, index) => (
          <li key={index}>
            <a href={`/topics/${word.toLowerCase()}`}>{word}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
