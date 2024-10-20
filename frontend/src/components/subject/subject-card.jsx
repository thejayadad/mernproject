import React from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

const SubjectCard = ({ subject, editingSubject, handleEditClick, handleDeleteClick, handleInputChange, handleUpdateClick, handleCancelClick }) => {
  return (
    <div className="card">
      <div className="left-card">
        <div className="color-indicator" style={{ backgroundColor: subject.color }}></div>
        {editingSubject && editingSubject._id === subject._id ? (
          <input
            type="text"
            value={editingSubject.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        ) : (
          <p>{subject.name}</p>
        )}
      </div>
      <div className="action">
        {editingSubject && editingSubject._id === subject._id ? (
          <input
            type="text"
            value={editingSubject.comfort}
            onChange={(e) => handleInputChange("comfort", e.target.value)}
          />
        ) : (
          <span>{subject.comfort}</span>
        )}
        {editingSubject && editingSubject._id === subject._id ? (
          <>
            <button onClick={handleUpdateClick}>Update</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </>
        ) : (
          <>
            <FiEdit onClick={() => handleEditClick(subject)} />
            <FiTrash onClick={() => handleDeleteClick(subject._id)} />
          </>
        )}
      </div>
    </div>
  );
};

export default SubjectCard;
