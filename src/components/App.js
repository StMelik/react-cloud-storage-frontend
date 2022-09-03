import './App.css';
import Navbar from './Navbar/Navbar';
import { Route, Routes } from 'react-router-dom'
import Authorization from './Authorization/Authorization';
import Login from './Authorization/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { auth } from '../utils/api';

function App() {
  const { isAuth } = useSelector(store => store.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      dispatch(auth())
    }
  }, [])


  return (
    <div className="app">
      <Navbar />
      <Routes>
        {!isAuth &&
          <>
            <Route
              path='/sign-up'
              element={<Authorization />}
            />
            <Route
              path='/sign-in'
              element={<Login />}
            />
          </>
        }

      </Routes>
    </div>
  );
}

export default App;
