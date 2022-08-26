const mainAddress = `http://hoowoom.com/`;

function mainKakaoShare() {
  Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: "이상한 고래 성향 테스트",
      description: "나와 어울리는 성향의 고래는 어떤 녀석일까 ?",
      imageUrl: "http://hoowoom.com/asset/img/mainwhale.png",
      link: {
        webUrl: mainAddress,
        mobileWebUrl: mainAddress,
      },
    },

    buttons: [
      {
        title: "나도 테스트 해보기!",
        link: {
          webUrl: mainAddress,
          mobileWebUrl: mainAddress,
        },
      },
    ],
  });
}
function resultKakaoShare() {
  const nowPage = Number(resultImg.alt) + 1;
  const address = `http://hoowoom.com/page/page_${nowPage}.html`;

  Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: "이상한 고래 성향 테스트",
      description: "나와 어울리는 고래는 어떤 녀석일까 ?",
      imageUrl: "http://hoowoom.com/asset/img/mainwhale.png",
      link: {
        webUrl: address,
      },
    },
    buttons: [
      {
        title: "친구결과",
        link: {
          webUrl: address,
          mobileWebUrl: address,
        },
      },
      {
        title: "나도 해보기!",
        link: {
          webUrl: mainAddress,
          mobileWebUrl: mainAddress,
        },
      },
    ],
  });
}

// 링크복사하기

// const linkShares = document.querySelectorAll(".linkShare");
// linkShares.forEach((linkShare) => {
//   linkShare.addEventListener("click", () => {
//     window.navigator.clipboard.writeText("http://hoowoom.com/").then(() => {
//       alert("주소가 복사되었어요!");
//     });
//   });
// });
