import React, { Suspense, lazy } from 'react';
const Users = lazy(() => import('./Users'));

function Peng() {
  return (
    <div>
      <img alt="pengsu" src="/peng.jpg" />
      <Suspense fallback={<div>Loading...</div>}>
        <Users />
      </Suspense>
    </div>
  );
}

export default Peng;
