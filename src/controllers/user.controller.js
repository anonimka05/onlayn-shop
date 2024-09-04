const { isValidObjectId } = require("mongoose");
const User = require("../models/user.models.js");
const ApiFeature = require("../utils/api-features.utils.js");

class UserController {
  #_userModel;

  constructor() {
    this.#_userModel = User;
  }

  getAllUsers = async (req, res) => {
    try {
      const query = { ...req.query };

      const allResults = await new ApiFeature(this.#_userModel.find(), query)
        .filter()
        .sort("first_name")
        .limitFields()
        .getQuery()
        .countDocuments();

      const allUsers = await new ApiFeature(this.#_userModel.find(), query)
        .filter()
        .sort("first_name")
        .limitFields()
        .paginate()
        .getQuery()
        .populate("products", "_id title price");

      res.send({
        message: "success",
        page: req.query?.page || 1,
        limit: req.query?.limit || 10,
        results: allResults,
        data: allUsers,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  };

  getUserById = async (req, res) => {
    try {
      const user = await this.#_userModel
        .findById(req.params.id)
        .populate("products");
        console.log(req.params.id);
        
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send({
        message: "User retrieved successfully",
        data: product_id,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to retrieve user",
        error: error.message,
      });
    }
  };

  createUser = async (req, res) => {
    try {
      const { first_name, last_name, phone, interests, status, age } = req.body;
      console.log(req.body);

      const newUser = await this.#_userModel.create({
        first_name,
        last_name,
        phone,
        interests,
        status,
        age,
      });

      res.status(201).send({
        message: "success",
        data: newUser,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };

  updateUser = async (req, res) => {
    try {
      const { firstName, lastName, phone, interests, ...rest } = req.body;

      const userId = req.params?.userId;

      this.#_checkObjectId(userId);

      const foundedUser = await this.#_userModel.findById(userId);

      if (!foundedUser) {
        return res.status(404).send({
          message: "User topilmadi",
        });
      }

      const newUser = await this.#_userModel.findByIdAndUpdate(
        userId,
        {
          $set: {
            first_name: firstName,
            last_name: lastName,
            phone,
            interests,
            ...rest,
          },
        },
        {
          strict: false,
        }
      );

      res.status(200).send({
        message: "success",
        data: newUser,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { firstName, lastName, phone, interests, ...rest } = req.body;

      const userId = req.params?.userId;

      this.#_checkObjectId(userId);

      await this.#_userModel.findByIdAndDelete(userId);

      res.status(200).send({
        message: "success",
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  };

  #_checkObjectId = (id) => {
    if (!isValidObjectId(id)) {
      throw new Error(`Id: ${id} is not a valid object id`);
    }

    return null;
  };
}

module.exports = new UserController();
