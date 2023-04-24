let fullNameElm = document.querySelector('#fullname')
let emailElm    = document.querySelector('#email')
let phoneElm    = document.querySelector('#phone')
let maleElm     = document.querySelector('#male')
let famaleElm   = document.querySelector('#famale')
let gender      = ''

let btnSave     = document.querySelector('#btnSave')

let errorName   = document.querySelector('#fullname-error')
let errorEmail  = document.querySelector('#email-error')
let errorPhone  = document.querySelector('#phone-error')
let errorGender = document.querySelector('#gender-error')

const validateEmail = (email) => {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
};

const validatePhone = (phone) => {
    return /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(phone)
}

const App = {
    init() {
        this.btnCreate()
    },

    btnCreate() {
        btnSave.addEventListener('click', function(event) {
            event.preventDefault()

            // check checked
            if(maleElm.checked) {
                gender = maleElm.value
            } else if(famaleElm.checked) {
                gender = famaleElm.value
            }
    
            // check fullname
            if(fullNameElm.value.trim() == '') {
                errorName.innerHTML = 'Vui lòng nhập họ và tên của bạn!'
            } else if(fullNameElm.value.length <= 2) {
                errorName.innerHTML = 'Họ và tên không được nhỏ hơn 2 ký tự!'
            } else {
                errorName.innerHTML = ''
            }

            // check email
            if(emailElm.value.trim() == '') {
                errorEmail.innerHTML = 'Vui lòng nhập email của bạn!'
            } else if(!validateEmail(email)) {
                errorEmail.innerHTML = 'Email phải đúng định dạng example@gmail.com!'
            } else {
                errorEmail.innerHTML = ''
            }

            // Check phone number
            if(phoneElm.value.trim() == '') {
                errorPhone.innerHTML = 'Vui lòng nhập số điện thoại của bạn!'
            } else if(!validatePhone(phone)) {
                errorPhone.innerHTML = 'Số điện thoại của bạn phải đủ 10 số!'
            }
            else {
                errorPhone.innerHTML = ''
            }

            // Check gender
            if(!isNaN(gender)) {
                errorGender.innerHTML = 'Vui lòng chọn giới tính của bạn!'
            } else {
                errorGender.innerHTML = ''
            }
            
            
        })
    }

}

App.init()
