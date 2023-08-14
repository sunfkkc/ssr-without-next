import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Users() {
  const [first, setfirst] = useState(undefined);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      setfirst(data);
    })();
  }, []);

  return (
    <>
      {first?.map((v, i) => (
        <div key={i}>{v.name}</div>
      ))}
    </>
  );
}

export default Users;
