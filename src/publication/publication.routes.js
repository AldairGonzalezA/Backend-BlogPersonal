import { Router } from "express";
import { check } from 'express-validator';
import { getPublications, searchPublication, createPublication, updatePublication, deletePublication } from "./publication.controller.js";
import { validateFields } from "../middlewares/validateFields.js";

const router = Router();

router.get("/", getPublications)

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
        validateFields
    ],
    createPublication
)

router.put(
    "/:id",
    [
        
        check("id", "ID is invalid").isMongoId(),
        validateFields
    ],
    updatePublication
)

router.delete(
    "/:id",
    [
        check("id", "ID is invalid").isMongoId(),
        validateFields
    ],
    deletePublication
)

export default router;