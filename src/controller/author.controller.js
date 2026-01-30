const { globalError, ClientError } = require("shokhijakhon-error-handler");
const AuthorModel = require("../models/Author.model");
const { isValidObjectId } = require("mongoose");
const BookModel = require("../models/Book.model");

module.exports = {
  async CREATE_AUTHOR(req, res) {
    try {
      let newAuthor = req.body;
      let insertAuthor = await AuthorModel.create(newAuthor);
      return res.status(201).json({
        message: "Author successfully created !",
        status: 201,
        id: insertAuthor._id,
      });
    } catch (err) {
      return globalError(err, res);
    }
  },
  async GET_AUTHORS(req, res) {
    try {
      let authors = await AuthorModel.find();
      let { id } = req.params;
      if(!isValidObjectId(id)) throw new ClientError("Invalid object id !", 500);
      if (id) {
        let findAuthor = await AuthorModel.findById(id);
        if (!findAuthor) throw new ClientError("Author not found", 404);
        return res.json(findAuthor);
      }
      return res.json(authors);
    } catch (err) {
      return globalError(err, res);
    }
  },
  async UPDATE_AUTHOR(req, res) {
    try {
      let updateData = req.body;
      let { id } = req.params;
      if(!isValidObjectId(id)) throw new ClientError("Invalid object id !", 500);
      let findAuthor = await AuthorModel.findById(id);
      if (!findAuthor) throw new ClientError("Author not found !", 404);
      await findAuthor.updateOne(updateData);
      return res.json({
        message: "Author successfully updated !",
        status: 200,
      });
    } catch (err) {
      return globalError(err, res);
    }
  },
  async DELETE_AUTHOR(req, res) {
    try {
      let { id } = req.params;
      if(!isValidObjectId(id)) throw new ClientError("Invalid object id !", 500);
      let findAuthor = await AuthorModel.findById(id);
      if (!findAuthor) throw new ClientError("Author not found !", 404);
      await BookModel.deleteMany({author: req.params.id})
      await findAuthor.deleteOne();
      return res.json({message: "Author successfully deleted !", status: 200});
    } catch (err) {
      return globalError(err, res);
    }
  },
};
