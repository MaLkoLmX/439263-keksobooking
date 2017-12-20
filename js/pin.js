'use strict';
(function () {
  function renderMapMarker(pins, number) {
    var pinTemplate = document.querySelector('template').content.querySelector('.map__pin'); // шаблон маркера
    var markerElement = pinTemplate.cloneNode(true);
    var coordX = 46;
    var coordY = 62;
    function getX(x) {
      return (x - coordX / 2) + 'px';
    }
    function getY(y) {
      return (y - coordY / 2) + 'px';
    }
    markerElement.style.left = getX(pins.location.x);
    markerElement.style.top = getY(pins.location.y);
    markerElement.querySelector('img').src = pins.author.avatar;
    markerElement.classList.add('hidden');
    markerElement.dataset.number = number;

    return markerElement;
  }

  window.showMarkers = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderMapMarker(pins[i], i));
    }
    window.markers.appendChild(fragment);

    window.ads = pins;
  };

  window.backend.load(window.showMarkers, window.errorHandler);
})();
