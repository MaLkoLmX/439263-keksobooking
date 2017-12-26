'use strict';
(function () {
  var type = ['gif', 'jpg', 'jpeg', 'png'];

  var images = document.querySelector('.form__photo-container input[type=file]');
  var avatar = document.querySelector('.notice__photo input[type=file]');
  var previewImages = document.querySelector('.form__photo-container .drop-zone');
  var previewAvatar = document.querySelector('.notice__preview img');

  function upload(input, preview, getPreview) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    if (getMatches(fileName)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        getPreview(preview, reader);
      });

      reader.readAsDataURL(file);
    }
  }

  function avatarPreview(preview, reader) {
    preview.src = reader.result;
    preview.style = 'width: 60px; height: 96px';
    preview.className = 'photo-image';
  }

  function imagePreview(preview, reader) {
    var node = document.createElement('img');

    node.src = reader.result;
    node.style = 'width: 140px; height: 70px; margin-top: -10px';
    node.className = 'photo-image';

    preview.insertAdjacentElement('afterbegin', node);
  }

  function getMatches(fileName) {
    type.some(function (it) {
      fileName.endsWith(it);
    });

    return fileName;
  }

  avatar.addEventListener('change', function () {
    upload(avatar, previewAvatar, avatarPreview);
  });

  images.addEventListener('change', function () {
    upload(images, previewImages, imagePreview);
  });
})();
