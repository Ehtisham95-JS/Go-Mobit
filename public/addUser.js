const url = '/api/v1';


const addUserForm = document.querySelector('#add-user-form');
const formSubmitBtn = document.querySelector('#form-submit-btn');
const nameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const phoneInput = document.querySelector('#phone-input');
const ageInput = document.querySelector('#age-input');
const emailValidationError = document.querySelector('#email-validation-error');
const ageError = document.querySelector('#age-error');
const successMsg = document.querySelector('#success-msg')

addUserForm.addEventListener('submit', (e)=>{
    e.preventDefault();

   return( fetch(`${url}/register`, {
        method: 'POST',
        body: JSON.stringify({
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            age: ageInput.value
        }),
        headers:{
            'Content-type': 'application/json'
        },
        // redirect:'error'
    })
    .then((response)=> response.json())
    .then((data)=> {
        console.log(data);
        if(data.success) {
            successMsg.style.display = 'block';
            emailValidationError.textContent = ''
            ageError.textContent = '';
            setTimeout(() => {
                
                window.location.href = '/viewUser.html';
            }, 2000);
        }
        if(data.msg.startsWith('User')){
            emailValidationError.textContent = data.msg
        }
        else{
            emailValidationError.textContent = '';
        }
        if(data.msg.startsWith('Age ')){
            ageError.textContent = data.msg;
        }
        else{
            ageError.textContent = '';
        }
        
    }).catch((error)=>{
        console.log(error);
    }))
})



