import React from 'react';
import { useEffect, useState } from 'react';
import LogIn from "./components/LogIn.jsx"
import MainWindow from "./components/mainwindow.jsx"

function App() {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    fetch("https://store-management-system-amkc.onrender.com/prod")
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(`Network response was not ok: ${response.status} - ${text}`); });
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

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
            <MainWindow />   
      </div>
    </>
  );
}

export default App;