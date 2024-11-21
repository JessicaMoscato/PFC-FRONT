// src/pages/signup_assoPage.tsx

import React from "react";
import Signup_asso from "../../components/signup_forms/signup_asso";
import "./signupPage.scss";

const signup_assoPage: React.FC = () => {
  return (
    <div className="signup-asso-page">
         <main>
        
        <Signup_asso />
      </main>
    </div>
  );
};

export default signup_assoPage;
