import express from "express";
import { Auth, Login, Register } from "../controller/userController.js";
const router = express.Router();
import { body } from "express-validator";
import { VerifyUser } from "../middleware/VerifyUser.js";
import {
  createContact,
  getContact,
  getOneContact,
  updateContact,
  deleteContact,
} from "../controller/contactController.js";

//user routes

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name should not be empty"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email should not be empty")
      .isEmail()
      .withMessage("Invalid email!!!"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password should not be empty")
      .isLength({ min: 8, max: 30 })
      .withMessage(
        "Password must contain a mix of uppercase, lowercase, numbers, and be at least 8 characters long."
      ),
  ],
  Register
);

router.post(
  "/login",
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email should not be empty")
      .isEmail()
      .withMessage("Invalid email!!!"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password should not be empty")
      .isLength({ min: 8, max: 30 })
      .withMessage(
        "Password must contain a mix of uppercase, lowercase, numbers, and be at least 8 characters long."
      ),
  ],
  Login
);

router.get("/verify", VerifyUser, Auth);

//contact routes

router.post("/add-contact", VerifyUser, createContact);

router.get("/contacts", VerifyUser, getContact);
router.get("/contacts/:id", VerifyUser, getOneContact);
router.put("/update-contact/:id", VerifyUser, updateContact);
router.delete("/contacts/:id", VerifyUser, deleteContact);

export { router as Router };
