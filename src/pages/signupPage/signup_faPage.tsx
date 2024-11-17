// src/pages/signup_assoPage.tsx

import React from "react";
import Header from "../../components/header/header";
import Signup_fa from "../../components/signup_forms/signup_fa";

const signup_assoPage: React.FC = () => {
  return (
    <div className="signup-asso-page">
      <Header />
      <main>
        <h1>Inscription Association</h1>
        <Signup_fa />
      </main>
    </div>
  );
};

export default signup_assoPage;