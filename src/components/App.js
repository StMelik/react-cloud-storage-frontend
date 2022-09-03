import './App.css';
import Navbar from './Navbar/Navbar';
import { Route, Routes } from 'react-router-dom'
import Registration from './Registration/Registration';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route
          path='/sign-up'
          element={<Registration />}
        />
      </Routes>
    </div>
  );
}

export default App;
