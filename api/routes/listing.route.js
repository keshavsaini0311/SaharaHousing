import express from 'express'
import { createListing } from '../controllers/listing.contoller.js';
import { verifyToken } from '../utils/verifyUSer.js';

const router=express.Router();

router.post('/create',verifyToken,createListing)

export default router;