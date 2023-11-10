import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import mongoosePaginate from "mongoose-paginate";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    activeToken: {
      type: String,
    },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

schema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d", // if user is not trying to logged in another device then token will expires in 15 days
  });
};

// generate password
schema.methods.generatePassword = async function (password) {
  let salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
// matchPassword
schema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", schema);
export { User };
