/************** REQUIRED MODULES **************/
const express = require('express');
const router = express.Router();
const path = require(`path`);
const { check, validationResult, body } = require('express-validator');
const formValidator = require(path.join(__dirname,`..`,`middlewares`,`validators`,`formValidator`));
const nodemailer = require(`nodemailer`);
const ejs = require('ejs');


/************** GET INDEX ROUTES **************/
router.get('/',formValidator, function(req, res, next) {
  let errors = undefined;
  res.render('index', {errors:errors});
});

/************** POST INDEX ROUTES **************/
router.post('/',formValidator, function(req, res, next) {
  if(validationResult(req).isEmpty()) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: `desarrollo.bme@gmail.com` ,
        pass: `Cali3308083`,
      }
    });
    ejs.renderFile(path.join(__dirname,`..`,`views`,`mails`,`contactMail.ejs`), {nombre:req.body.nombre, email:req.body.remitente, cargo:req.body.cargo, firma:req.body.firma, mensaje:req.body.mensaje}, function (err, data) {
      if (err) {
          console.log(err);
      } else {
          var mainOptions = {
              from: '"LANDING" LANDING PAGE',
              to: "caro@bmediseno.com",
              subject: 'Tienes un nuevo contacto',
              html: data
          };
  
          transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
              res.render(`errorMail`)
            } else {
              res.render(`successMail`)
            }
        });
        }
    });
  } else {
    let errors = validationResult(req);
    res.render('index', {errors:errors.errors});
    // res.json(validationResult(req).errors)
  }
});

/************** MODULE EXPORTED **************/
module.exports = router;