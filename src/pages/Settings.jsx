import React from 'react';

import Layout from '../components/Layout';
import OptionList from '../components/OptionList';

export default function Page() {
  return (
    <Layout index={1} className="flex flex-col">
      <div className="p-4">
        <OptionList />
      </div>
      <div className="flex-1 flex flex-row items-center" />
    </Layout>
  );
}
