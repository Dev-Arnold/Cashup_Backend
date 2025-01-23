import express from "express";
import {
  addProduct,
  allProducts,
  deleteProduct,
  getOneProd,
  updateProduct,
} from "../controllers/productController.js";
import authorize from "../middlewares/aurhorize.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";

const { v2 } = cloudinary;

// Cloudinary configuration
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "Cashup-images",
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

/**
 * @swagger
 * /api/product/:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               snippet:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product added successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", upload.single("productImage"), (req, res, next) => {
  console.log("Multer processed file:", req.file);
  next();
}, addProduct);

/**
 * @swagger
 * /api/product/:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *       401:
 *         description: Unauthorized - No token or invalid token
 *       403:
 *         description: Forbidden - Insufficient permissions
 */
router.get("/", authorize(["Admin", "Staff", "User"]), allProducts);

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Edit a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authorize(["Admin", "Staff"]), updateProduct);

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get details of a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authorize(["Admin", "Staff", "User"]), getOneProd);

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       403:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authorize(["Admin"]), deleteProduct);

export default router;
