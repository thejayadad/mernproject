import { create } from "zustand";

export const useSubjectStore = create((set) => ({
  subjects: [],

  // Function to set subjects
  setSubjects: (subjects) => set({ subjects }),

  // Function to create a new subject
  createSubject: async (newSubject) => {
    if (!newSubject.name || !newSubject.comfort || !newSubject.color) {
      return { success: false, message: "Please fill in all fields." };
    }
    try {
      const res = await fetch("http://localhost:5000/", { // Make sure this is the correct endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubject),
      });
      const data = await res.json();
      set((state) => ({ subjects: [...state.subjects, data.data] }));
      return { success: true, message: "Subject created successfully" };
    } catch (error) {
      console.error("Error creating subject:", error);
      return { success: false, message: "Server error" };
    }
  },

  // Function to fetch all subjects
  fetchSubjects: async () => {
    try {
      const res = await fetch("http://localhost:5000/"); // Make sure this is the correct endpoint
      const data = await res.json();
      if (data.success) {
        set({ subjects: data.data });
      } else {
        console.error("Error fetching subjects:", data.message);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  },

  // Function to delete a subject
  deleteSubject: async (sid) => {
    try {
      const res = await fetch(`http://localhost:5000/${sid}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      // Update the UI immediately, without needing a refresh
      set((state) => ({ subjects: state.subjects.filter((subject) => subject._id !== sid) }));
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error deleting subject:", error);
      return { success: false, message: "Server error" };
    }
  },

  // Function to update a subject
  updateSubject: async (sid, updatedSubject) => {
    try {
      const res = await fetch(`http://localhost:5000/${sid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSubject),
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      // Update the UI immediately, without needing a refresh
      set((state) => ({
        subjects: state.subjects.map((subject) =>
          subject._id === sid ? data.data : subject
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error updating subject:", error);
      return { success: false, message: "Server error" };
    }
  },
}));
