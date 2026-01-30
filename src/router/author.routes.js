const { Router } = require("express");
const authorController = require("../controller/author.controller");

const authorRouter = Router();

authorRouter.route("/:id")
.get(authorController.GET_AUTHORS)
.put(authorController.UPDATE_AUTHOR)
.delete(authorController.DELETE_AUTHOR);

authorRouter.post("/create", authorController.CREATE_AUTHOR);
authorRouter.get("/all", authorController.GET_AUTHORS);

module.exports = authorRouter;