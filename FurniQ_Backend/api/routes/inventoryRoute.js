import express from "express";
const router = express.Router();

// Add inventory item
router.post("/", (req, res) => {
    res.json({ message: "Add inventory item" });
});

// Get all inventory items
router.get("/", (req, res) => {
    res.json({ message: "Get all inventory items" });
});

// Get item by ID
router.get("/:id", (req, res) => {
    res.json({ message: `Get inventory item ${req.params.id}` });
});

// Update item
router.put("/:id", (req, res) => {
    res.json({ message: `Update inventory item ${req.params.id}` });
});

// Delete item
router.delete("/:id", (req, res) => {
    res.json({ message: `Delete inventory item ${req.params.id}` });
});

export default router;

