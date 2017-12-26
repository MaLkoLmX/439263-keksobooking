'use strict';
(function () {
  var coordX = 46;
  var coordY = 62;

  function getX(x) {
    return (x - coordX / 2) + 'px';
  }
  function getY(y) {
    return (y - coordY / 2) + 'px';
  }

  function renderMapMarker(pins, number) {
    var pinTemplate = document.querySelector('template').content.querySelector('.map__pin'); // шаблон маркера
    var markerElement = pinTemplate.cloneNode(true);

    markerElement.style.left = getX(pins.location.x);
    markerElement.style.top = getY(pins.location.y);
    markerElement.querySelector('img').src = pins.author.avatar;
    markerElement.classList.add('hidden');
    markerElement.dataset.number = number;

    return markerElement;
  }

  function showMarkers(pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderMapMarker(pins[i], i));
    }
    window.markers.appendChild(fragment);
  }

  function savePins(pins) {
    window.totalPins = pins;
    showMarkers(pins);
  }

  window.backend.load(savePins, window.util.errorHandler);
})();
