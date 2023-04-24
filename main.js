const fullNameElm = document.querySelector('#fullname')
const emailElm    = document.querySelector('#email')
const phoneElm    = document.querySelector('#phone')
const maleElm     = document.querySelector('#male')
const famaleElm   = document.querySelector('#famale')

const btnSave     = document.querySelector('#btnSave')

const errorName   = document.querySelector('#fullname-error')
const errorEmail  = document.querySelector('#email-error')
const errorPhone  = document.querySelector('#phone-error')
const errorGender = document.querySelector('#gender-error')

const validateEmail = (email) => {
    return /^(([^<a>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
};

const validatePhone = (phone) => {
    return /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(phone)
}

const App = {
    init() {
        this.btnCreate()
        // this.renderListStudent()
    },

    btnCreate() {
        btnSave.addEventListener('click', function(event) {
            event.preventDefault()

            // check checked
            let gender = ''
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

            if(fullNameElm && emailElm && phoneElm && gender) {

                let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []

                const studentAll = {
                    fullname: fullNameElm.value,
                    email: emailElm.value,
                    phone: phoneElm.value,
                    gender: gender
                }

                students.push(studentAll)

                localStorage.setItem('students', JSON.stringify(students))

                this.renderListStudent()

            }

             
        })
    },

    renderListStudent() {
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []

        if(students.length === 0) {
            document.querySelector('#list-students').style.display = 'none'
            return false
        }

        document.querySelector('#list-students').style.display = 'block'

        let tableContent = ''
        students.forEach((student, index) => {
            let genderStudent = student.gender === 'male' ? 'Nam' : 'Nữ'
            index++
            tableContent += `
                <tr>
                    <td>${index}</td>
                    <td>${student.fullname}</td>
                    <td>${student.email}</td>
                    <td>${student.phone}</td>
                    <td>${genderStudent}</td>
                    <td>
                        <a href="">Edit</a>
                        <a href="">Delete</a>
                    </td>
                </tr>`
            });

            document.querySelector('#list-students').innerHTML = tableContent
    }

}

App.init()
