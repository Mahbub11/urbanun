"use client";
import React, { useState } from "react";
import SignInModal from "../signIn/SignInModal";

const SignInContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={openModal}>Sign In</button>
      <SignInModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default SignInContent;
