const mainAddress = `http://chosunhangout.dothome.co.kr/`;

function mainKakaoShare() {
  Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: "이상한 고래 성향 테스트",
      description: "나와 어울리는 성향의 고래는 어떤 녀석일까 ?",
      imageUrl: "asset/img/mainwhale.png",
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
  const nowPage = resultImg.alt - 1;
  const address = `http://chosunhangout.dothome.co.kr/page/page_${nowPage}.html`;

  Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: "이상한 고래 성향 테스트",
      description: "나와 어울리는 고래는 어떤 녀석 일까 ?",
      imageUrl: "asset/img/mainwhale.png",
      link: {
        webUrl: address,
      },
    },
    buttons: [
      {
        title: "친구꺼 구경하기!",
        link: {
          webUrl: address,
          mobileWebUrl: address,
        },
      },
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
