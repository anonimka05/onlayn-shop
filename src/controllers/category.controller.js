const Category = require("../models//category.models.js");

class CategoryController {
  #_categoryModel;

  constructor() {
    this.#_categoryModel = Category;
  }

  getAllCategories = async (req, res) => {
    try {
      const query = { ...req.query };

      const allResults = await new ApiFeature(
        this.#_categoryModel.find(),
        query
      )
        .filter()
        .sort("name")
        .limitFields()
        .getQuery()
        .countDocuments();

      const allCategories = await new ApiFeature(
        this.#_categoryModel.find(),
        query
      )
        .filter()
        .sort("name")
        .limitFields()
        .paginate()
        .getQuery();

      res.status(200).send({
        message: "success",
        page: req.query?.page || 0,
        limit: req.query?.limit || 10,
        results: allResults,
        data: allCategories,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  getCategoryStats = async (req, res) => {
    try {
      const statistics = await this.#_categoryModel.aggregate([
        {
          $match: {
            name: { $regex: /^A/i },
          },
        },
        {
          $group: {
            _id: "$category_id",
            soni: { $sum: 1 },
            avgNameLength: { $avg: { $strLenCP: "$name" } },
            uniqueCategories: { $addToSet: "$name" },
          },
        },
        {
          $sort: {
            avgNameLength: 1,
          },
        },
      ]);

      res.status(200).send({
        message: "success",
        data: statistics,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  createCategory = async (req, res) => {
    try {
      const newCategory = await this.#_categoryModel.create(req.body);
      res.status(201).send({
        message: "Category created successfully",
        data: newCategory,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  updateCategory = async (req, res) => {
    try {
      const updatedCategory = await this.#_categoryModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedCategory) {
        return res.status(404).send({
          message: "Category not found",
        });
      }
      res.status(200).send({
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  deleteCategory = async (req, res) => {
    try {
      const category = await this.#_categoryModel.findByIdAndDelete(
        req.params.id
      );
      if (!category) {
        return res.status(404).send({
          message: "Category not found",
        });
      }
      res.status(200).send({
        message: "Category deleted successfully",
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
}

module.exports = new CategoryController();
