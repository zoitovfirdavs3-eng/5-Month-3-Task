const { Router } = require("express");
const bookController = require("../controller/book.controller");

const bookRouter = Router();

bookRouter.route("/:id")
.get(bookController.GET_BOOKS)
.put(bookController.UPDATE_BOOK)
.delete(bookController.DELETE_BOOK);

bookRouter.post("/create", bookController.CREATE_BOOK);
bookRouter.get("/all", bookController.GET_BOOKS);

module.exports = bookRouter;