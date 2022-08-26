const menuBtn = document.querySelector(".menuBtn");
menuBtn.addEventListener("click", menuBtnHandler);

function menuBtnHandler() {
  const bars = document.querySelectorAll(".menuBtn_bar");
  const menu = document.querySelector(".mainMenu");
  bars.forEach((bar) => {
    bar.classList.toggle("active");
  });
  menu.classList.toggle("visible");
}
