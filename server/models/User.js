import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const schema = mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    passwordHash: String,
    phone: String
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
    token: this.generateJWT()
  };
};

export default mongoose.model("User", schema);
