import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  UpdateProduct,
  getAllProducts,
  getProductById,
  getAllProductsTRi,
  getAllProductsFilter,
  getAllProductsPagination,
} from "../Controllers/product.controller.js";

const router = Router();

router.route("/").get(getAllProducts).post(createProduct);

router
  .route("/:productId")
  .get(getProductById)
  .get(getAllProductsFilter)
  .put(UpdateProduct)
  .get(getAllProductsPagination)
  .get(getAllProductsTRi)
  .delete(deleteProduct);

export default router;
