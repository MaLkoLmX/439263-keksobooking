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

    // markerElement.style.left = getX(window.util.getRandomNumber(300, 900));
    // markerElement.style.top = getY(window.util.getRandomNumber(100, 500));
    // markerElement.querySelector('img').src = 'img/avatars/user0' + userIndex + '.png';
    markerElement.style.left = getX(ad.location.x);
    markerElement.style.top = getY(ad.location.y);
    markerElement.querySelector('img').src = ad.author.avatar;
    markerElement.setAttribute('data-ad-number', userIndex);
    markerElement.setAttribute('tabindex', 0);

    return markerElement;
  }

  window.showMarkers = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 5; i++) {
      fragment.appendChild(renderMapMarker(pins[i]));
    }
    window.markers.appendChild(fragment);
  };

  // window.backend.load(window.showMarkers, window.errorHandler);
})();
