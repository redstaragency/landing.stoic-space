import $ from "jquery";
import fslightbox from "fslightbox";
import AOS from "aos";
import Swiper from 'swiper';
import SwiperCore, { Navigation} from 'swiper/core';

SwiperCore.use([Navigation]);
const sameSlidersCreator = (elementsSelector) => {
    if (elementsSelector == "") {
        return false;
    }

    const elements = document.querySelectorAll(elementsSelector);

    [...elements].forEach(function(element) {
        const sliderContainer = element.querySelector('.swiper-container');
        const sliderBtnNext = element.querySelector('.swiper-button-next');
        const sliderBtnPrev = element.querySelector('.swiper-button-prev');

        new Swiper(sliderContainer, {
            // parameters
            watchOverflow: true,
            slidesPerView: 1,
            slidesPerGroup: 1,            

            breakpoints: {
                625: {
                    // parameters
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 10,

                    // navigation
                    navigation: {
                        nextEl: sliderBtnNext,
                        prevEl: sliderBtnPrev,
                    },
                }
            }
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    AOS.init();
    sameSlidersCreator('[data-role="slider"]');

    $(document).on('click', '[data-collapse="control"]', function() {
        $(this).toggleClass('is-active');
        $(this).siblings('[data-collapse="target"]').slideToggle();
    });

    $(document).on('click', '[data-show-nav="trigger"]', function() {
        $(this).toggleClass('is-active');
        $(this).siblings('[data-show-nav="control"]').toggleClass('is-active');
    });
    

    $(document).on('click', '[data-show-full="control"]', function() {
        const $control = $(this);
        const $target =  $control.siblings('[data-show-full="target"]');
        $target.toggleClass("full");
        if ($target.hasClass('full')) {
            $control.text($control.data('name-active'));
        } else {
            $control.text($control.data('name-default'));
        }
    });

    
});
