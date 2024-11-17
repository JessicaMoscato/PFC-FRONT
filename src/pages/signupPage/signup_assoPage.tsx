// src/pages/signup_assoPage.tsx

import React from "react";
import Header from "../../components/header/header";
import Signup_asso from "../../components/signup_forms/signup_asso";

const signup_assoPage: React.FC = () => {
  return (
    <div className="signup-asso-page">
      <Header />
      <main>
        <h1>Inscription Association</h1>
        <Signup_asso />
      </main>
    </div>
  );
};

export default signup_assoPage;
