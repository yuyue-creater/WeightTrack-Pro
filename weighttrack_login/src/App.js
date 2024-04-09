

//     <div className="App">
//        <LoginPage/>
      
//     //   {/* <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Edit <code>src/App.js</code> and save to reload.
//     //     </p>
//     //     <a
//     //       className="App-link"
//     //       href="https://reactjs.org"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       Learn React
//     //     </a>
//     //   </header> */}
//      </div>
//   );

// }

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import UserPage from './UserPage';
import Register from './Register';

const App = () => {
    const isLoggedIn = !!localStorage.getItem('user');
    const email = JSON.parse(localStorage.getItem('user'))?.email;

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/userpage" element={<UserPage email={email} />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>

    );
};

export default App;
