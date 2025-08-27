import express from "express";
const router = express.Router();

// Create category
router.post("/", (req, res) => {
    res.json({ message: "Create category" });
});

// Get all categories
router.get("/", (req, res) => {
    res.json({ message: "Get all categories" });
});

// Get category by ID
router.get("/:id", (req, res) => {
    res.json({ message: `Get category ${req.params.id}` });
});

// Update category
router.put("/:id", (req, res) => {
    res.json({ message: `Update category ${req.params.id}` });
});

// Delete category
router.delete("/:id", (req, res) => {
    res.json({ message: `Delete category ${req.params.id}` });
});

export default router;
