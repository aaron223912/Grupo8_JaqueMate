console.log('conected');

const $ = (element) => document.querySelector(element)

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
    target.classList.remove('is-ivalid')
  }


  $('#nombre').addEventListener('blur', function ({ target }){
    switch (true) {
        case this.value.trim():
            msgError('.errorNombre', 'El nombre es obligatorio, no puedes dejar el campo vacio', target)
            this.style.borderColor= "red";
            break;
        case this.value.trim().length < 2:
            msgError(".errorNombre", "El nombre debe tener más de dos caracteres", target)
            this.style.borderColor= "red"
        break
        case !exRegs.exRegAlfa.test(this.value):
            msgError(".errorNombre", "Solo caracteres alfabetico", target)
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
        msgError(".errorApellido", "El apellido es obligatorio, no puedes dejar el campo vacio", target)
        this.style.borderColor= "red"
         break;
      case this.value.trim().length < 2:
        msgError(".errorApellido", "El apellido debe tener más de dos caracteres")
        this.style.borderColor= "red"
        break;
      case !exRegs.exRegAlfa.test(this.value):
        msgError(".errorApellido", "Solo caracteres alfabeticos", target)
        this.style.borderColor= "red"
        break;
      default:
        valiField(".errorApellido", target)
        this.style.borderColor= "#4F7F3F"
        break;
    }
  })


const allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

$('#avatar').addEventListener('change', function ({ target }) {

    if(!allowedExtensions.exec(target.value)){
        $("msgErrorAvatar").innerText = "Solo archivos de imagen!"
        target.value = null;

    }else{
        let reader = new FileReader();

        reader.readAsDataURL(target.files[0]);
    
        reader.onload = () => {
            $('#imagePreview').src = reader.result
        }
    }
    
});

  $('.registro__main__formulario').addEventListener('submit', function(e){
    e.preventDefault();
    let error = false;
  

  
  if($('#nombre').style.borderColor === 'red' || $('#apellido').style.borderColor === 'red'){
    $('#nombre').style.borderColor = 'red';
    $('#apellido').style.borderColor = 'red';
    $('.error-form').innerText = 'Se encontraron errores en el formulario';
    $('.error-form').style.color = 'red'
    error = true

  }
  

    
  
    !error && this.submit()
  })