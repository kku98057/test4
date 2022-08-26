const kakaoCon = document.querySelector(".kakao_con");

if (window.matchMedia("(min-width: 980px)").matches) {
  kakaoCon.innerHTML = ` <ins class="kakao_ad_area" style="display:none;" data-ad-unit="DAN-M06o3eMV1fIJv7en" data-ad-width="728"
  data-ad-height="90"></ins>`;
} else {
  kakaoCon.innerHTML = `<ins class="kakao_ad_area" style="display:none;"  data-ad-unit="DAN-vL0m0ut44HWOI64x"  data-ad-width= "320"  data-ad-height="100"></ins>`;
}
