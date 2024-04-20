import express from 'express'
import { createListing, deleteListing } from '../controllers/listing.contoller.js';
import { verifyToken } from '../utils/verifyUSer.js';

const router=express.Router();

router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',verifyToken,deleteListing)

export default router;