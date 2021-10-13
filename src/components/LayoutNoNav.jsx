import React from 'react';

import TopBar from './TopBar';

export default function Layout({
  children, title, className, back,
}) {
  return (
    <div className="w-screen h-screen flex flex-col">
      <TopBar title={title} back={back} />
      <main className={`flex-1 bg-green-50 overflow-y-auto ${className}`}>
        {children}
      </main>
    </div>
  );
}
