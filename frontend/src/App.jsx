import React, { useEffect, useState } from "react";
import Header from "./components/header";
import Row from "./components/row";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useSubjectStore } from "./store/subject";

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
    setEditingSubject(subject);
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

  return (
    <>
      <div>
        <Header />
        <div className="background">
          <Row />
          <div className="subject-list">
            {subjects.map((subject) => (
              <div key={subject._id} className="card">
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
                      <button onClick={() => setEditingSubject(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <FiEdit onClick={() => handleEditClick(subject)} />
                      <FiTrash onClick={() => handleDeleteClick(subject._id)} />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
