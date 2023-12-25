import { model, Schema } from "mongoose";

export default model(
  "Product",
  new Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      trim: true,
    },
  })
);
