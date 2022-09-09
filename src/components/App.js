import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css';
import Navbar from './Navbar/Navbar';
import Authorization from './Authorization/Authorization';
import Login from './Authorization/Login';
import Disk from './Disk/Disk';
import Profile from './Profile/Profile';
import { authAction } from '../store/actions/userActions';

function App() {
  const { isAuth } = useSelector(store => store.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      dispatch(authAction())
    }
  }, [])

  return (
    <div className="app">
      <Navbar />
      {!isAuth ?
        <Routes>
          <Route
            path='/sign-up'
            element={<Authorization />}
          />
          <Route
            path='/sign-in'
            element={<Login />}
          />
          <Route path='*' element={<Navigate to='/sign-in' replace />} />
        </Routes>
        :
        <Routes>
          <Route path='/' element={<Disk />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      }

    </div>
  );
}

export default App;
