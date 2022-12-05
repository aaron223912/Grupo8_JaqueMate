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
    exRegMin: /.{6,}/,
    exRegMax: /.{8}/,
  };

  const msgError = (element, msg, target) => {
    $(element).innerText = msg;
    $(element).style.color = "red";
  };

  const valiField = (element, target) => {
    $(element).innerText = null;
    target.classList.remove("invalid");
    target.classList.add("valid");
  } 

  const validPass = (element, exRegs, value) => {
    if(!exRegs.value){
      target.classList.add("text-invalid")
    }else{
      target.classList.add("text-valid")
      target.classList.add("text-invalid")
    }
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