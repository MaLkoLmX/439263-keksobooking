'use strict';
(function () {
  function renderMapMarker(ad) {
    var pinTemplate = document.querySelector('template').content.querySelector('.map__pin'); // шаблон маркера
    var markerElement = pinTemplate.cloneNode(true);
    var userIndex = ad + 1;

    var coordX = 46;
    var coordY = 62;

    function getX(x) {
      return (x - coordX / 2) + 'px';
    }
    function getY(y) {
      return (y - coordY / 2) + 'px';
    }

    markerElement.style.left = getX(window.util.getRandomNumber(300, 900));
    markerElement.style.top = getY(window.util.getRandomNumber(100, 500));
    markerElement.querySelector('img').src = 'img/avatars/user0' + userIndex + '.png';
    markerElement.setAttribute('data-ad-number', userIndex);
    markerElement.setAttribute('tabindex', 0);

    return markerElement;
  }

  function showMarkers(ad) {
    for (var i = 0; i < ad; i++) {
      window.fragment.appendChild(renderMapMarker(i));
    }
    return window.fragment;
  }

  window.markers.appendChild(showMarkers(8));
})();
