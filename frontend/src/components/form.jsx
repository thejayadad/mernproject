import React, { useState } from 'react';
import { useSubjectStore } from '../store/subject';

const Form = () => {
  const { createSubject } = useSubjectStore(); // Use the Zustand store to create a subject
  const [name, setName] = useState('');
  const [comfort, setComfort] = useState('');
  const [color, setColor] = useState('');

  // Define five standard colors
  const standardColors = ['#FF5733', '#33FF57', '#3357FF', '#F0FF33', '#FF33A1'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSubject = { name, comfort, color };
    
    // Call the createSubject function from Zustand store
    const response = await createSubject(newSubject);
    console.log(response.message); // Log success or error message

    // Clear the form fields after submission
    setName('');
    setComfort('');
    setColor('');
  };

  return (
    <form onSubmit={handleSubmit} className="subject-form">
      <div>
        <label htmlFor="name">Subject Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="comfort">Comfort Level:</label>
        <select
          id="comfort"
          value={comfort}
          onChange={(e) => setComfort(e.target.value)}
          required
        >
          <option value="" disabled>Select comfort level</option>
          <option value="Learning">Learning</option>
          <option value="Mastery">Mastery</option>
          <option value="Somewhat">Somewhat</option>
        </select>
      </div>

      <div>
        <label>Choose a Color:</label>
        <div className="color-options">
          {standardColors.map((colorOption) => (
            <div
              key={colorOption}
              className={`color-swatch ${color === colorOption ? 'selected' : ''}`} // Check if the current color is selected
              style={{ backgroundColor: colorOption, cursor: 'pointer' }}
              onClick={() => setColor(colorOption)}
            ></div>
          ))}
        </div>
      </div>

      <button type="submit">Create Subject</button>
    </form>
  );
};

export default Form;
