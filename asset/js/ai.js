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
  console.log(infoList);

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
  const pointBars = document.querySelectorAll(".pointDiv");
  pointBars.forEach((bar, index) => {
    console.log(maxTopPrediction[index]);
    bar.style.width = `${Math.round(
      maxTopPrediction[index].probability * 100
    )}%`;
  });

  //   가장 큰 수

  let maxNub = prediction.reduce((pre, next) => {
    return pre.probability < next.probability ? next : pre;
  });

  const resultImg = document.querySelector("#resultImg");
  const imgSrc = `./asset/img/image-${maxNub.key}.png`;
  resultImg.src = imgSrc;

  // title,text
  // title
  const resultTitle = document.querySelector(".result_title_p");
  const resutlText = document.querySelector(".result_title_p3");
  resultTitle.innerHTML = `${maxTopPrediction[0].title}`;
  resutlText.innerHTML = `${maxTopPrediction[0].text}`;
}
