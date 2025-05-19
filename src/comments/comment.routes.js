import { Router } from "express";
import { check } from "express-validator";
import { saveComment, updateComment, deleteComment } from "./comment.controller.js";
import { validateFields } from '../middlewares/validateFields.js';
import { validateCreateComment } from "../middlewares/validate-comment.js";

const router = Router();

router.post(
    "/",
    [
        check("text", 'Text is required').notEmpty(),
        validateCreateComment,
        validateFields
    ],
    saveComment
)

router.put(
    "/:id",
    [
        check("id", "ID is invalid").isMongoId(),
        validateFields
    ],
    updateComment
)

router.delete(
    "/:id",
    [
        
        check("id", "ID is invalid").isMongoId(),
        validateFields
    ],
    deleteComment
)

export default router;