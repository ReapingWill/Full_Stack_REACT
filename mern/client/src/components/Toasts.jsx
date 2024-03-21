import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

function LoginToast({ show, message, variant, onClose }) {
  return (
    <ToastContainer position="top-center">
      <Toast onClose={()=>{}} show={show} delay={3000} autohide variant={variant}>
        <Toast.Header>
          <strong className="me-auto">Login Status</strong>
        </Toast.Header>
        <Toast.Body className={variant === 'danger' ? 'text-white' : ''}>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default LoginToast;

