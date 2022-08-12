// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/tFfA8oqgh/";

let model, webcam, labelContainer, maxPredictions;

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
  console.log(maxPredictions);

  // append elements to the DOM

  labelContainer = document.getElementById("label-container");

  for (let i = 0; i < maxPredictions; i++) {
    // and class labels
    labelContainer.appendChild(document.createElement("div"));
  }
}

// run the webcam image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  const image = document.querySelector("#faceImg");

  const prediction = await model.predict(image, false);
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction = `
    <div class="pointText">${prediction[i].className}</div>
    <div class="pointDiv">
        <div class="pointBar pointBar_1">
            <div class="pointBar pointBar_2"></div>
        </div>
    </div>
    <div class="pointText">${Math.round(
      prediction[i].probability * 100
    )}%</div>`;

    labelContainer.childNodes[i].innerHTML = classPrediction;
    labelContainer.childNodes[i].className = "label_class";
    const pointBars = document.querySelectorAll(".pointBar_2");

    pointBars.forEach((pointBar, i) => {
      pointBar.style.width = `${Math.round(prediction[i].probability * 100)}%`;
    });
  }
  //   key,text 추가

  const text = ["asdf", "fghj", "3asd"];
  prediction.forEach((predic, index) => {
    predic.text = text[index];
    predic.key = index;
  });
  console.log(prediction);
  //   가장 큰 수
  let maxNub = prediction.reduce((pre, next) => {
    return pre.probability < next.probability ? next : pre;
  });
  console.log(maxNub);
  const resultImg = document.querySelector("#resultImg");
  const imgSrc = `./asset/img/image-${maxNub.key}.png`;
  resultImg.src = imgSrc;
}
