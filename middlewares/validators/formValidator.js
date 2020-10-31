/************** REQUIRED MODULES **************/
const { check, validationResult, body } = require('express-validator');

/************** MODULE TO EXPORT **************/
var validator = [
    check(`nombre`).isLength({min:3}).withMessage(`El campo 'Nombre' es obligatorio y debe contener al menos 3 caracteres.`),
    check(`remitente`).isEmail().withMessage(`El campo 'Email' es obligatorio y debe contener una direccion de mail.`),
    check(`cargo`).isLength({min:3}).withMessage(`El campo 'Cargo' es obligatorio y debe contener al menos 3 caracteres.`),
];

/************** EXPORTING MODULE **************/
module.exports = validator;