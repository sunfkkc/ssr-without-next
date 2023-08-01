import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <ul>
      <li>
        <Link to="/pengsu">펭수</Link>
      </li>
      <li>
        <Link to="/chunsik">춘식</Link>
      </li>
    </ul>
  );
}

export default Menu;
