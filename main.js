// スライダー
const mySwiper = new Swiper('.case__swiper', {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 30,
    slidesPerGroup: 2,
    centeredSlides: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// アコーディオン
$('.qa__content.active .qa__answer').show();
$('.qa__question').on('click', function () {
    const $content = $(this).parent('.qa__content');
    // 開閉状態の確認
    if ($content.hasClass('active')) {
        $content.removeClass('active');
        $content.find('.qa__answer').stop(true,true).slideUp(300);
    } else {
        $content.addClass('active');
        $content.find('.qa__answer').stop(true,true).slideDown(300);
    }
});

// // 全て入力が完了したら、ボタンを活性化しフォームを送信できるようにする
// $(document).ready(function () {
//     // ボタンを取得
//     const $btn01 = $('#form01 .c-form__btn');
//     $('#form01 input[required]').on('change', function () {
//         // 入力データがあるかを確認
//         if ($('#form01 input[required]').val() !== '') {
//             $btn01.prop('disabled', false);
//         } else {
//             $btn01.prop('disabled', true);
//         }
//     });
//     // ボタンを取得
//     const $btn02 = $('#form02 .c-form__btn');
//     $('#form02 input[required]').on('change', function () {
//         // 入力データがあるかを確認
//         if ($('#form02 input[required]').val() !== '') {
//             $btn01.prop('disabled', false);
//         } else {
//             $btn01.prop('disabled', true);
//         }
//     });
// });
$(document).ready(function () {

    function checkForm(formId) {
        const $form = $(formId);
        const $btn = $form.find('.c-form__btn');
        let isFilled = true;
        $form.find('input[required]').each(function () {
            if ($(this).val() === '') {
                isFilled = false;
            }
        });
        $btn.prop('disabled', !isFilled);
    }
    // form01
    $('#form01 input[required]').on('input', function () {
        checkForm('#form01');
    });
    // form02
    $('#form02 input[required]').on('input', function () {
        checkForm('#form02');
    });
});
// Googleフォームにてフォームを送信する
$(document).ready(function () {

    $('#form01').submit(function (event) {
        var formData = $('#form01').serialize();
    $.ajax({
        url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSf5LS3WMkbFbKcY4YAZx-ioSGKXAFQwKZSkPZyC0Lffpf_46A/formResponse",
        data: formData,
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: function () {
                $("#form01 .c-form__success-message").slideDown();
                $("#form01 .c-form__btn").fadeOut();
                window.location.href = "thanks.html";
            },
            200: function () {
                $("#form01 .c-form__err-message").slideDown();
            }
        }
    });
    event.preventDefault();
    });
    $('#form02').submit(function (event) {
        var formData = $('#form02').serialize();
    $.ajax({
        url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSf5LS3WMkbFbKcY4YAZx-ioSGKXAFQwKZSkPZyC0Lffpf_46A/formResponse",
        data: formData,
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: function () {
                $("#form02 .c-form__success-message").slideDown();
                $("#form02 .c-form__btn").fadeOut();
                window.location.href = "thanks.html";
            },
            200: function () {
                $("#form02 .c-form__err-message").slideDown();
            }
        }
    });
    event.preventDefault();
    });

});
