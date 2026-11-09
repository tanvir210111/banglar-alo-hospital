const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { seedDoctors, seedAppointments } = require("./data/seedData.cjs");

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

// Serve static doctors images
const publicDoctorsDir = path.join(__dirname, "public", "doctors");
if (fs.existsSync(publicDoctorsDir)) {
  app.use("/doctors", express.static(publicDoctorsDir));
}

// Local JSON Database Management
const dataDir = path.join(__dirname, "data");
const dbFilePath = path.join(dataDir, "db.json");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const defaultUsers = [
  {
    _id: "user_tanvir",
    name: "Mohammad Tanvir Ahmed",
    email: "tanvir.ahmed.bd@gmail.com",
    password: "password123",
    phone: "+880 1711-887766",
    address: {
      line1: "House 14, Road 4, Dhanmondi",
      line2: "Dhaka-1205, Bangladesh"
    },
    gender: "Male",
    dob: "1992-05-14",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80"
  }
];

function normalizeDoctor(doc) {
  const d = { ...doc };
  d._id = String(d._id || "doc_" + Date.now());
  d.name = d.name || "Doctor";
  d.speciality = d.speciality || d.specialist || "General physician";
  d.specialist = d.specialist || d.speciality;
  d.fees = Number(d.fees || d.fee || 50);
  d.fee = String(d.fee || d.fees);
  
  if (Array.isArray(d.degrees)) {
    d.degree = d.degree || d.degrees.join(", ");
  } else if (typeof d.degree === "string") {
    d.degrees = d.degrees || [d.degree];
  } else {
    d.degree = "MBBS";
    d.degrees = ["MBBS"];
  }

  if (typeof d.address === "string") {
    d.address = { line1: d.address, line2: "Dhaka, Bangladesh" };
  } else if (!d.address) {
    d.address = { line1: "House 24, Road 7", line2: "Dhanmondi, Dhaka-1205" };
  }

  d.experience = d.experience || (d.age ? `${Math.max(1, Number(d.age) - 28)} Years` : "4 Years");
  d.about = d.about || `Dr. ${d.name} has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.`;
  d.available = d.available !== undefined ? Boolean(d.available) : true;
  d.approved = d.approved !== undefined ? String(d.approved) : "true";
  d.slots_booked = d.slots_booked || {};
  return d;
}

function loadLocalData() {
  if (!fs.existsSync(dbFilePath)) {
    const initialData = {
      doctors: seedDoctors.map(normalizeDoctor),
      appointments: seedAppointments,
      users: defaultUsers
    };
    fs.writeFileSync(dbFilePath, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }
  try {
    let raw = fs.readFileSync(dbFilePath, "utf-8");
    raw = raw.replace(/^\uFEFF/, "");
    const parsed = JSON.parse(raw);
    parsed.doctors = (parsed.doctors || seedDoctors).map(normalizeDoctor);
    parsed.appointments = parsed.appointments || seedAppointments;
    parsed.users = parsed.users || defaultUsers;
    return parsed;
  } catch (err) {
    console.error("Error reading db.json, reinitializing:", err);
    const initialData = {
      doctors: seedDoctors.map(normalizeDoctor),
      appointments: seedAppointments,
      users: defaultUsers
    };
    fs.writeFileSync(dbFilePath, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }
}

function saveLocalData(data) {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing db.json:", err);
  }
}

// Ensure local db file is loaded & refreshed with normalized doctors
let localDb = loadLocalData();
saveLocalData(localDb);

let dbMode = "local";
let mongoDb = null;
let doctorsCollection = null;
let appointmentsCollection = null;

// Optional MongoDB Connection Setup
async function initMongo() {
  const { MongoClient, ServerApiVersion } = require("mongodb");
  const dbUser = process.env.DB_USER;
  const dbPass = process.env.DB_PASS;
  const mongoUri =
    process.env.MONGODB_URI ||
    (dbUser && dbPass
      ? `mongodb+srv://${dbUser}:${dbPass}@cluster0.tecyb.mongodb.net/?retryWrites=true&w=majority`
      : null);

  if (!mongoUri) {
    console.log("ℹ️ No MongoDB URI configured in .env. Operating in high-performance local store mode.");
    return false;
  }

  try {
    console.log("🔄 Attempting MongoDB connection...");
    const client = new MongoClient(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion ? ServerApiVersion.v1 : undefined,
      connectTimeoutMS: 5000,
    });
    await client.connect();
    console.log("✅ Successfully connected to MongoDB Atlas!");
    mongoDb = client.db(process.env.DB_NAME || "SmartCare");
    doctorsCollection = mongoDb.collection("doctors");
    appointmentsCollection = mongoDb.collection("Appointments");
    dbMode = "mongodb";
    return true;
  } catch (err) {
    console.warn("⚠️ MongoDB connection failed (" + err.message + "). Fallback to local store enabled.");
    dbMode = "local";
    return false;
  }
}

initMongo().catch(() => {});

// Root / Health check & Hospital Overview
app.get("/", (req, res) => {
  const data = loadLocalData();
  res.json({
    hospital: "Banglar Alo Hospital & Research Center",
    location: "House 24, Road 7, Panthapath / Dhanmondi, Dhaka-1205, Bangladesh",
    emergency_hotline: "+880 1711-000000 / +880 2-9660015",
    ambulance_service: "10678 / +880 1710-554433",
    system_status: "Active & Serving Patients",
    database_mode: dbMode,
    total_doctors: data.doctors.length,
    total_appointments: data.appointments.length,
    api_endpoints: [
      "/api/doctor/list",
      "/api/user/login",
      "/api/user/register",
      "/api/user/get-profile",
      "/api/user/book-appointment",
      "/api/user/appointments",
      "/doctors",
      "/approvedDoctors",
      "/pendingDoctors",
      "/appointments",
      "/staff.json"
    ],
  });
});

// ========================================================
// 1. DOCTORS ENDPOINTS (Unified for Main Website & Admin)
// ========================================================

// GET for Main Website (`/api/doctor/list`)
app.get("/api/doctor/list", async (req, res) => {
  try {
    const data = loadLocalData();
    const approvedDocs = data.doctors
      .filter((d) => d.approved === "true" || d.approved === true)
      .map(normalizeDoctor);
    res.json({ success: true, doctors: approvedDocs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET all doctors (for admin panel)
app.get("/doctors", async (req, res) => {
  try {
    const data = loadLocalData();
    res.json(data.doctors.map(normalizeDoctor));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET approved doctors (for admin panel)
app.get("/approvedDoctors", async (req, res) => {
  try {
    const data = loadLocalData();
    const approved = data.doctors
      .filter((d) => d.approved === "true" || d.approved === true)
      .map(normalizeDoctor);
    res.json(approved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET pending doctors (for admin panel)
app.get("/pendingDoctors", async (req, res) => {
  try {
    const data = loadLocalData();
    const pending = data.doctors
      .filter((d) => d.approved === "false" || d.approved === false)
      .map(normalizeDoctor);
    res.json(pending);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET doctor by email or ID
app.get("/doctors/:identifier", async (req, res) => {
  const { identifier } = req.params;
  try {
    const data = loadLocalData();
    const matched = data.doctors
      .filter((d) => d.email === identifier || d._id === identifier)
      .map(normalizeDoctor);
    res.json(matched);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Add new doctor (from Admin Panel or Doctor registration)
app.post("/doctors", async (req, res) => {
  try {
    const doctor = normalizeDoctor(req.body);
    doctor._id = doctor._id || "doc_" + Date.now();
    doctor.approved = doctor.approved !== undefined ? String(doctor.approved) : "true";

    // Handle image upload if provided as file
    if (req.files && req.files.image) {
      const file = Array.isArray(req.files.image)
        ? req.files.image[0]
        : req.files.image;
      doctor.image = `data:${file.mimetype || "image/jpeg"};base64,${file.data.toString("base64")}`;
    } else if (!doctor.image) {
      doctor.image = "/doctors/doc1.png";
    }

    const data = loadLocalData();
    data.doctors.unshift(doctor);
    saveLocalData(data);

    res.json({ acknowledged: true, insertedId: doctor._id, doctor });
  } catch (err) {
    console.error("Error adding doctor:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE doctor by ID (from Admin Panel)
app.delete("/doctors/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = loadLocalData();
    const initialLength = data.doctors.length;
    data.doctors = data.doctors.filter((d) => d._id !== id);
    saveLocalData(data);
    res.json({
      acknowledged: true,
      deletedCount: initialLength - data.doctors.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT Approve doctor
app.put("/approve/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = loadLocalData();
    let modified = 0;
    data.doctors = data.doctors.map((d) => {
      if (d._id === id) {
        modified++;
        return { ...d, approved: "true" };
      }
      return d;
    });
    saveLocalData(data);
    res.json({ acknowledged: true, modifiedCount: modified });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========================================================
// 2. USER AUTHENTICATION & PROFILE (For Main Website)
// ========================================================

// POST Register User
app.post("/api/user/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }
    const data = loadLocalData();
    const existing = data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.json({ success: false, message: "User already exists with this email" });
    }
    const newUser = {
      _id: "user_" + Date.now(),
      name,
      email: email.toLowerCase(),
      password,
      phone: "+880 1700-000000",
      address: { line1: "House 10, Road 4", line2: "Dhaka, Bangladesh" },
      gender: "Not specified",
      dob: "1995-01-01",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80"
    };
    data.users.push(newUser);
    saveLocalData(data);
    const token = Buffer.from(newUser.email).toString("base64");
    res.json({ success: true, token, message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST Login User
app.post("/api/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = loadLocalData();
    let user = data.users.find((u) => u.email.toLowerCase() === (email || "").toLowerCase());
    
    // Auto-create or login seamlessly for demo convenience
    if (!user) {
      user = {
        _id: "user_" + Date.now(),
        name: email.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim() || "Hospital Patient",
        email: email.toLowerCase(),
        password: password || "123456",
        phone: "+880 1711-000000",
        address: { line1: "Dhaka", line2: "Bangladesh" },
        gender: "Male",
        dob: "1994-06-15",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80"
      };
      data.users.push(user);
      saveLocalData(data);
    }
    const token = Buffer.from(user.email).toString("base64");
    res.json({ success: true, token, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Helper to get user from token
function getUserFromToken(token, data) {
  if (!token) return null;
  try {
    const email = Buffer.from(token, "base64").toString("utf-8");
    return data.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || data.users[0];
  } catch (e) {
    return data.users[0] || null;
  }
}

// GET User Profile
app.get("/api/user/get-profile", async (req, res) => {
  try {
    const token = req.headers.token;
    const data = loadLocalData();
    const user = getUserFromToken(token, data);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, userData: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST Update Profile
app.post("/api/user/update-profile", async (req, res) => {
  try {
    const token = req.headers.token;
    const data = loadLocalData();
    const userIndex = data.users.findIndex((u) => {
      try {
        const email = Buffer.from(token, "base64").toString("utf-8");
        return u.email.toLowerCase() === email.toLowerCase();
      } catch (e) {
        return false;
      }
    });

    if (userIndex !== -1) {
      data.users[userIndex] = {
        ...data.users[userIndex],
        ...req.body
      };
      saveLocalData(data);
      return res.json({ success: true, message: "Profile Updated" });
    }
    res.json({ success: false, message: "User not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ========================================================
// 3. APPOINTMENTS (Bidirectional: Main Website & Admin)
// ========================================================

// GET all appointments (used by Admin Panel)
app.get("/appointments", async (req, res) => {
  try {
    const data = loadLocalData();
    res.json(data.appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Book appointment from Main Website
app.post("/api/user/book-appointment", async (req, res) => {
  try {
    const token = req.headers.token;
    const { docId, slotDate, slotTime } = req.body;
    const data = loadLocalData();
    const user = getUserFromToken(token, data) || {
      _id: "user_guest",
      name: "Patient Visitor",
      email: "visitor@hospital.bd",
      phone: "+880 1700-112233"
    };

    const doctor = data.doctors.find((d) => String(d._id) === String(docId));
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    const apptId = "appt_" + Date.now();
    const newAppointment = {
      _id: apptId,
      userId: user._id,
      docId: doctor._id,
      docData: normalizeDoctor(doctor),
      userData: user,
      slotDate: slotDate,
      slotTime: slotTime,
      amount: Number(doctor.fees || doctor.fee || 50),
      date: Date.now(),
      cancelled: false,
      payment: true,
      isCompleted: false,

      // Format for Admin Panel Dashboard & Patients views:
      patientName: user.name,
      email: user.email,
      phone: user.phone || "+880 1711-000000",
      age: user.age || "32",
      gender: user.gender || "Male",
      doctorName: doctor.name,
      doctorEmail: doctor.email || `${doctor._id}@hospital.bd`,
      specialist: doctor.speciality || doctor.specialist || "General physician",
      fee: String(doctor.fees || doctor.fee || 500),
      time: slotTime,
      address: typeof user.address === "object"
        ? `${user.address.line1 || ""}, ${user.address.line2 || ""}`
        : (user.address || "Dhaka, Bangladesh"),
      problem: "Medical Consultation & Routine Health Checkup",
      status: "Confirmed",
      created_at: new Date().toISOString()
    };

    // Update doctor's booked slots
    doctor.slots_booked = doctor.slots_booked || {};
    doctor.slots_booked[slotDate] = doctor.slots_booked[slotDate] || [];
    doctor.slots_booked[slotDate].push(slotTime);

    data.appointments.unshift(newAppointment);
    saveLocalData(data);

    res.json({ success: true, message: "Appointment Booked Successfully", appointment: newAppointment });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET User Appointments (for Main Website My-Appointments)
app.get("/api/user/appointments", async (req, res) => {
  try {
    const token = req.headers.token;
    const data = loadLocalData();
    const user = getUserFromToken(token, data);
    
    // Return appointments matching user or all appointments with normalized structure
    let userAppts = data.appointments;
    if (user && user.email) {
      userAppts = data.appointments.filter(
        (a) =>
          a.userId === user._id ||
          (a.email && a.email.toLowerCase() === user.email.toLowerCase())
      );
    }

    // Ensure all appointments have docData formatted
    const formatted = userAppts.map((a) => {
      const doc = a.docData || data.doctors.find((d) => String(d._id) === String(a.docId)) || data.doctors[0];
      return {
        ...a,
        docData: normalizeDoctor(doc),
        amount: a.amount || Number(a.fee || 50),
        slotDate: a.slotDate || (a.date ? String(a.date).replace(/-/g, "_") : "10_11_2026"),
        slotTime: a.slotTime || a.time || "10:00 am",
        cancelled: Boolean(a.cancelled),
        payment: a.payment !== undefined ? Boolean(a.payment) : true,
        isCompleted: Boolean(a.isCompleted)
      };
    });

    res.json({ success: true, appointments: formatted });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST Cancel appointment (from Main Website)
app.post("/api/user/cancel-appointment", async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const data = loadLocalData();
    const appt = data.appointments.find((a) => a._id === appointmentId);
    if (!appt) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    appt.cancelled = true;
    appt.status = "Cancelled";

    // Release doctor slot
    const doctor = data.doctors.find((d) => String(d._id) === String(appt.docId));
    if (doctor && doctor.slots_booked && doctor.slots_booked[appt.slotDate]) {
      doctor.slots_booked[appt.slotDate] = doctor.slots_booked[appt.slotDate].filter(
        (t) => t !== appt.slotTime
      );
    }

    saveLocalData(data);
    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Payment mock endpoints
app.post("/api/user/create-checkout-session", (req, res) => {
  res.json({ success: true, id: "session_mock_" + Date.now() });
});

app.post("/api/user/confirm-payment", (req, res) => {
  const { appointmentId } = req.body;
  const data = loadLocalData();
  const appt = data.appointments.find((a) => a._id === appointmentId);
  if (appt) {
    appt.payment = true;
    saveLocalData(data);
  }
  res.json({ success: true, message: "Payment Confirmed" });
});

// POST Admin create appointment
const handleAppointmentCreation = async (req, res) => {
  try {
    const appointment = { ...req.body };
    appointment._id = appointment._id || "appt_" + Date.now();
    appointment.created_at = new Date().toISOString();
    appointment.status = appointment.status || "Confirmed";
    appointment.payment = true;
    appointment.cancelled = false;

    const data = loadLocalData();
    const doc = data.doctors.find(
      (d) =>
        d.email === appointment.doctorEmail ||
        d.name === appointment.doctorName ||
        String(d._id) === String(appointment.docId)
    ) || data.doctors[0];

    appointment.docData = normalizeDoctor(doc);
    appointment.docId = doc ? doc._id : "doc1";
    appointment.amount = Number(appointment.fee || doc.fees || 50);
    appointment.slotDate = appointment.date ? appointment.date.replace(/-/g, "_") : "10_11_2026";
    appointment.slotTime = appointment.time || "10:30 am";

    data.appointments.unshift(appointment);
    saveLocalData(data);
    res.json({ acknowledged: true, insertedId: appointment._id, appointment });
  } catch (err) {
    console.error("Error creating appointment:", err);
    res.status(500).json({ error: err.message });
  }
};

app.post("/appointments", handleAppointmentCreation);
app.post("/appoinments", handleAppointmentCreation);

// GET patient/appointment by ID
app.get("/patients/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = loadLocalData();
    const patient = data.appointments.find((p) => p._id === id);
    res.json(patient || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE patient/appointment by ID (used by Admin Panel)
app.delete("/patients/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = loadLocalData();
    const initialLen = data.appointments.length;
    data.appointments = data.appointments.filter((p) => p._id !== id);
    saveLocalData(data);
    res.json({ acknowledged: true, deletedCount: initialLen - data.appointments.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========================================================
// 4. HOSPITAL OVERVIEW & STAFF DETAILS
// ========================================================

app.get("/api/hospital/overview", (req, res) => {
  const data = loadLocalData();
  const approved = data.doctors.filter((d) => d.approved === "true" || d.approved === true);
  res.json({
    hospitalName: "Banglar Alo Hospital & Research Center",
    tagline: "Smart Care, Modern Medicine & Dedicated Healthcare",
    location: "House 24, Road 7, Panthapath / Dhanmondi, Dhaka-1205, Bangladesh",
    emergency_hotline: "+880 1711-000000 / +880 2-9660015",
    ambulance_service: "10678 / +880 1710-554433",
    email: "contact@banglaralo.hospital.bd",
    totalDoctors: data.doctors.length,
    approvedDoctors: approved.length,
    totalAppointments: data.appointments.length,
    totalPatients: new Set(data.appointments.map((a) => a.email || a.patientName)).size,
    departments: [
      "General physician",
      "Gynecologist",
      "Dermatologist",
      "Pediatricians",
      "Neurologist",
      "Gastroenterologist"
    ]
  });
});

// Staffs endpoint (serves staff.json)
app.get("/staff.json", (req, res) => {
  const staffFile = path.join(__dirname, "..", "client", "public", "staff.json");
  if (fs.existsSync(staffFile)) {
    return res.sendFile(staffFile);
  }
  res.json([]);
});

app.listen(port, () => {
  console.log(`🏥 Banglar Alo Hospital Backend Server running on port ${port}`);
  console.log(`🔗 Local URL: http://localhost:${port}`);
});
