import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

function Chun() {
  const { data } = useQuery(
    'users',
    async () => {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      return data;
    },
    { keepPreviousData: true }
  );

  return (
    <div>
      <img alt="chunsik" src="/chun.png" width={500} height={500} />
      {data?.map((v) => (
        <div>{v.name}</div>
      ))}
    </div>
  );
}

export default Chun;
