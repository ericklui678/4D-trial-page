import express from "express";
import nodeMailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Joi from "joi";
import User from "../models/User";
const saltRounds = 10;
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

// "/api/users" for registering new users
router.post("/users", (req, res) => {
  const { credentials } = req.body;
  const { email, password } = credentials;
  const { error } = validateUser(credentials);

  // status 400 if validation errors
  if (error) return res.status(400).send(error.details[0].message);

  // if no errors, hash pw and check db whether email exists
  bcrypt.hash(password, saltRounds).then(hashedPassword => {
    let userObj = Object.assign({}, credentials);
    userObj.passwordHash = hashedPassword;

    const user = new User(userObj);
    User.findOne({ email: user.email }).then(foundUser => {
      if (foundUser) {
        res.status(400).json({ errors: "Email already exists" });
      } else {
        user.licenseAlreadySent = true;
        user.save().then(user => {
          res.json({ user: user.toAuthJSON() });
        });
      }
    });
  });
});

// "/api/session" for authenticating login credentials
router.post("/session", (req, res) => {
  const { credentials } = req.body;
  const { email, password } = credentials;

  User.findOne({ email }).then(foundUser => {
    if (foundUser) {
      // check hashed password
      bcrypt.compare(password, foundUser.passwordHash).then(match => {
        // if pw match, return user json
        if (match) return res.json({ user: foundUser.toAuthJSON() });
        // else return error to client
        return res.status(401).json({ errors: "Incorrect password" });
      });
    } else {
      return res.status(400).json({
        errors:
          "Email has not been registered under 4D. Please create an account."
      });
    }
  });
});

export default router;
