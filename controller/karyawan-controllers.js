import karyawan from "../models/karyawan.js";


export const getKaryawan = async (req, res) => {
    try {
        const user = await karyawan.find()
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getKaryawanById = async (req, res) => {
    try {
      const karyawan = await Karyawan.findById(req.params.id);
      if (!karyawan) {
        return res.status(404).json({ message: "Karyawan tidak ditemukan" });
      }
      res.json(karyawan);
    } catch (err) {
      console.error("Error fetching karyawan:", err); // Log error untuk debugging
      res.status(500).json({ message: err.message });
    }
  };
  

export const saveKaryawan = async (req, res) => {
    const user = new karyawan(req.body);
    try {
        const insertedUser = await user.save();
        res.status(201).json(insertedUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateKaryawan = async (req, res) => {
    try {
        const updatedUser = await karyawan.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteKaryawan = async (req, res) => {
    try {
        const deleteUser = await karyawan.deleteOne({_id:req.params.id});
        res.status(200).json(deleteUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}