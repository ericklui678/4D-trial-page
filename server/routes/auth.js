import express from "express";
import nodeMailer from "nodemailer";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config();

let transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, //true for 465 port, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PW
  }
});

router.post("/email", (req, res) => {
  // res.send(req.body.content);

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

export default router;
