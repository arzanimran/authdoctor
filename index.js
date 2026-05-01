// Express setup
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); 

const app = express();


// to read JSON body
app.use(express.json());

// auth rouths
app.use("/auth", require("./routes/authRoutes"));

// doctor routes
app.use("/doctor", require("./routes/doctorRoutes"));

// availability routes
app.use("/availability", require("./routes/availabilityRoutes"));

// appointment routes
app.use("/appointment", require("./routes/appointmentRoutes"));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// server start
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});



/*
POST /auth/register
http://localhost:3000/auth/register


{
  "name": "Arzan",
  "email": "test@gmail.com",
  "password": "123456",
  "role": "patient"
}

*/




/*
POST /auth/login
http://localhost:3000/auth/login

{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjJmNGRhOWUyNmI2Y2QwNGNlNTJmYyIsInJvbGUiOiJwYXRpZW50IiwiaWF0IjoxNzc3NTMwMTY4LCJleHAiOjE3Nzc2MTY1Njh9.-HrrIQzID2zbtg3mAJLN7H8EMwhwg3xToVR7oUjcM0Y",
    "role": "patient"
}
*/


//     CREATE DOCTOR

/*
POST http://localhost:3000/doctor

{
  "name": "Dr Smith",
  "specialization": "Cardiology",
  "startTime": "09:00",
  "endTime": "17:00",
  "slotDuration": 30
}

*/

/*
GET ALL DOCTORS
GET http://localhost:3000/doctor

[{"_id":"69f22e3a0939c2872bf58e0f","name":"Dr Smith","specialization":"Cardiology","availableDays":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"weeklyOff":["Sunday"],"startTime":"09:00","endTime":"10:00","slotDuration":30,"__v":0},{"_id":"69f22e4d0939c2872bf58e10","name":"Dr Smith","specialization":"Cardiology","availableDays":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"weeklyOff":["Sunday"],"startTime":"09:00","endTime":"10:00","slotDuration":30,"__v":0},{"_id":"69f22e4e0939c2872bf58e11","name":"Dr Smith","specialization":"Cardiology","availableDays":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"weeklyOff":["Sunday"],"startTime":"09:00","endTime":"10:00","slotDuration":30,"__v":0},{"_id":"69f22ef40939c2872bf58e14","name":"Dr Smith","specialization":"Cardiology","availableDays":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"weeklyOff":["Sunday"],"startTime":"09:00","endTime":"10:00","slotDuration":30,"__v":0},{"_id":"69f2f664bfee220f397a653d","name":"Dr Smith","specialization":"Cardiology","availableDays":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"startTime":"09:00","endTime":"17:00","slotDuration":30,"__v":0}]

*/

/*
GET DOCTOR BY ID
 http://localhost:3000/doctor/69f22e3a0939c2872bf58e0f

 {"_id":"69f22e3a0939c2872bf58e0f","name":"Dr Smith","specialization":"Cardiology","availableDays":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"weeklyOff":["Sunday"],"startTime":"09:00","endTime":"10:00","slotDuration":30,"__v":0}
*/

//              CREATE AVAILABILITY

/*
GET
http://localhost:3000/availability/69f22e3a0939c2872bf58e0f/2026-04-30

{"doctor":"Dr Smith","date":"2026-04-30","totalSlots":2,"bookedSlots":0,"availableSlots":["09:00","09:30"]}

*/

/*
POST
BOOK APPOINTMENT
http://localhost:3000/appointment/69f22e3a0939c2872bf58e0f
{
  "patientName": "Arzan",
  "patientPhone": "9876543210",
  "reason": "Fever"
}

*/




/*

Register
   ↓
Login
   ↓
Create Doctor
   ↓
Get Doctor
   ↓
Check Availability
   ↓
Book Appointment
   ↓
Cancel Appointment

*/