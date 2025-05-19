import { Router } from "express";
import { check } from 'express-validator';
import { getPublications, searchPublication, createPublication, updatePublication, deletePublication } from "./publication.controller.js";
import { validateFields } from "../middlewares/validateFields.js";
import { validateCreatePublication,validateUpdatePublication,validateDeletePublication } from "../middlewares/validate-publication.js";

const router = Router();

router.get("/:id", getPublications)

router.get(
    "/findPublication/:id",
    [
        check("id", "ID is invalid").isMongoId(),
        validateFields
    ],
    searchPublication
)

router.post(
    "/",
    [
        validateCreatePublication,
        validateFields
    ],
    createPublication
)

router.put(
    "/:id",
    [
        
        check("id", "ID is invalid").isMongoId(),
        validateUpdatePublication,
        validateFields
    ],
    updatePublication
)

router.delete(
    "/:id",
    [
        check("id", "ID is invalid").isMongoId(),
        validateDeletePublication,
        validateFields
    ],
    deletePublication
)

export default router;