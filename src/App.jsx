import React, { useState } from 'react';
import LogIn from "./components/LogIn.jsx"
import MainWindow from "./components/mainwindow.jsx"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <div className="header">
        Daz Store
      </div>
      <div className="container">
        <React.Fragment>
          {isLoggedIn ? (         
            <MainWindow
            style={{
              opacity: 1,
              zIndex: 1,
              transition: 'opacity 0.5s ease, z-index 0.5s ease',
            }}
            />
          ) : (
            <LogIn onLoginSuccess={handleLoginSuccess} />
          )}
        </React.Fragment>
      </div>
    </>
  )
}

export default App
