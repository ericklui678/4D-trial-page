import express from "express";
import nodeMailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Joi from "joi";
import User from "../models/User";
const router = express.Router();
dotenv.config();

function validateUser(user) {
  const schema = {
    first_name: Joi.string()
      .alphanum()
      .min(1)
      .max(30)
      .required(),
    last_name: Joi.string()
      .alphanum()
      .min(1)
      .max(30)
      .required(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/),
    phone: Joi.string()
      .min(6)
      .max(20)
  };
  return Joi.validate(user, schema);
}

router.post("/email", (req, res) => {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, //true for 465 port, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PW
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Erick Lui" <erickjin.lui@gmail.com>', // sender address
    to: "elui@4d.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: req.body.content // html body
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("error: " + err);
      res.status(400).send({ success: false });
    } else {
      console.log("success");
      res.status(200).send({ status: true });
    }
  });
});

router.post("/users", (req, res) => {
  const { credentials } = req.body;
  const { error } = validateUser(credentials);

  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  res.status(200).send({ status: true });
});

export default router;
