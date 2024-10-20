/**
backend folder/frontend
npm init -y
npm i express mongoose dotenv
create server.js
create express app
go over package.json

add:
  "type": "module",

modern syntax

server.js

import express from "express";

const app = express()

app.listen(5000, () => {
    console.log("Server going")
})

cd into backend folder

node server.js

npm i nodemon -D

replace test:
    "dev": "nodemon backend/server.js"

then npm run dev

create our first route

app.get("/", (req, res) => {
    res.send("server going")
})

test it out 

localhost:5000


<---database--->
mongodb.com
then m in mern
go thru setup
select node i think
create .gitignore
.env
add the database connection string

show connection string by import dotenv. do config

log to the console

setup the config folder
db.js
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1); // process code 1 code means exit with failure, 0 means success
	}
};

add connectionDB to the server

import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";

dotenv.config()
const app = express()
app.get("/", (req, res) => {
    res.send("server going")
})


app.listen(5000, () => {
    connectDB()
    console.log("Server going")
})

check it out in the console

<---Models---->
models folder
import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		comfort: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true, 
	}
);

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
<---api--->
start with create
remove prior get code
now add the server.js with the create route
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Subject from "./model/subject.model.js";

dotenv.config();
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.post("/subject", async (req, res) => {
    const subject = req.body;

    // Check if subject is defined and has required properties
    if (!subject || !subject.name || !subject.comfort) {
        return res.status(400).json({ success: false, message: "Please fill out all fields" });
    }

    const newSubject = new Subject(subject);
    try {
        await newSubject.save();
        res.status(201).json({ success: true, data: newSubject });
    } catch (error) {
        console.error("Error creating subject", error.message); // Fixed error logging
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.listen(5000, () => {
    connectDB();
    console.log("Server running on port 5000");
});

test it with thunder client
http://localhost:5000/subject
{
  "name": "Javascript",
  "color": "#234987",
  "comfort": "learning"
}

delete request:
test it out
//delete subject
app.delete("/subject/:id", async (req, res) => {
    const {id} = req.params
    console.log("ID " + id)
})

show in thunder client making the request then the console

add the delete route:

//delete subject
app.delete("/subject/:id", async (req, res) => {
    const {id} = req.params
    try {
        await Subject.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "Subject deleted"})
    } catch (error) {
        res.status(400).json({success: false, message: "Subject not found"})
    }
})

http://localhost:5000/subject/6713e99014bb78edd53c82bc

add two more subjects:
{
  "name": "Java",
  "color": "#3cb371",
  "comfort": "learning"
}
javscript
#ff6347

get all subjects
//get all subjects
app.get("/", async (req, res) => {
    try {
        const subjects = await Subject.find({})
        res.status(200).json({success: true, data: subjects})
    } catch (error) {
        console.log("Error getting subjects" + error,message)
        res.status(500).json({success: false, message: "Server Error"})
    }
})

http://localhost:5000/

update subject
//update subject
app.put("/subject/:id", async (req, res) => {
    const {id} = req.params;
    const subject = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid subject ID"})
    }
    try {
        const updateSubject = await Subject.findByIdAndUpdate(id, subject, {new: true})
        res.status(200).json({success: true, data: updateSubject})
    } catch (error) {
        res.status(500).json({success: false, message: "Update server error"})
    }
})

test it out in thunder client

once it works, break it into smaller pieces of code
controller folder
subject.controllr.js

router rolder
subject-route.js
import express from "express";

const router = express.Router();

//get route
router.get("/", )


export default router;

server.js file
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Subject from "./model/subject.model.js";
import mongoose from "mongoose";

import subjectRoutes from "./routes/subject-route.js"

dotenv.config();
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.post("/subject", async (req, res) => {
    const subject = req.body;

    // Check if subject is defined and has required properties
    if (!subject || !subject.name || !subject.comfort) {
        return res.status(400).json({ success: false, message: "Please fill out all fields" });
    }

    const newSubject = new Subject(subject);
    try {
        await newSubject.save();
        res.status(201).json({ success: true, data: newSubject });
    } catch (error) {
        console.error("Error creating subject", error.message); // Fixed error logging
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

//delete subject
app.delete("/subject/:id", async (req, res) => {
    const {id} = req.params
    try {
        await Subject.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "Subject deleted"})
    } catch (error) {
        res.status(400).json({success: false, message: "Subject not found"})
    }
})

//get all subjects
app.get("/", async (req, res) => {
    try {
        const subjects = await Subject.find({})
        res.status(200).json({success: true, data: subjects})
    } catch (error) {
        console.log("Error getting subjects" + error,message)
        res.status(500).json({success: false, message: "Server Error"})
    }
})

//update subject
app.put("/subject/:id", async (req, res) => {
    const {id} = req.params;
    const subject = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid subject ID"})
    }
    try {
        const updateSubject = await Subject.findByIdAndUpdate(id, subject, {new: true})
        res.status(200).json({success: true, data: updateSubject})
    } catch (error) {
        res.status(500).json({success: false, message: "Update server error"})
    }
})

app.use("/", subjectRoutes)

app.listen(5000, () => {
    connectDB();
    console.log("Server running on port 5000");
});

in the controller, copy the get fron trycatch then past it in the controller

import mongoose from "mongoose";
import Subject from "../model/subject.model";

export const getSubject = async(req, res) => {
    try {
        const subjects = await Subject.find({})
        res.status(200).json({success: true, data: subjects})
    } catch (error) {
        console.log("Error getting subjects" + error,message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}

update route
import express from "express";
import { getSubject } from "../contoller/subject-controller.js";

const router = express.Router();

//get route
router.get("/", getSubject)


export default router;

test it

should get staus.200

do the create route

do the controller then route

controller
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

route
import express from "express";
import { createSubject, getSubjects } from "../contoller/subject-controller.js";

const router = express.Router();

// GET route
router.get("/", getSubjects);
router.post("/", createSubject)

export default router;


test it out

update subject
controller
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

route
import express from "express";
import { createSubject, getSubjects, updateSubject } from "../contoller/subject-controller.js";

const router = express.Router();

// GET route
router.get("/", getSubjects);
router.post("/", createSubject)
router.put("/:id", updateSubject);

export default router;


test it out in thunder client

delete

controller
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

route
router.delete("/:id", deleteSubject);


test it out

<---FRONTEND--->

npm create vite@latest .
install the app
launch it

delete app.css
clean up index.css

add header.jsx
add the css
import React from 'react'
import "./header.css"
const Header = () => {
  return (
    <header>
       <nav>
            StudyMate
       </nav>
    </header>
  )
}

export default Header

header{
    height: 10vh;
    display: flex;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
    border-bottom: 1px solid #eae4e4;
}

nav{
    width: 100%;
    max-width: 1500px;
    margin: auto;
}



 */