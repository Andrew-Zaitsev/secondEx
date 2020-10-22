const likeButtonInputElems = document.querySelectorAll('.like-button__input');

likeButtonInputElems.forEach(

  function (elem) {
    elem.addEventListener(

      'click',
      function () {
        let likeButtonElem = this.parentElement.parentElement;
        likeButtonElem.classList.toggle('like-button_border-color_gradient');
        likeButtonElem.classList.toggle('like-button_border-color_grey');
        likeButtonElem.classList.toggle('like-button_content-color_grey');
        likeButtonElem.classList.toggle('like-button_content-color_violet');

        let imgElem = this.nextElementSibling.firstElementChild;
        imgElem.classList.toggle('like-button__img_color_grey');
        imgElem.classList.toggle('like-button__img_color_violet');

        let imgElemText = imgElem.textContent;
        this.nextElementSibling.firstElementChild.textContent = ((imgElemText === 'favorite') ? 'favorite_border ' : 'favorite');

        let numberElem = this.nextElementSibling.nextElementSibling;
        (this.checked) ? (numberElem.textContent = +numberElem.textContent + 1) : (numberElem.textContent = +numberElem.textContent - 1);
      }

    )
  }

);