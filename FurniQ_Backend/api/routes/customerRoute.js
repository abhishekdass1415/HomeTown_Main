import express from "express";
const router = express.Router();

// Create customer
router.post("/", (req, res) => {
    res.json({ message: "Create customer" });
});

// Get all customers
router.get("/", (req, res) => {
    res.json({ message: "Get all customers" });
});

// Get customer by ID
router.get("/:id", (req, res) => {
    res.json({ message: `Get customer ${req.params.id}` });
});

// Update customer
router.put("/:id", (req, res) => {
    res.json({ message: `Update customer ${req.params.id}` });
});

// Delete customer
router.delete("/:id", (req, res) => {
    res.json({ message: `Delete customer ${req.params.id}` });
});

export default router;
