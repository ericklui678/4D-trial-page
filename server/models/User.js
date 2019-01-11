import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const schema = mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    passwordHash: String,
    phone: String,
    firstRequest: Boolean
  },
  { timestamps: true }
);

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email
    },
    process.env.JWT_SECRET
  );
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    first_name: this.first_name,
    last_name: this.last_name,
    email: this.email,
    token: this.generateJWT(),
    createdAt: this.createdAt
  };
};

export default mongoose.model("User", schema);
