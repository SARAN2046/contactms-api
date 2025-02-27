import express from "express";
import { ContactModel } from "../models/contact.js";

const createContact = async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const newContact = new ContactModel({
      name,
      email,
      phone,
      address,
      postedBy: req.user._id,
    });
    const result = await newContact.save();
    return res.status(201).json({ success: true, ...result._doc });
  } catch (err) {
    return res.status(501).json(err.message);
  }
};

const getContact = async (req, res) => {
  try {
    const contacts = await ContactModel.find({ postedBy: req.user._id });
    return res.status(201).json({ success: true, contacts });
  } catch (err) {
    return res.status(501).json({ error: err.message });
  }
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "No Id specified" });
  }
  try {
    const contacts = await ContactModel.findById(id);
    return res.status(200).json({ success: true, ...contacts._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "No Id specified" });
  }
  try {
    const result = await ContactModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({ success: true, ...result._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "No ID specified" });
    }
    const deletedContact = await ContactModel.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ error: "No record exists" });
    }
    const contacts = await ContactModel.find({ postedBy: req.user._id });
    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
      contacts,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export {
  createContact,
  getContact,
  getOneContact,
  updateContact,
  deleteContact,
};
