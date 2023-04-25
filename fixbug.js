let fullNameElm = document.querySelector('#fullname')
let emailElm    = document.querySelector('#email')
let phoneElm    = document.querySelector('#phone')
let maleElm     = document.querySelector('#male')
let famaleElm   = document.querySelector('#famale')

let btnSave     = document.querySelector('.btn-save')

let errorName   = document.querySelector('#fullname-error')
let errorEmail  = document.querySelector('#email-error')
let errorPhone  = document.querySelector('#phone-error')
let errorGender = document.querySelector('#gender-error')


let validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
};

let validatePhone = (phone) => {
    return /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(phone)
}

let localStorageItem = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []

btnSave.addEventListener('click', function() {
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

    if(fullNameElm.value && emailElm.value && phoneElm.value && gender) {

        let studentIds = this.getAttribute('id')
        
        let students  = localStorageItem

        let studentAll = {
            fullname: fullNameElm.value,
            email: emailElm.value,
            phone: phoneElm.value,
            gender: gender
        }

        if(studentIds == 0 || studentIds) {
            students[studentIds] = studentAll
            this.removeAttribute('id')
        } else {
            // console.log(studentIds);
            students.push(studentAll)
        }
            
        clearForm()

        localStorage.setItem('students', JSON.stringify(students))
        renderListStudent(students)
    }
})

function renderListStudent() {
    let students = localStorageItem

    let tableContent = ''

    students.forEach((student, index) => {
        let studentId = index
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
                    <a href="#" onclick="editStudent(${studentId})">Edit</a>
                    <a href="#" onclick="deleteStudent(${studentId})">Delete</a>
                </td>
            </tr>`
        });

        document.querySelector('#list-students').innerHTML = tableContent
}

function clearForm() {
    fullNameElm.value = ''
    emailElm.value = ''
    phoneElm.value = ''
}


function deleteStudent(id) {
    if(confirm('Bạn có muốn xoá dòng này không?')) {
        let students = localStorageItem
        
        students.splice(id, 1)

        localStorage.setItem('students', JSON.stringify(students))

        renderListStudent(students)

    }
}

function editStudent(id) {
    let students = localStorageItem

    if(students.length > 0) {
        fullNameElm.value = students[id].fullname
        emailElm.value = students[id].email
        phoneElm.value = students[id].phone
        gender = students[id].gender

        if(confirm('Ban co muon sua khong')) {
            btnSave.setAttribute('id', id)
        }

    }

}

