const Product = require("../models/product.model.js")
const ApiFeature = require("../utils/api-features.utils.js")

class ProductController {
  #_productModel;

  constructor() {
    this.#_productModel = Product;
  }

  getAllProducts = async (req, res) => {
    const query = { ...req.query };

    const allResults = await new ApiFeature(this.#_productModel.find(), query)
      .filter()
      .sort("price")
      .limitFields()
      .getQuery()
      .countDocuments();

    const allProducts = await new ApiFeature(this.#_productModel.find(), query)
      .filter()
      .sort("price")
      .limitFields()
      .paginate()
      .getQuery()
      .populate("user", "_id first_name");

    res.send({
      message: "success",
      page: req.query?.page || 0,
      limit: req.query?.limit || 10,
      results: allResults,
      data: allProducts,
    });
  };

  getProductsStats = async (req, res) => {
    const statistics = await this.#_productModel.aggregate([
      {
        $match: {
          rating: {
            $gte: 3,
          },
          price: {
            $lt: 5000000,
          },
          title: /^a/,
        },
      },
      {
        $group: {
          _id: "$color",
          soni: { $sum: 1 },
          avgPrice: { $avg: "$price" },
          minProductPrice: { $min: "$price" },
        },
      },
      {
        $sort: {
          price: 1,
        },
      },
    ]);

    res.send({
      message: "success",
      data: statistics,
    });
  };

  createProduct = async (req, res) => {
    await this.#_productModel.create(req.body);

    res.status(201).send({ message: "success" });
  };

  updateProduct = async (req, res) => {
    const product = await this.#_productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).send({
        message: "Product not found",
      });
    }
    res.status(200).send({
      message: "Product updated successfully",
      data: product,
    });
  };

  deleteProduct = async (req, res) => {
    const product = await this.#_productModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({
        message: "Product not found",
      });
    }
    res.status(200).send({
      message: "Product deleted successfully",
    });
  };
}

module.exports = new ProductController();
