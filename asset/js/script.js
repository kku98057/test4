Splitting();
const windowHeight = document
  .querySelector(".monitor_img")
  .getBoundingClientRect().height;
const tl = gsap.timeline();

tl.to(".loading", {
  delay: 0.3,
  duration: 1,
  xPercent: 100,
})
  .from(
    "#logo span .char",
    {
      rotateY: 360,
      duration: 1,
      stagger: {
        amount: 0.5,
      },
    },
    "-=1"
  )
  .from("#logo", {
    scale: 1.2,
    duration: 0.5,
  })
  .from(
    "#logo",
    {
      top: windowHeight / 5,
      duration: 0.5,
    },
    ">-=0.5"
  )
  .from(".monitor_img_title_h", {
    opacity: 0,
  })
  .from(
    ".monitor_img_title_p span .char",
    {
      yPercent: 100,
      stagger: {
        amount: 0.5,
      },
    },
    "-=0.35"
  )
  .from(
    ".gender_title_h",
    {
      opacity: 0,
    },
    ">-=0.35"
  )
  .from(
    ".gender_btnswrap",
    {
      opacity: 0,
    },
    ">-=0.35"
  )
  .from(
    ".monitor_img_content",
    {
      scale: 0,
    },
    ">-=0.35"
  )
  .from(".monitor_share", {
    ease: "power4.in",
    opacity: 0,
    duration: 1,
  });
