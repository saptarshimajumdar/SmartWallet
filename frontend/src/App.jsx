import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/Signin";
import SignUpPage from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TransactionCard from "./pages/Transaction";
import HomePage from "./pages/Homepage";
import Successpage from "./pages/Success";
import DepositPage from "./pages/Depositpage";

function App() {

  return (<div>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transaction" element={<TransactionCard />} />
          <Route path="/success" element={<Successpage />} />
          <Route path="/deposit" element={<DepositPage />} />
        </Routes>
      </BrowserRouter>
     
  </div>
    
  );
}

export default App;
