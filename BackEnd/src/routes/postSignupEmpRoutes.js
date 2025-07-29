import express from 'express';
import multer from 'multer';
import { saveEmployeeDetails } from '../controllers/postSignupEmpController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Define the route directly for /api/post-signup-emp
router.post('/', upload.single('profileImage'), saveEmployeeDetails);

export default router;