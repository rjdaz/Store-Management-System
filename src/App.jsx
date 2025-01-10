import React from 'react';
import { useEffect, useState } from 'react';
import LogIn from "./components/LogIn.jsx"
import MainWindow from "./components/mainwindow.jsx"

function App() {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    fetch("https://store-management-system-amkc.onrender.com/Store-Management-System/prod")
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(`Network response was not ok: ${response.status} - ${text}`); });
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json(); // Parse JSON directly if content-type is JSON
        } else {
          return response.text(); // Otherwise, return text
        }
      })
      .then(data => {
        if (typeof data === 'string') {
          console.log('Response text:', data); // Debugging line
          if (data.startsWith('<')) {
            throw new Error('Received HTML instead of JSON');
          }
          try {
            data = JSON.parse(data); // Parse JSON safely
          } catch (error) {
            throw new Error('Error parsing JSON: ' + error.message);
          }
        }
        setData(data);
      })
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