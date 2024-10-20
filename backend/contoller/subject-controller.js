import Subject from "../model/subject.model.js"; // Make sure the path is correct
import mongoose from "mongoose";


export const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find({});
        res.status(200).json({ success: true, data: subjects });
    } catch (error) {
        console.error("Error getting subjects: " + error.message); // Fixed error logging
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createSubject = async (req, res) => {
    const subject = req.body;
    if(!subject.name || !subject.comfort || !subject.color){
        return res.status(400).json({success: false, message: "Please fill out all fields"})
    }
    const newSubject = new Subject(subject)
    try {
        await newSubject.save()
        res.status(201).json({success: true, data: newSubject})
    } catch (error) {
        console.error("Error in Create subject:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updateSubject = async (req, res) => {
    const { id } = req.params;

	const subject = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Subject Id" });
	}
    try {
        const updatedSubject = await Subject.findByIdAndUpdate(id, subject, { new: true });
		res.status(200).json({ success: true, data: updatedSubject });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });

    }
}

export const deleteSubject = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Subject Id" });
	}

         try {
             await Subject.findByIdAndDelete(id)
             res.status(200).json({success: true, message: "Subject deleted"})
         } catch (error) {
         res.status(400).json({success: false, message: "Subject not found"})
         }
}
