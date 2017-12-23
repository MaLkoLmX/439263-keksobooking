'use strict';
(function () {
  var getType = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец'
  };

  window.renderCard = function (ad) {
    var cardTemplate = document.querySelector('template').content.querySelector('.map__card'); // шаблон карты
    var cardElement = cardTemplate.cloneNode(true);
    var cardElementP = cardElement.querySelectorAll('p');
    var listFeatures = cardElement.querySelector('.popup__features');
    var listPictures = cardElement.querySelector('.popup__pictures');

    function getFeatures(feature) {
      return '<li class="feature feature--' + feature + '"></li>';
    }

    var getPictures = function (picture) {
      return '<li><img src="' + picture + '"; width=50; height=50></li>';
    };

    cardElement.querySelector('h3').textContent = ad.offer.title;
    cardElement.querySelector('small').textContent = ad.offer.address;
    cardElement.querySelector('.popup__price').textContent = ad.offer.price + String.fromCharCode(8381);
    cardElement.querySelector('h4').textContent = getType[ad.offer.type];
    cardElementP[2].textContent = ad.offer.rooms + ' для ' + ad.offer.guests + ' гостей.';
    cardElementP[3].textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    listFeatures.innerHTML = '';
    listFeatures.insertAdjacentHTML('afterBegin', ad.offer.features.map(getFeatures).join(''));
    cardElement.appendChild(listFeatures);
    listPictures.innerHTML = '';
    listPictures.insertAdjacentHTML('afterBegin', ad.offer.photos.map(getPictures).join(''));
    cardElement.appendChild(listPictures);
    cardElementP[4].textContent = ad.offer.description;
    cardElement.querySelector('img').src = ad.author.avatar;
    return cardElement;
  };
})();
