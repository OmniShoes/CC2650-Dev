import React from 'react';

import Layout from '../components/Layout';

export default function Page() {
  return (
    <Layout index={-1} className="flex">
      <p className="flex-1 place-self-center text-center text-gray-300">
        Not Found
      </p>
    </Layout>
  );
}
