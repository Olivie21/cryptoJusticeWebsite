"use client";

import { useState } from "react";
import { Modal, Box, Button, Typography, Container } from "@mui/material";
import SignUp from "./Signup";
import Login from "./Login";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        color="primary"
        className="theme-btn md:py-[8px] md:px-[22px] whitespace-nowrap "
      >
        Sign In
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between mb-4 w-full">
            <button
              onClick={() => setShowSignUp(false)}
              className={`w-1/2 py-2.5 px-5 me-2 mb-2 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 ${
                !showSignUp
                  ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  : "text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setShowSignUp(true)}
              className={`w-1/2 py-2.5 px-5 me-2 mb-2 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 ${
                showSignUp
                  ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  : "text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              }`}
            >
              Sign Up
            </button>
          </div>
          {showSignUp ? <SignUp /> : <Login />}
        </Box>
      </Modal>
    </div>
  );
}
