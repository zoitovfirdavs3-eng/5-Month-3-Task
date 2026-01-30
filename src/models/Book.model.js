const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Book title is required!"],
    },
    pages: {
      type: Number,
      min: [10, "Book pages must be at least 10"],
      required: [true, "Book pages is required!"],
    },
    published_year: {
      type: Number,
      required: [true, "Published year is required!"],
    },
    genre: {
      type: String,
      trim: true,
      required: [true, "Book genre is required!"],
    },
    publisher: {
      type: String,
      trim: true,
      required: [true, "Publisher is required!"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "authors",
      required: [true, "Book author is required!"],
    },
    description: {
      type: String,
      trim: true,
      minlength: [20, "Description must be at least 20 characters long"],
      required: [true, "Book description is required!"],
    },
    cover_image: {
      type: String,
      trim: true,
      required: [true, "Book cover image is required!"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("books", bookSchema);