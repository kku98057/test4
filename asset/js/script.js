const fileInput = document.querySelector("#upImg");
const faceImg = document.querySelector(".uploadImg img");
const upImgText = document.querySelector(".upImgText");
const startBtn = document.querySelector(".upBtn");
const uploadPage = document.querySelector(".monitor_img");
const resultPage = document.querySelector(".result");

const reader = new FileReader();

function handleEvent(event) {
  if (event.type === "load") {
    faceImg.src = reader.result;
  }
}
function addListeners(reader) {
  reader.addEventListener("loadstart", handleEvent);
  reader.addEventListener("load", handleEvent);
  reader.addEventListener("loadend", handleEvent);
  reader.addEventListener("progress", handleEvent);
  reader.addEventListener("error", handleEvent);
  reader.addEventListener("abort", handleEvent);
}

function handleSelected(e) {
  const selectedFile = fileInput.files[0];
  if (selectedFile) {
    addListeners(reader);
    reader.readAsDataURL(selectedFile);
    upImgText.style.display = "block";
    upImgText.innerHTML = "이미지를 인식 중 입니다. 잠시만 기다려주세요.";
    init().then(() => {
      startBtn.style.display = "flex";
      setTimeout(() => {
        startBtn.style.transition = "opacity 0.3s";
        startBtn.style.opacity = 1;
      }, 500);

      upImgText.innerHTML = "스타트 버튼을 클릭해주세요.";
    });
  }
}

fileInput.addEventListener("change", handleSelected);

startBtn.addEventListener("click", startBtnHandler);

function startBtnHandler() {
  uploadPage.style.opacity = 0;
  setTimeout(() => {
    uploadPage.style.display = "none";
  }, 500);

  resultPage.style.display = "block";
  setTimeout(() => {
    resultPage.style.opacity = 1;
  }, 500);
}
// genderBtn
const genderBtn = document.querySelector(".gender_btn");
const genderToggle = document.querySelector(".gender_btn_toggle");
let gender = "man";
genderBtn.addEventListener("click", genderBtnHandler);

function genderBtnHandler() {
  const gender = document.querySelectorAll(".gender_img");
  genderToggle.classList.toggle("active");
  gender.forEach((gender) => {
    gender.classList.toggle("active");
  });
}
