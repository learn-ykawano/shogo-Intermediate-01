// スクロールアニメーション
AOS.init({
    duration:1000,
    easing:"ease-out-cubic",
    once:true,
    offset:0,
    delay:0
});

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
    const $button = $(this);
    const $content = $button.closest('.qa__content');
    const $answer = $content.find('.qa__answer');
    const expanded = $button.attr('aria-expanded') === 'true';
    if (expanded) {
        $button.attr('aria-expanded', 'false');
        $content.removeClass('active');
        $answer.stop(true, true).slideUp(300);
    } else {
        $button.attr('aria-expanded', 'true');
        $content.addClass('active');
        $answer.stop(true, true).slideDown(300);
    }
});
// 全て入力が完了したら、ボタンを活性化しフォームを送信できるようにする
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
        $btn
            .prop('disabled', !isFilled)
            .attr('aria-disabled', !isFilled);
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
    function submitGoogleForm(formId) {
        $(formId).on('submit', function (event) {
            event.preventDefault();
            const $form = $(this);
            const formData = $form.serialize();
            $.ajax({
                url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSf5LS3WMkbFbKcY4YAZx-ioSGKXAFQwKZSkPZyC0Lffpf_46A/formResponse",
                data: formData,
                type: "POST",
                dataType: "xml",
                statusCode: {
                    0: function () {
                        $form.find('.c-form__success-message').slideDown();
                        $form.find('.c-form__btn').fadeOut();

                        window.location.href = "thanks.html";
                    },
                    200: function () {
                        $form.find('.c-form__err-message').slideDown();
                    }
                }
            });
        });
    }
    // フォームごとに実行
    submitGoogleForm('#form01');
    submitGoogleForm('#form02');
});

// ハンバーガーメニュー
$(function () {
    const $burger = $(".header__burger");
    const $drawer = $(".header__drawer");
    $burger.on("click", function () {
        const expanded = $(this).attr("aria-expanded") === "true";
        const isOpen = !expanded;
        $(this)
            .toggleClass("is-open",isOpen)
            .attr("aria-expanded", isOpen)
            .attr("aria-label",isOpen ? "メニューを閉じる" : "メニューを開く");
        $drawer
            .stop()
            .slideToggle(300)
            .attr("aria-hidden", !isOpen);
    });
    // メニューをクリックした時にドロワーを閉じる
    $(".header__drawer a").on("click", function () {
        $drawer
            .slideUp(300)
            .attr("aria-hidden", "true");
        $burger
            .removeClass("is-open")
            .attr("aria-expanded", "false")
            .attr("aria-label", "メニューを開く");
    });
});
