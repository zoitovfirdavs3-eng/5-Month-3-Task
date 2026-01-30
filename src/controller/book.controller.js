const { globalError, ClientError } = require("shokhijakhon-error-handler");
const BookModel = require("../models/Book.model");
const AuthorModel = require("../models/Author.model");
const { isValidObjectId } = require("mongoose");

module.exports = {
  async CREATE_BOOK(req, res) {
    try {
      let newBook = req.body;
      let findAuthor = await AuthorModel.findById(newBook.author);
      if (!findAuthor) throw new ClientError("Author not found", 404);
      let insertBook = await BookModel.create(newBook);
      return res
        .status(201)
        .json({
          message: "Book successfully created !",
          status: 201,
          id: insertBook._id,
        });
    } catch (err) {
      return globalError(err, res);
    }
  },
  async GET_BOOKS(req, res) {
    try {
      let books = await BookModel.find().populate("author", {
        full_name: 1,
        _id: 0,
      });
      let { id } = req.params;
      if(!isValidObjectId(id)) throw new ClientError("Invalid object id !", 500);
      if (id) {
        let findBook = await BookModel.findById(id);
        if (!findBook) throw new ClientError("Book not found", 404);
        return res.json(findBook);
      }
      return res.json(books);
    } catch (err) {
      return globalError(err, res);
    }
  },
  async UPDATE_BOOK(req, res) {
    try {
      let updateData = req.body;
      let {id} = req.params;
      if(!isValidObjectId(id)) throw new ClientError("Invalid object id !", 400);
      let findBook = await BookModel.findById(id);
      if(!findBook) throw new ClientError("Book not found !", 404);
      await findBook.updateOne(updateData);
      return res.json({ message: "Book successfully updated", status: 200});
    } catch (err) {
      return globalError(err, res);
    }
  },
  async DELETE_BOOK(req, res) {
    try {
      let {id} = req.params;
      if(!isValidObjectId(id)) throw new ClientError("Invalid object id !", 400);
      let findBook = await BookModel.findById(id);
      if(!findBook) throw new ClientError("Book not found !", 404);
      await findBook.deleteOne();
      return res.json({message: "Book successfully deleted !", status: 200})
    } catch (err) {
      return globalError(err, res);
    }
  },
};
