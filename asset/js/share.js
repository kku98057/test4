const mainAddress = `https://kku98057.github.io/test4/`;

function mainKakaoShare() {
  Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: "이상한 고래 성향 테스트",
      description: "나와 어울리는 고래는 무엇일까 ?",
      imageUrl: "https://kku98057.github.io/test4/asset/img/mainwhale.png",
      link: {
        webUrl: "https://kku98057.github.io/test4/",
      },
    },
    // social: {
    //   likeCount: 10,
    //   commentCount: 20,
    //   sharedCount: 30,
    // },
    buttons: [
      {
        title: "나도 테스트 해보기!",
        link: {
          webUrl: "https://kku98057.github.io/test4/",
        },
      },
    ],
  });
}
function resultKakaoShare() {
  const nowPage = resultImg.alt;
  const address = `https://kku98057.github.io/test4/page_${nowPage}.html`;

  Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: "이상한 고래 성향 테스트",
      description: "나와 어울리는 고래는 무엇일까 ?",
      imageUrl: "https://kku98057.github.io/test4/asset/img/mainwhale.png",
      link: {
        webUrl: address,
      },
    },
    // social: {
    //   likeCount: 10,
    //   commentCount: 20,
    //   sharedCount: 30,
    // },
    buttons: [
      {
        title: "친구꺼 구경하기!",
        link: {
          webUrl: address,
        },
      },
      {
        title: "나도 테스트 해보기!",
        link: {
          webUrl: mainAddress,
        },
      },
    ],
  });
}
