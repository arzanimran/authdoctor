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
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
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
  "endTime": "10:00",
  "slotDuration": 30,
  "slotCapacity": 4
}

| Time          | Meaning                 |
| ------------- | ----------------------- |
| 09:00 → 10:00 | working hours           |
| 30            | every slot is 30 mins   |
| 4             | max 4 patients per slot |


*/

/*
GET ALL DOCTORS
GET 
http://localhost:3000/doctor

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



// deployed on render.com

/*
https://authdoctor.onrender.com

POST
https://authdoctor.onrender.com/auth/register
{
  "name": "imran",
  "email": "test123@gmail.com",
  "password": "123456"
}


LOGIN
POST
https://authdoctor.onrender.com/auth/login

{
  "email": "test123@gmail.com",
  "password": "123456"
}


create doctor
POST
https://authdoctor.onrender.com/doctor

{
  "name": "Dr heeba",
  "specialization": "Dermatology",
  "startTime": "09:00",
  "endTime": "10:00",
  "slotDuration": 30,
  "slotCapacity": 4
}

GET ALL DOCTORS
GET
https://authdoctor.onrender.com/doctor

shown
[{"_id":"69f9f18935fba92e74cbf550","name":"Dr heeba","specialization":"Dermatology","availableDays":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"startTime":"09:00","endTime":"10:00","slotDuration":30,"__v":0}]

GET DOCTOR BY ID
GET
https://authdoctor.onrender.com/doctor/69f9f18935fba92e74cbf550

AVAILABILITY
GET
 https://authdoctor.onrender.com/availability/69f9f18935fba92e74cbf550/2026-05-05

 shown
 {"doctor":"Dr heeba","specialization":"Dermatology","date":"2026-05-05","slots":[{"slot":"09:00","capacity":4,"booked":0,"remaining":4,"full":false},{"slot":"09:30","capacity":4,"booked":0,"remaining":4,"full":false}]}


BOOK APPOINTMENT
POST
https://authdoctor.onrender.com/appointment/69f9f18935fba92e74cbf550

{
  "patientName": "imran",
  "patientPhone": "9876543210",
  "reason": "sick"
}


CANCEL APPOINTMENT
PUT
https://authdoctor.onrender.com/appointment/cancel/69f9fe910a703d658039cd55
{"message":"Appointment cancelled successfully","appointment":{"_id":"69f9fe910a703d658039cd55","patientPhone":"9876543210","patientName":"imran","reason":"sick","doctorId":"69f9f18935fba92e74cbf550","date":"2026-05-05","slot":"09:00","status":"Cancelled","__v":0}}

*/