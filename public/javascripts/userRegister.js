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
  };

  const valiField = (element, target) => {
    $(element).innerText = null;
  } 


  const verifyEmail = async (email) => {
    try {
      let response = fetch("/api/users/verify-email",{
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

  //email



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
