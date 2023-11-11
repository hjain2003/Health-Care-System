import Record from "../models/Record.js";
import User from "../models/User.js";



export const viewAllRecords = async (req, res) => {
    const user = req.rootUser;

    if (user.role !== 'doctor') {
        return res.status(403).json({ error: "Only doctors are allowed to add records" });
    }

    try {
        const records = await Record.find();
        res.status(200).json({ records });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const viewMyRecords = async (req, res) => {
    const userId = req.rootUser;
    try {
        const userRecords = await Record.find({ user: userId });
        res.status(200).json({ records: userRecords });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const addRecord = async (req, res) => {
    const doctor = req.rootUser; // Assuming the authenticated user is a doctor
  
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(403).json({ error: "Only doctors are allowed to add records" });
    }
  
    const { disease, prescription } = req.body;
    const patientId = req.params.userId; // Fetch userId from request parameters
  
    try {
      const patient = await User.findById(patientId);
  
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }
  
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
  
      const formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
  
      const newRecord = new Record({
        date: `${formattedDate} ${formattedTime}`,
        disease,
        prescription,
        user: patientId,
      });
  
      await newRecord.save();
  
      patient.records.push(newRecord._id);
      await patient.save();
  
      res.status(201).json({ message: "Record added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  export const deleteRecord = async (req, res) => {
    const recordId = req.params.id;
    try {
      const record = await Record.findById(recordId);
  
      if (!record) {
        return res.status(404).json({ error: "Record not found" });
      }
  
      await record.deleteOne(); // Use deleteOne or deleteMany
  
      const user = await User.findById(record.user);
      user.records.pull(recordId);
      await user.save();
  
      res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  