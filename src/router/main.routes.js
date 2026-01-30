const { Router } = require("express");
const authorRouter = require("./author.routes");
const bookRouter = require("./book.routes");

const mainRouter = Router();

mainRouter.use("/author", authorRouter);
mainRouter.use("/book", bookRouter);

module.exports = mainRouter;