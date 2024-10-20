import React from 'react';
import "./modal.css";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // If not open, return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>✖</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button className="footer-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
