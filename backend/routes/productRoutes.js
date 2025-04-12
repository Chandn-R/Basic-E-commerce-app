import express from "express";
import { getAllProducts, createProducts, getProduct, updateProducts, deleteProducts } from "../controllers/productController.js";


const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", createProducts);
router.put("/:id", updateProducts);
router.delete("/:id", deleteProducts);

export default router;