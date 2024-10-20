import React from "react";
import SubjectCard from "./subject-card";

const SubjectList = ({ subjects, editingSubject, handleEditClick, handleDeleteClick, handleInputChange, handleUpdateClick, handleCancelClick }) => {
  return (
    <div className="subject-list">
      {subjects.map((subject) => (
        <SubjectCard
          key={subject._id}
          subject={subject}
          editingSubject={editingSubject}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          handleInputChange={handleInputChange}
          handleUpdateClick={handleUpdateClick} // Pass update function
          handleCancelClick={handleCancelClick} // Pass cancel function
        />
      ))}
    </div>
  );
};

export default SubjectList;
