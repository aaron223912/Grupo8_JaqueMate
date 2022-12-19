console.log('conected');

const $ = (element) => document.querySelector(element)

const exRegs = {
    exRegAlfa: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
    exRegEmail: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
    exRegNumEnt: /^[0-9]+$/,
    exRegNumDec: /^\d*(\.\d{1})?\d{0,1}$/,
    exRegPass:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,8}/,
    exRegMayu: /[A-Z]/,
    exRegMinu: /[a-z]/,
    exRegNum: /[0-9]/,
    exRegEsp: /[$@$!%*?&]/,
    exRegMinMax: /.{6,8}/,
};

const msgError = (element, msg, target) => {
    $(element).innerText = msg;
    $(element).style.color = "red";
    target.classList.add('is-invalid')
};

const valiField = (element, target) => {
    $(element).innerText = null;
    target.classList.add('is-valid')
    target.classList.remove('is-invalid')
}

$('#name').addEventListener('blur', function ({ target }) {

    switch (true) {
        case !this.value.trim():
            msgError('#errorName', 'El nombre es obligatorio', target)
            this.style.borderColor = "red"
            break;

        case this.value.trim().length < 2:
            msgError('#errorName', 'El nombre debe tener como minimo dos carácteres', target)
            this.style.borderColor = "red"
            break;

        case !exRegs.exRegAlfa.test(this.value):
            msgError('#errorName', 'El nombre debe tener carácteres alfabeticos', target)
            this.style.borderColor = "red"
            break;

        default:
            valiField("#errorName", target)
            this.style.borderColor = "#4F7F3F"
            break; 
    }
})

$('#description').addEventListener('blur', function ({ target }) {

    switch (true) {
        case !this.value.trim():
            msgError('#errorDescription', 'La descripcion es obligatoria', target)
            this.style.borderColor = "red"
            break;

        case this.value.trim().length < 10:
            msgError('#errorDescription', 'La descripcion debe tener como minimo diez carácteres', target)
            this.style.borderColor = "red"
            break;

        case exRegs.exRegEsp.test(this.value):
            msgError('#errorDescription', 'La descripcion no debe tener caracteres especiales', target)
            this.style.borderColor = "red"
            break;

        default:
            valiField('#errorDescription', target)
            this.style.borderColor = "#4F7F3F"
            break; 
    }
})

$('#price').addEventListener('blur', function ({ target }) {

    switch (true) {
        case !this.value.trim():
            msgError('#errorPrice', 'El precio es obligatorio', target)
            this.style.borderColor = "red"
            break;

        case !exRegs.exRegNumEnt.test(this.value):
            msgError('#errorPrice', 'Solo números', target)
            this.style.borderColor = "red"
            break;

        default:
            valiField('#errorPrice', target)
            this.style.borderColor = "#4F7F3F"
            break; 
    }
})

$('#discount').addEventListener('blur', function ({ target }) {

    switch (true) {
        
        case !exRegs.exRegNumEnt.test(this.value):
            msgError('#errorDiscount', 'Solo números', target)
            this.style.borderColor = "red"
            break;

        default:
            valiField('#errorDiscount', target)
            this.style.borderColor = "#4F7F3F"
            break; 
    }
})