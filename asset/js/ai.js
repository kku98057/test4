// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/tFfA8oqgh/";

let model, webcam, labelContainer, maxPredictions, prediction;

// Load the image model and setup the webcam
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // or files from your local hard drive
  // Note: the pose library adds "tmImage" object to your window (window.tmImage)
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // append elements to the DOM
}

// run the webcam image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  const image = document.querySelector("#faceImg");
  const prediction = await model.predict(image, false);
  labelContainer = document.getElementById("label-container");
  let maxTopPrediction = [...prediction].sort((a, b) => {
    return b.probability - a.probability;
  });

  //   key,text 추가

  prediction.forEach((predic, index) => {
    predic.title = infoList[index].title;
    predic.text = infoList[index].text;
    predic.key = index;
  });

  for (let i = 0; i < 4; i++) {
    const labelClass = document.createElement("div");

    labelContainer.append(labelClass);
    const classPrediction = `
    <div class="pointText">${maxTopPrediction[i].className}</div>
    <div class="pointDiv">
    
    </div>
    <div class="pointNub">${Math.round(
      maxTopPrediction[i].probability * 100
    )}%</div>`;

    labelClass.className = "label_class";

    const labelClasses = document.querySelectorAll(".label_class");
    labelClasses[i].innerHTML = classPrediction;
  }

  // pointer Bar
  setTimeout(() => {
    const pointBars = document.querySelectorAll(".pointDiv");
    const tl = gsap.timeline();
    pointBars.forEach((bar, index) => {
      tl.to(bar, {
        width: `${Math.round(maxTopPrediction[index].probability * 100)}%`,
        stagger: 0.3,
      });
    });
  }, 1000);

  //   가장 큰 수

  let maxNub = prediction.reduce((pre, next) => {
    return pre.probability < next.probability ? next : pre;
  });

  const resultImg = document.querySelector("#resultImg");
  const imgSrc = `./asset/img/image-${maxNub.key}.png`;
  resultImg.src = imgSrc;
  resultImg.alt = maxNub.key;

  // title,text
  // title
  const resultTitle = document.querySelector(".result_title_p");
  const resutlText = document.querySelector(".result_title_p3");
  resultTitle.innerHTML = `${maxTopPrediction[0].title}`;
  resutlText.innerHTML = `${maxTopPrediction[0].text}`;
}

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
    upImgText.innerHTML = "이미지를 인식 중 입니다.<br> 잠시만 기다려주세요.";
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
  upImgText.innerHTML = `데이터를 받아오고 있습니다.<br> 잠시만 기다려주세요`;
  setTimeout(() => {
    predict();
    uploadPage.style.transition = "all 0.3s";
    uploadPage.style.opacity = 0;
    setTimeout(() => {
      uploadPage.style.display = "none";
    }, 500);

    resultPage.style.display = "block";
    setTimeout(() => {
      resultPage.style.transition = "all 0.3s";
      resultPage.style.opacity = 1;
    }, 500);
  }, 300);
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

//
