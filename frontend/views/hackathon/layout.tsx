import HackathonHeader from '@/components/hackathon-header';
import SideBar from '@/components/hackathon-sidebar';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>
      {/* <HackathonHeader />  */}
      <SideBar /> 
        {children}
        </main>
    </>
  );
}