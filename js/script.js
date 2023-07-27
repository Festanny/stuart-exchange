$(document).ready(function() {
    maskField()
    checkSize()
})
$(window).resize(function() {
    checkSize()
})

// href
$("body").on('click', '[href*="#"]', function (e) {
	var fixed_offset = 0;
	$('html,body').stop().animate({
		scrollTop: $(this.hash).offset().top - fixed_offset
	}, 1000);
	e.preventDefault();
});

$(document).on('click', '.checkField', function (el) {
  el.preventDefault();
  checkField(el)
})
function checkField(el) {
  let field = $(el.target).parents('form').find('input, textarea, select'),
      rating = $(el.target).parents('form').find('.rating-mini')
  
  for (let i=0;i<field.length;i++) {
      if ($(field[i]).val()!=null) {
          if ($(field[i]).val()!='') {
              if ($(field[i]).attr('type')=='phone' || $(field[i]).hasClass('phone') || $(field[i]).attr('id')=='phone' || $(field[i]).attr('name')=='phone') {
                  if ($(field[i]).val().length < 17) {
                      $(field[i]).addClass('error')
                  } else {
                      $(field[i]).removeClass('error')
                  }
              } else {
                  $(field[i]).removeClass('error')
              }
              if ($(field[i]).attr('type') == 'radio') {
                  if (!$(field[i]).hasClass('secondary')) {
                      let inputName = $(field[i]).attr('name'),
                      inputCheckedAll = $(el.target).parents('form').find(`input[name='${inputName}']`),
                      inputChecked = $(el.target).parents('form').find(`input[name='${inputName}']:checked`)
                      if (inputChecked.length == 0) {
                          inputCheckedAll.addClass('error')
                      } else {
                          inputCheckedAll.removeClass('error')
                      }
                  }
              } else {
                  $(field[i]).removeClass('error')
              }
              if ($(field[i]).attr('type') == 'checkbox') {
                  if (!$(field[i]).hasClass('secondary')) {
                      let inputName = $(field[i]).attr('name'),
                      inputCheckedAll = $(el.target).parents('form').find(`input[name='${inputName}']`),
                      inputChecked = $(el.target).parents('form').find(`input[name='${inputName}']:checked`)
                      if (inputChecked.length == 0) {
                          inputCheckedAll.addClass('error')
                      } else {
                          inputCheckedAll.removeClass('error')
                      }
                  }
              } else {
                  $(field[i]).removeClass('error')
              }
          } else {
              $(field[i]).addClass('error')
          }
      } else {
          $(field[i]).addClass('error')
      }
      if ($(el.target).parents('form').find('input[name=option-term].error').length != 0) {
        $(el.target).parents('form').find('.__select__title').addClass('error')
      } else {
        $(el.target).parents('form').find('.__select__title').removeClass('error')
      }
  }
  if ($(rating).find('span.active').length == 0) {
      $(rating).addClass('error')
  } else {
      $(rating).removeClass('error')
  }
  if ($(el.target).parents('form').find('.error').length==0) {
      sendAjax(field, el)
      clearFields()
  }
}

function clearFields() {
    $('input:not([type=checkbox]):not([name=csrfmiddlewaretoken]:not([name=color_product]):not([name=upholstery_product]))').val('')
    $('textarea').val('')
    $('.__select__title').removeClass('error')
}

function sendAjax(dataForm, el) {
    let obj = {},
        type = $(el.target).attr('data-type'),
        titleText = $('.modal#infoModal .modal-header'),
        bodyText = $('.modal#infoModal .modal-body')
    console.log(dataForm);
    // alert('Запрос Ajax')
    titleText.html('')
    bodyText.html('')
    if (type == 'exchange_request') {
        $('.modal#infoModal').modal('show')
        titleText.html(`
            <div class="logo"><img src="../img/logo-modal.svg" alt="logo"></div>
        `)
        bodyText.html(`
            <div class="desc">Спасибо за вашу заявку! Мы свяжемся с вами в течение 5 минут в мессенджере “Telegram” для завершения обмена</div>
            <div class="btn-block">
                <div class="btn btnBlack btnWhite" data-bs-dismiss="modal">Назад</div>
                <div class="btn btnBlack" data-bs-dismiss="modal">Повторить обмен</div>
            </div>
        `)
    } else if (type == 'mixer_request') {
        $('.modal#infoModal').modal('show')
        titleText.html(`
            <div class="logo"><img src="../img/logo-modal.svg" alt="logo"></div>
        `)
        bodyText.html(`
            <div class="desc">Спасибо за вашу заявку! Мы свяжемся с вами в течение 5 минут в мессенджере “Telegram” для завершения обмена</div>
            <div class="btn-block">
                <div class="btn btnBlack btnWhite" data-bs-dismiss="modal">Назад</div>
                <div class="btn btnBlack" data-bs-dismiss="modal">Повторить очистку</div>
            </div>
        `)
    } else if (type == 'mailing') {
        $('.modal#infoModal').modal('show')
        titleText.html(`
            <div class="h1 _title36 modal-title" id="exampleModalLabel">Спасибо за подписку на рассылку.</div>
        `)
        bodyText.html(`
            <div class="btn-block">
                <div class="btn btnBlack" data-bs-dismiss="modal" aria-label="Закрыть">Закрыть</div>
            </div>
        `)
    }
}

function maskField() {
    $(".mask-phone").mask("+7 (999) 999-99-99");
    $('.mask-date').mask('99.99.9999');
}

function checkSize() {
    
}

$('.formSection .main .tabs span').on('click', function () {
    let id = $(this).attr('data-tab'),
        content = $(`.formSection .main .info-block .item[data-tab='${id}']`)
    $('.formSection .main .tabs span.active').removeClass('active')
    $(`.formSection .main .info-block .item.active`).removeClass('active')
    $(this).addClass('active')
    content.addClass('active')
})

$(document).on('click', '.open-modal', function (el) {
    el.preventDefault()
    infoOpenModal(el)
})

function infoOpenModal(elem) {
    let type = $(elem.target).attr('data-type-modal'),
        titleText = $('.modal#infoModal .modal-header'),
        bodyText = $('.modal#infoModal .modal-body')
    titleText.html('')
    bodyText.html('')
    if (type == 'application') {
        titleText.html(`
            <div class="h1 _title36 modal-title" id="exampleModalLabel">Заявка на звонок</div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        `)
        bodyText.html(`
            <div class="desc">Оставьте свой номер телефона ниже, и мы перезвоним Вам в ближайшее время!</div>
            <form class="application-block">
                <input type="phone" class="mask-phone" placeholder="Ваш номер телефона">
                <div class="btn-block">
                    <div class="btn btnBlack checkField" data-type="thanks_application">Отправить</div>
                </div>
            </form>
        `)
    } else if (type == 'add_review') {
        titleText.html(`
            <div class="h1 _title36 modal-title" id="exampleModalLabel">Оставить отзыв</div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        `)
        bodyText.html(`
            <form class="addreview-block">
                <input type="text" placeholder="Имя" name="first_name" class="bl">
                <input type="text" placeholder="Фамилия" name="last_name" class="bl">
                <input type="url" placeholder="Ссылка на социальную сеть" name="social-link" class="bl">
                <textarea rows="7" placeholder="Текст отзыва" name="text" class="bl"></textarea>
                <div class="btn-block bl">
                    <div class="btn btnBlack checkField" data-type="thanks_reviews">Отправить</div>
                </div>
            </form>
        `)
    }
    maskField()
    $('#infoModal').modal('show')
}