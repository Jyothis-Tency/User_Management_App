const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    mobile: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      default: "Unknown_person.jpg",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
