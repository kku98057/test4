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

  labelContainer = document.getElementById("label-container");

  for (let i = 0; i < 4; i++) {
    // and class labels
    labelContainer.appendChild(document.createElement("div"));
  }
}

// run the webcam image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  const image = document.querySelector("#faceImg");
  const prediction = await model.predict(image, false);

  let maxTopPrediction = [...prediction].sort((a, b) => {
    return b.probability - a.probability;
  });
  console.log(maxTopPrediction);

  for (let i = 0; i < 4; i++) {
    const labelClass = document.createElement("div");

    labelContainer.append(labelClass);
    const classPrediction = `
    <div class="pointText">${maxTopPrediction[i].className}</div>
    <div class="pointDiv">
        <div class="pointBar pointBar_1">
            <div class="pointBar pointBar_2"></div>
        </div>
    </div>
    <div class="pointText">${Math.round(
      maxTopPrediction[i].probability * 100
    )}%</div>`;
    console.log(classPrediction);

    // 여기부터 다시하기.
    const pointBars = document.querySelectorAll(".pointBar_2");

    pointBars.forEach((bars, index) => {
      bars.style.width = `${
        Math.round(maxTopPrediction[index].probability) * 100
      }%`;
    });
    labelClass.className = "label_class";

    const labelClasses = document.querySelectorAll(".label_class");
    labelClasses[i].innerHTML = classPrediction;
  }
  //   key,text 추가

  const text = ["asdf", "fghj", "3asd"];
  prediction.forEach((predic, index) => {
    predic.text = text[index];
    predic.key = index;
  });

  //   가장 큰 수

  let maxNub = prediction.reduce((pre, next) => {
    return pre.probability < next.probability ? next : pre;
  });

  const resultImg = document.querySelector("#resultImg");
  const imgSrc = `./asset/img/image-${maxNub.key}.png`;
  resultImg.src = imgSrc;
}
