const { Schema, model } = require("mongoose");

const authorSchema = new Schema(
  {
    full_name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Author full name is required!"],
      minlength: [3, "Author full name must be at least 3 characters long"],
    },

    date_of_birth: {
      type: Date,
      required: [true, "Author date of birth is required!"],
    },

    date_of_death: {
      type: Date,
      default: null,
      validate: {
        validator: function (value) {
          if (!value) return true;
          return value > this.date_of_birth;
        },
        message: "Date of death must be after date of birth!",
      },
    },

    bio: {
      type: String,
      trim: true,
      required: [true, "Author bio is required!"],
      minlength: [10, "Author bio must be at least 10 characters long"],
    },

    years_active: {
      type: String,
      trim: true,
      required: [true, "Years active is required!"],
      minlength: [4, "Years active must be at least 4 characters long"],
    },

    photos: {
      type: [String],
      required: [true, "Author photos are required!"],
      validate: {
        validator: arr => Array.isArray(arr) && arr.length > 0,
        message: "At least one author photo is required!",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("authors", authorSchema);