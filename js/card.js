'use strict';
window.renderCard = function (ad) {
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card'); // шаблон карты
  var cardElement = cardTemplate.cloneNode(true);
  var cardElementP = cardElement.querySelectorAll('p');
  var list = cardElement.querySelector('.popup__features');

  function getFeatures(feature) {
    return '<li class="feature feature--' + feature + '"></li>';
  }

  cardElement.querySelector('h3').textContent = ad.offer.title;
  cardElement.querySelector('small').textContent = ad.offer.address;
  cardElement.querySelector('.popup__price').textContent = ad.offer.price;

  // switch (type[window.util.getRandom(type)]) {
  //   case 'flat':
  //     cardElement.querySelector('h4').textContent = 'Квартира';
  //     break;
  //   case 'bungalo':
  //     cardElement.querySelector('h4').textContent = 'Бунгало';
  //     break;
  //   case 'house':
  //     cardElement.querySelector('h4').textContent = 'Дом';
  // }

  cardElement.querySelector('h4').textContent = ad.offer.type;

  cardElementP[2].textContent = ad.offer.rooms + ' для ' + ad.offer.guests + ' гостей.';
  cardElementP[3].textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  list.innerHTML = '';
  list.insertAdjacentHTML('afterBegin', ad.offer.features.map(getFeatures).join(''));
  cardElement.appendChild(list);
  cardElementP[4].textContent = [];
  cardElement.querySelector('img').src = ad.author.avatar;
  return cardElement;
};
