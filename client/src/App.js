import React, { useState } from 'react'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Route,  Routes , Navigate  } from 'react-router-dom';



const App = () => {
 
 const [token, setToken] = useState('');



 const handleLogin =  (newToken) => {
  setToken(newToken);
};

const handleLogout = () => {
  // Clear the session/token
  setToken('');
};



return(
  <Router>
      <Routes>
      {token ? (
          // If token is present, redirect to another page
          <Route path="/" element={<Navigate to="/home" />} />
        ) : (
          // Otherwise, render your App content
          <Route path="/" element={<Login onLogin={handleLogin}/>} />
        )}
         {token ? (
          // If token is present, redirect to another page
          <Route path="/home" element={<HomePage onLogout={handleLogout} />} />
        ) : (
          // Otherwise, render your App content
          <Route path="/home" element={<Navigate to='/'/>} />
        )}
      </Routes>
    </Router>
)

}


export default App