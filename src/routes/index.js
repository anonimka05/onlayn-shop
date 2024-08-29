const { Router } = require("express");
const userRouter = require("./user.routes.js");
const productRouter = require("./product.routes.js");
const orderItemRouter = require("./orderItems.routes.js");
const orderRouter = require("./orderItems.routes.js");
const contractRouter = require("./contract.routes.js");
const paymentRouter = require("./payments.routes.js");
const contractTypeRouter = require("./contract_type.routes.js");
const categoryRouter = require("./category.routes.js");

const routes = Router();

routes
  .use("/users", userRouter)
  .use("/products", productRouter)
  .use("/order-item", orderItemRouter)
  .use("/orders", orderRouter)
  .use("/contract", contractRouter)
  .use("/payments", paymentRouter)
  .use("/contract-types", contractTypeRouter)
  .use("/category", categoryRouter);

module.exports = routes;
