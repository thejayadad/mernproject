import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import subjectRoutes from "./routes/subject-route.js";
import cors from "cors"; // Import the cors module


dotenv.config();
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  }));
  

// app.post("/subject", async (req, res) => {
//     const subject = req.body;

//     // Check if subject is defined and has required properties
//     if (!subject || !subject.name || !subject.comfort) {
//         return res.status(400).json({ success: false, message: "Please fill out all fields" });
//     }

//     const newSubject = new Subject(subject);
//     try {
//         await newSubject.save();
//         res.status(201).json({ success: true, data: newSubject });
//     } catch (error) {
//         console.error("Error creating subject", error.message); // Fixed error logging
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// });

// //delete subject
// app.delete("/subject/:id", async (req, res) => {
//     const {id} = req.params
//     try {
//         await Subject.findByIdAndDelete(id)
//         res.status(200).json({success: true, message: "Subject deleted"})
//     } catch (error) {
//         res.status(400).json({success: false, message: "Subject not found"})
//     }
// })


// //update subject
// app.put("/subject/:id", async (req, res) => {
//     const {id} = req.params;
//     const subject = req.body;
//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({success: false, message: "Invalid subject ID"})
//     }
//     try {
//         const updateSubject = await Subject.findByIdAndUpdate(id, subject, {new: true})
//         res.status(200).json({success: true, data: updateSubject})
//     } catch (error) {
//         res.status(500).json({success: false, message: "Update server error"})
//     }
// })

app.use("/", subjectRoutes)

app.listen(5000, () => {
    connectDB();
    console.log("Server running on port 5000");
});
