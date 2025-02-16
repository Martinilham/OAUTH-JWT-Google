import express from "express"
import { saveKaryawan,
    updateKaryawan,
    getKaryawan,
    getKaryawanById,
    deleteKaryawan } 
    from "../controllers/karyawan-controllers.js";
import { verifyToken } from "../controllers/oauth-gmail.js";

const router = express.Router();

router.get('/karyawan',verifyToken,getKaryawan);
router.get('/karyawan/:id',verifyToken,getKaryawanById);
router.post('/karyawan',verifyToken,saveKaryawan);
router.patch('/karyawan/:id',verifyToken,updateKaryawan);
router.delete('/karyawan/:id',verifyToken,deleteKaryawan)

export default router;
