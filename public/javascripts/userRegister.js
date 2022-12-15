console.log("conectadoo");

const $ = (element) => document.querySelector(element);

const exRegs = {
    exRegAlfa: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
    exRegEmail: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
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


  const verifyEmail = async (email) => {
    try {
      let response = await fetch("/api/users/verify-email",{
        method: "POST",
        body: JSON.stringify({
          email : email
        }),
        headers: {
          "Content-Type" : "application/json"
        }
      });


      let result = await response.json();

      console.log(result);
      
      return result.verified

    } catch (error) {
      console.error
    }
  }

  window.addEventListener("load", () => {
    console.log("hola mundo");
    
  })
 
  $("#nombre").addEventListener("blur", function ({ target }) {
    switch (true) {
      case !this.value.trim():
        msgError(".nombreError", "Debes completar el campo con tu nombre", target)
        this.style.borderColor= "red"
        break;
      case this.value.trim().length < 2:
        msgError(".nombreError", "El nombre debe tener más de dos caracteres", target)
        this.style.borderColor= "red"
        break;
      case !exRegs.exRegAlfa.test(this.value):
        msgError(".nombreError", "Solo caracteres alfabetico", target)
        this.style.borderColor= "red"
        break;
      default:
        valiField(".nombreError", target)
        this.style.borderColor= "#4F7F3F"
        break;
    }
  })


  $("#apellido").addEventListener("blur", function ({target}){
    switch (true) {
      case !this.value.trim():
        msgError(".apellidoError", "Debes completar el campo con tu apellido", target)
        this.style.borderColor= "red"
         break;
      case this.value.trim().length < 2:
        msgError(".apellidoError", "El apellido debe tener más de dos caracteres")
        this.style.borderColor= "red"
        break;
      case !exRegs.exRegAlfa.test(this.value):
        msgError(".apellidoError", "Solo caracteres alfabeticos", target)
        this.style.borderColor= "red"
        break;
      default:
        valiField(".apellidoError", target)
        this.style.borderColor= "#4F7F3F"
        break;
    }
  })

  $('#email').addEventListener('blur', async function({target}){
    switch (true) {
      case !this.value.trim():
        msgError('.emailError', 'Debes completar este campo con tu email', target)
        this.style.borderColor= "red"
        break;
      case !exRegs.exRegEmail.test(this.value):
        msgError('.emailError', 'No tiene formato de email', target)
        this.style.borderColor= "red"
       break;
       case await verifyEmail(this.value):
        msgError('.emailError', 'El email ya está registrado', target)
        this.style.borderColor= "red"
        break;
      default:
        valiField(".emailError", target)
        this.style.borderColor= "#4F7F3F"
        break;
    }
  })



  $('#password').addEventListener('blur', function({target}){
    switch (true) {
      case !this.value.trim():
        msgError(".passwordError", "Debes completar el campo con tu contraseña", target)
        this.style.borderColor = "red"
        break;
      case !exRegs.exRegPass.test(this.value):
        msgError(".passwordError", "La contraseña debe tener un símbolo, una número, una mayúscula, una minúscula y entre 6 y 8 caracteres", target);
        this.style.borderColor = "red"
        break;
      default:
        valiField(".passwordError", target)
        this.style.borderColor= "#4F7F3F"
        break;
    }
  })

  $('#password2').addEventListener('blur', function({target}){
    switch (true) {
      case !this.value.trim():
        msgError(".passwordError2", "Debes completar el campo con tu contraseña", target)
        this.style.borderColor = "red"
        break;
      case this.value.trim() !== $('#password').value.trim():
        msgError('.passwordError2', 'Las contraseñas no coinciden', target)
        this.style.borderColor = "red"
        break;
      default:
        valiField(".passwordError2", target)
        this.style.borderColor= "#4F7F3F"
        break;
    }
  })

  $('#term').addEventListener("click", function({target}) {

    validField('errorTerms', target)

  })

$('.registro__main__formulario').addEventListener('submit', function(e){
  e.preventDefault();
  let error = false;

  if(!$('#term').checked){
    error = true;
    $('.termError').innerText = 'Debes aceptar los terminos y condiciones';
    $('.termError').style.color = 'red';
    $('.termError').classList.add('is-invalid')
  }



  const elements = this.elements;
  for (let i = 0; i < elements.length - 2; i++) {
    if(!this.elements[i].value.trim() || elements[i].style.borderColor === 'red'){
      elements[i].style.borderColor = 'red'
      $('.error-form').innerText = 'Se encontraron errores en el formulario';
      $('.error-form').style.color = 'red'
      error = true
    }
    
  }
  

  !error && this.submit()
})


$('#btn-show-pass').addEventListener('click', function ({target}){
  console.log(target.localName);
    if(target.localName === "i"){
      target.classList.toggle("fa-eye");
      $("#password").type = $("#password").type === "text" ? "password" : "text";
    }else {
      target.childNodes[0].classList.toggle("fa-eye");
      $("#password").type = $("#password").type === "text" ? "password" : "text";
    }
})