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

// pagination
let students = localStorageStudentManagement()

let currentPage = 1
let perPage = 5
let startPage = 0
let endPage = perPage
let totalPage = Math.ceil(students.length / perPage)

let btnNext = document.querySelector('.btn-next')
let btnPrevious = document.querySelector('.btn-previous')

let validateEmail = (email) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
};

let validatePhone = (phone) => {
    return /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(phone)
}

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

    if(fullNameElm && emailElm && phoneElm && gender) {

        let studentIds = this.getAttribute('id')
        
        let students  = localStorageStudentManagement()

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
            students.push(studentAll)
        } 
            
        clearForm()

        localStorage.setItem('students', JSON.stringify(students))
        // renderPageNumber()
        if(students) {
            renderListStudent(students)
            alert('Thành công!')
        }
    }
})

function renderListStudent() {
    let students = localStorageStudentManagement()

    let tableContent = ''

    students.map((student, index) => {
        if(index >= startPage && index < endPage) {
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
        }
    });

        document.querySelector('#list-students').innerHTML = tableContent
}

btnNext.addEventListener('click', () => {
    currentPage++
    if(currentPage > totalPage) {
        currentPage = totalPage
    }

    getCurrentPage(currentPage)

    renderListStudent()
})

btnPrevious.addEventListener('click', () => {
    currentPage--
    if(currentPage <= 1) {
        currentPage = 1
    }

    getCurrentPage(currentPage)

    renderListStudent()
})

function renderListPage() {
    let html = ''
    html += `<li class="page-item"><span class="page-link">${1}</span></li>`
    for(let i = 2; i <= totalPage; i++) {
        html += `<li class="page-item"><span class="page-link">${i}</span></li>`
    }
    document.querySelector('#number-page').innerHTML = html
}
renderListPage()

function changePage() {
    const chanePage = document.querySelectorAll('.number-page li')
    for(let i = 0; i < chanePage.length; i++) {
        chanePage[i].addEventListener('click', () => {
            let value = i + 1
            currentPage = value
            getCurrentPage(currentPage)
            renderListStudent()
        })
    }
}
changePage()

function clearForm() {
    fullNameElm.value = ''
    emailElm.value = ''
    phoneElm.value = ''
}


function deleteStudent(id) {
    if(confirm('Bạn có muốn xoá sinh viên này không?')) {
        let students = localStorageStudentManagement()
        
        students.splice(id, 1)

        localStorage.setItem('students', JSON.stringify(students))

        if(students) {
            alert('Xoá sinh viên thành công!')
            renderListStudent(students)
        }

    }
}

function editStudent(id) {
    let students = localStorageStudentManagement()

    if(students.length > 0) {
        fullNameElm.value = students[id].fullname
        emailElm.value = students[id].email
        phoneElm.value = students[id].phone
        gender = students[id].gender

        if(confirm('Bạn có muốn sửa không!')) {
            btnSave.setAttribute('id', id)
        }

    }

}

function localStorageStudentManagement() {
    return localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []
}

function getCurrentPage(currentPage) {
    startPage = (currentPage - 1) * perPage
    endPage  = currentPage * perPage
}
