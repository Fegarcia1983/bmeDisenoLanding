window.onload = function() {
    let form = document.querySelector('#formularioContacto');
    let button = form.submitButton
    let alert = document.querySelector('#formularioError');
    let [checkName, checkMail, checkCargo] = [false, false, false];
    button.addEventListener(`click`, (e) => {
        if(!(checkName && checkMail && checkCargo)) {
            event.preventDefault();
            alert.removeAttribute(`hidden`);
        }
    })
    form.nombre.addEventListener(`keyup`,(e) => {
        if(e.target.value.length < 3) {
            (e.target.classList.contains(`invalid`))? e.target.classList.replace('is-valid', 'is-invalid') : e.target.classList.add('is-invalid');
            checkName = false;
        } else { 
            e.target.classList.replace('is-invalid', 'is-valid');
            checkName = true;
        }
    })
    form.remitente.addEventListener(`keyup`, (e) => {
        let exprMail= /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        if(e.target.value.match(exprMail) == null) {
            (e.target.classList.contains(`invalid`))? e.target.classList.replace('is-valid', 'is-invalid') : e.target.classList.add('is-invalid');
            checkMail = false;
        } else {
            e.target.classList.replace('is-invalid', 'is-valid');
            checkMail = true;
        }
    })
    form.cargo.addEventListener(`keyup`,(e) => {
        if(e.target.value.length < 3) {
            (e.target.classList.contains(`invalid`))? e.target.classList.replace('is-valid', 'is-invalid') : e.target.classList.add('is-invalid');
            checkCargo = false;
        } else {
            e.target.classList.replace('is-invalid', 'is-valid');
            checkCargo = true;
        }
    })
    let errors = document.querySelector(`#errorsQty`).textContent;
    if(errors >= 1) {
        $('#ModalValidator').modal()
    }
}