import React from 'react';

import TopBar from './TopBar';
import BottomBar from './BottomBar';

export default function Layout({
  children, index, title, back, className,
}) {
  return (
    <div className="w-screen h-screen flex flex-col">
      <TopBar title={title} back={back} />
      <main className={`flex-1 bg-green-50 overflow-y-auto ${className}`}>
        {children}
      </main>
      <BottomBar index={index ?? 0} />
    </div>
  );
}
