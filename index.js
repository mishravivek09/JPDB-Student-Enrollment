const dbUrl = "http://api.login2explore.com:5577";
const getUrlEndpoint = "/api/irl";
const postUrlEndpoint = "/api/iml";
const dbName = "SCHOOL-DB";
const tableName = "STUDENT-TABLE";
const connToken = "90932823|-31949279105443947|90948161";



document.querySelector("#rollNo").addEventListener("keyup", () => {
    let studentId = document.querySelector("#rollNo");
    let saveBtn = document.querySelector("#save");
    let resetBtn = document.querySelector("#reset");
    if (studentId.value != "") {
        document.querySelector("#name").disabled = false;
        saveBtn.disabled = false;
        saveBtn.style.backgroundColor = "#4CAF50";
        saveBtn.style.cursor = "Pointer";
        resetBtn.disabled = false;
        resetBtn.style.backgroundColor = "#4CAF50";
        resetBtn.style.cursor = "Pointer";
    }
})
document.querySelector("#name").addEventListener("keyup", () => {
    let studentName = document.querySelector("#name");
    if (studentName.value != "") {
        document.querySelector("#class").disabled = false;
    }
})
document.querySelector("#class").addEventListener("keyup", () => {
    let studentClass = document.querySelector("#class");
    if (studentClass.value != "") {
        document.querySelector("#dob").disabled = false;
    }
})
document.querySelector("#dob").addEventListener("change", () => {
    let studentDob = document.querySelector("#dob");
    if (studentDob.value != "") {
        document.querySelector("#address").disabled = false;
    }
})
document.querySelector("#address").addEventListener("keyup", () => {
    let studentAddress = document.querySelector("#address");
    if (studentAddress.value != "") {
        document.querySelector("#enDate").disabled = false;
    }
})

document.querySelector("#reset").addEventListener("click", () => {
    resetForm();
})
function resetForm() {
    let saveBtn = document.querySelector("#save");
    let resetBtn = document.querySelector("#reset");
    let changeBtn = document.querySelector("#change");
    document.querySelector("#student-form").reset();
    document.querySelector("#rollNo").disabled = false;
    document.querySelector("#rollNo").focus();
    document.querySelector("#name").disabled = true;
    document.querySelector("#class").disabled = true;
    document.querySelector("#dob").disabled = true;
    document.querySelector("#address").disabled = true;
    document.querySelector("#enDate").disabled = true;
    saveBtn.disabled = true;
    saveBtn.style.backgroundColor = "#3e8e41";
    saveBtn.style.cursor = "not-allowed";
    resetBtn.disabled = true;
    resetBtn.style.backgroundColor = "#3e8e41";
    resetBtn.style.cursor = "not-allowed";
    changeBtn.disabled = true;
    changeBtn.style.backgroundColor = "#3e8e41";
    changeBtn.style.cursor = "not-allowed";
}
function validateForm(data) {
    if (data.RollNo == "") {
        alert("Please enter student roll number !");
        document.querySelector("#rollNo").focus();
    } else if (data.FullName == "") {
        alert("Please enter student full name !");
        document.querySelector("#name").focus();
    } else if (data.Class == "") {
        alert("Please enter student class !")
        document.querySelector("#class").focus();
    } else if (data.DOB == "") {
        alert("Please enter student dob !");
        document.querySelector("#dob").focus();
    } else if (data.Address == "") {
        alert("Please enter student address !");
        document.querySelector("#address").focus();
    } else if (data.EnrollmentDate == "") {
        alert("Please enter student enrollment date");
        document.querySelector("#enDate").focus();
    } else {
        return data;
    }
}
function showData(data) {
    let form = document.querySelector("#student-form");
    let rollNo = form.rollNo;
    let name = form.name;
    let studentClass = form.class;
    let dob = form.dob;
    let address = form.address;
    let enDate = form.enDate;

    rollNo.disabled = true;
    name.disabled = false;
    studentClass.disabled = false;
    dob.disabled = false;
    address.disabled = false;
    enDate.disabled = false;

    name.value = data.record.FullName;
    studentClass.value = data.record.Class;
    dob.value = data.record.DOB;
    address.value = data.record.Address;
    enDate.value = data.record.EnrollmentDate;
}

function getStudentData(connToken, dbName, tableName, dbUrl, getUrlEndpoint) {
    let rollNo = document.querySelector("#rollNo").value;
    let studentId = {
        "RollNo": rollNo
    }
    let data = JSON.stringify(studentId);
    let request = createGET_BY_KEYRequest(connToken, dbName, tableName, data);
    jQuery.ajaxSetup({ async: false });
    let response = executeCommandAtGivenBaseUrl(request, dbUrl, getUrlEndpoint);
    jQuery.ajaxSetup({ async: true });
    if (response.status == 200) {
        document.querySelector("#name").focus();
        let saveBtn = document.querySelector("#save");
        let resData = JSON.parse(response.data);
        let changeBtn = document.querySelector("#change");
        let resetBtn = document.querySelector("#reset");
        changeBtn.disabled = false;
        resetBtn.disabled = false;
        resetBtn.style.backgroundColor = "#4CAF50";
        resetBtn.style.cursor = "Pointer";
        changeBtn.style.backgroundColor = "#4CAF50";
        changeBtn.style.cursor = "Pointer";
        saveBtn.disabled=true;
        saveBtn.style.backgroundColor="#3e8e41";
        saveBtn.style.cursor="not-allowed";
        showData(resData);
    } else {
        console.log("Data Not Exist..");
    }
}
document.querySelector("#rollNo").addEventListener("change", () => {
    getStudentData(connToken, dbName, tableName, dbUrl, getUrlEndpoint);
})
document.querySelector("#save").addEventListener("click", () => {
    saveStudentData(connToken, dbUrl, dbName, tableName, postUrlEndpoint);
})
function saveStudentData(connToken, dbUrl, dbName, tableName, postUrlEndpoint) {
    let form = document.querySelector("#student-form");
    let studentData = {
        "RollNo": form.rollNo.value,
        "FullName": form.name.value,
        "Class": form.class.value,
        "DOB": form.dob.value,
        "Address": form.address.value,
        "EnrollmentDate": form.enDate.value
    }
    let formData = validateForm(studentData);
    if (formData != undefined) {
        let data = JSON.stringify(formData);
        let request = createPUTRequest(connToken, data, dbName, tableName);
        jQuery.ajaxSetup({ async: false });
        let response = executeCommandAtGivenBaseUrl(request, dbUrl, postUrlEndpoint);
        jQuery.ajaxSetup({ async: true });
        if (response.status == 200) {
            alert("Student enrolled successfully !");
            resetForm();
        } else {
            alert("Student enrollment unsuccessful !")
        }
    }
}
document.querySelector("#change").addEventListener("click", () => {
    updateStudentData(connToken, dbName, tableName, dbUrl, postUrlEndpoint);
})

function updateStudentData(connToken, dbName, tableName, dbUrl, postUrlEndpoint) {
    let form = document.querySelector("#student-form");
    let rollNo = form.rollNo.value;
    let studentData = {
        "FullName": form.name.value,
        "Class": form.class.value,
        "DOB": form.dob.value,
        "Address": form.address.value,
        "EnrollmentDate": form.enDate.value
    }
    let formData = validateForm(studentData);
    if (formData != undefined) {
        let data = JSON.stringify(formData);
        let request = createUPDATERecordRequest(connToken, data, dbName, tableName, rollNo);
        jQuery.ajaxSetup({ async: false });
        let response = executeCommandAtGivenBaseUrl(request, dbUrl, postUrlEndpoint);
        jQuery.ajaxSetup({ async: true });
        if (response.status == 200) {
            alert("Student data updated successfully !");
            resetForm();
        } else {
            alert("Data does not updated..");
        }
    }
}