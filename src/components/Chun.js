import React, { Suspense } from 'react';

function Chun() {
  return (
    <Suspense fallback={<div>Loading chun sik png</div>}>
      <div>
        <img alt="chunsik" src="/chun.png" width={500} height={500} />
      </div>
    </Suspense>
  );
}

export default Chun;
