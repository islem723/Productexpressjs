import express from "express";

import cors from "cors";
import morgan from "morgan";
import ProductRouter from "./src/Routes/product.routes.js";
import initDbConnection from "./src/config/db.js";
import { PORT } from "./src/config/env.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());

app.use("/api", ProductRouter);

initDbConnection(() =>
  app.listen(PORT, () => console.log(`Listening on ${PORT}`))
);
