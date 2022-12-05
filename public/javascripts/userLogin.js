console.log('conected');

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
       case await verifyEmail(this.value) == false:
        msgError('.emailError', 'El email no se encuentra en la base de datos', target)
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
        default:
        valiField(".passwordError", target)
        this.style.borderColor= "#4F7F3F"
        break;
    }
  })

  $('.login__main__formulario').addEventListener('submit', function(e){
    e.preventDefault();
    let error = false;

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