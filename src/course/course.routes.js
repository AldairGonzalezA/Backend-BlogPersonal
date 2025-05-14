import { Router } from "express";
import { getCourses } from "./course.controller.js";
import { validateFields } from '../middlewares/validateFields.js';

const router = Router();

router.get(
    '/',
    [
        validateFields
    ],
    getCourses
)

export default router;