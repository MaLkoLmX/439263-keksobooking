'use strict';
window.showCard = function (ad) {
  window.fragment.appendChild(window.renderCard(window.ads[ad]));
  return window.fragment;
};
