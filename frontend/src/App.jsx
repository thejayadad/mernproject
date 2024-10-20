import React, { useEffect, useState } from "react";
import Header from "./components/header";
import Row from "./components/row";
import { useSubjectStore } from "./store/subject";
import SubjectList from "./components/subject/subject-list";

function App() {
  const {
    subjects,
    fetchSubjects,
    updateSubject,
    deleteSubject,
  } = useSubjectStore();

  const [editingSubject, setEditingSubject] = useState(null);

  useEffect(() => {
    fetchSubjects(); // Fetch subjects on component mount
  }, [fetchSubjects]);

  const handleEditClick = (subject) => {
    setEditingSubject({ ...subject }); // Clone the subject for editing
  };

  const handleDeleteClick = async (id) => {
    const response = await deleteSubject(id);
    console.log(response.message); // Handle success or error message
  };

  const handleUpdateClick = async () => {
    if (editingSubject) {
      const response = await updateSubject(editingSubject._id, editingSubject);
      console.log(response.message); // Handle success or error message
      setEditingSubject(null); // Clear editing subject after updating
    }
  };

  const handleInputChange = (field, value) => {
    setEditingSubject((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancelClick = () => {
    setEditingSubject(null); // Clear editing subject when cancel is clicked
  };

  return (
    <>
      <div>
        <Header />
        <div className="background">
          <Row />
          <SubjectList
            subjects={subjects}
            editingSubject={editingSubject}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            handleUpdateClick={handleUpdateClick}
            handleInputChange={handleInputChange}
            handleCancelClick={handleCancelClick} // Pass the cancel function
          />
        </div>
      </div>
    </>
  );
}

export default App;
