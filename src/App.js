import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Peng from './components/Peng';
import Chunsik from './components/Chun';
function App() {
  return (
    <div>
      <Menu />
      <hr />
      <Routes>
        <Route path="/pengsu" element={<Peng />} />
        <Route path="/chunsik" element={<Chunsik />} />
      </Routes>
    </div>
  );
}

export default App;
