"use strict";

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const table = document.querySelector("#tbody");
const btnHealthyPet = document.querySelector("#healthy-btn");
const btnBMI = document.querySelector("#calculate-bmi");

//list chứa thông tin Pet và id pet
const petArr = [];
const checkPetId = [];

//Sự kiện click submit
submitBtn.addEventListener("click", function () {
  //lấy dữ liệu người dùng
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    lengthI: parseInt(lengthInput.value),
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    time: new Date(),
  };

  //Dự liệu hợp lệ
  if (validateData(data)) {
    petArr.push(data);
    checkPetId.push(data.id);
    displayPetInfo(petArr);
    clearInput();

    /////// Công thức tính BMI và bổ sung vào data pet
    if (data.type === "Dog") {
      data.bmi = 1;
    } else {
      data.bmi = 2;
    }
  }
});

//Chức năng điều kiện cho thông tin nhập
function validateData(data) {
  let check = false;
  if (!data.id || !data.id.trim()) {
    alert("Pet ID không được để trống");
  } else if (checkPetId.includes(data.id)) {
    alert("ID must be unique!");
  } else if (!data.name || !data.name.trim()) {
    alert("Pet Name không được để trống");
  } else if (!data.age) {
    alert("Age không được để trống");
  } else if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
  } else if (data.type === "Select Type") {
    alert("Hãy lựa chọn Type");
  } else if (!data.weight) {
    alert("Weight không được để trống");
  } else if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
  } else if (!data.lengthI) {
    alert("Length không được để trống");
  } else if (data.lengthI < 1 || data.lengthI > 100) {
    alert("Age must be between 1 and 15!");
  } else if (data.breed === "Select Breed") {
    alert("Hãy lựa chọn Breed");
  } else {
    check = true;
  }
  return check;
}

//Thêm danh sách thú cưng
const displayPetInfo = function (x) {
  table.innerHTML = "";

  for (let i = 0; i < x.length; i++) {
    const row = document.createElement("tr");
    row.classList.add("rowtb");
    row.innerHTML += `<th>${x[i].id}</th>`;
    row.innerHTML += `<td>${x[i].name}</td>`;
    row.innerHTML += `<td>${x[i].age}</td>`;
    row.innerHTML += `<td>${x[i].type}</td>`;
    row.innerHTML += `<td>${x[i].weight}</td>`;
    row.innerHTML += `<td>${x[i].lengthI}</td>`;
    row.innerHTML += `<td>${x[i].breed}</td>`;
    row.innerHTML += `<td><i class="bi bi-square-fill" style="color: ${x[i].color}"></i></td>`;
    row.innerHTML += x[i].vaccinated
      ? '<td><i class="bi bi-check-circle-fill"></i></td>'
      : '<td><i class="bi bi-x-circle-fill"></i></td>';
    row.innerHTML += x[i].dewormed
      ? '<td><i class="bi bi-check-circle-fill"></i></td>'
      : '<td><i class="bi bi-x-circle-fill"></i></td>';
    row.innerHTML += x[i].sterilized
      ? '<td><i class="bi bi-check-circle-fill"></i></td>'
      : '<td><i class="bi bi-x-circle-fill"></i></td>';
    row.innerHTML += "<td class = 'bmi-disp'>?</td>";
    row.innerHTML += `<td>${x[i].time.getDate()}/${x[i].time.getMonth()}/${x[
      i
    ].time.getFullYear()}</td>`;
    row.innerHTML += `<td><button class="btn btn-danger">Delete</button></td>`;
    table.append(row);

    /* reset lại text nội dung hiển thị trên nút "Show Healthy Pet" và nút "Calculate BMI" -> khi ấn submit dữ liệu mới hoặc xóa 1 pet*/
    btnHealthyPet.textContent = "Show Healthy Pet";
    btnBMI.textContent = "Calculate BMI";

    //Tạo event listener cho button delete cho từng thú cưng
    const deleteBtn = row.querySelector(".btn-danger");
    deleteBtn.addEventListener("click", function () {
      const xacnhan = confirm("Xác Nhận");
      if (xacnhan) {
        row.remove();
        x.splice(i, 1);
        checkPetId.splice(i, 1);
        displayPetInfo(x);
      }
    });
  }
};

//Xóa nội dung hiển thị ở trường nhập sau khi submit
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

//Tạo event cho nút Show Healthy Pet
//Đã thêm 1 selector hidden bên style.css
btnHealthyPet.addEventListener("click", function () {
  const rowAll = document.querySelectorAll(".rowtb");
  if (btnHealthyPet.textContent.trim() === "Show Healthy Pet") {
    btnHealthyPet.textContent = "Show All Pet";
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        continue;
      } else {
        rowAll[i].classList.add("hidden");
      }
    }
  } else {
    btnHealthyPet.textContent = "Show Healthy Pet";
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        continue;
      } else {
        rowAll[i].classList.remove("hidden");
      }
    }
  }
});

//tạo sự kiện cho nút Calculate BMI
btnBMI.addEventListener("click", function () {
  const bmiDisp = document.querySelectorAll(".bmi-disp");
  if (btnBMI.textContent.trim() === "Calculate BMI") {
    btnBMI.textContent = "Hide Calculate BMI";
    for (let i = 0; i < bmiDisp.length; i++) {
      bmiDisp[i].textContent = petArr[i].bmi;
    }
  } else {
    btnBMI.textContent = "Calculate BMI";
    for (let i = 0; i < bmiDisp.length; i++) {
      bmiDisp[i].textContent = "?";
    }
  }
});
