import express from "express";
import {
  addProduct,
  allProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";
import authorize from "../middlewares/aurhorize.js";
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
      folder: 'Cashup-images',
      allowedFormats: ['jpg', 'png', 'jpeg'],
  },
});


const upload = multer({ storage: storage });

const router = express.Router();

// router.post("/", authorize(["Admin", "Staff"]), addProduct); // add new product
// router.post("/", upload.single('productImage'), addProduct); // add new product
router.post("/", upload.single('productImage'), (req, res, next) => {
  console.log('Multer processed file:', req.file);
  next();
}, addProduct);


router.get("/", authorize(["Admin", "Staff"]), allProducts); // get list of all products

router.put("/:id", authorize(["Admin", "Staff"]), updateProduct);

router.delete("/:id", authorize(["Admin"]), deleteProduct);

export default router;
