import $ from "jquery";
import fslightbox from "fslightbox";
import AOS from "aos";
import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination} from 'swiper/core';

SwiperCore.use([Navigation, Pagination]);
const sameSlidersCreator = (elementsSelector) => {
    if (elementsSelector == "") {
        return false;
    }

    const elements = document.querySelectorAll(elementsSelector);

    [...elements].forEach(function(element) {
        const sliderContainer = element.querySelector('.swiper-container');
        const sliderPagination = element.querySelector('.swiper-pagination');
        const sliderBtnNext = element.querySelector('.swiper-button-next');
        const sliderBtnPrev = element.querySelector('.swiper-button-prev');

        new Swiper(sliderContainer, {
            // parameters
            watchOverflow: true,
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 10,           
            setWrapperSize: true,

            // navigation
            pagination: {
                el: sliderPagination,
                type: 'bullets',
            },

            navigation: {
                nextEl: sliderBtnNext,
                prevEl: sliderBtnPrev,
            }, 

            breakpoints: {
                625: {
                    // parameters
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                }
            }
        });
    });
}

const initCollapse = (control, target) => {
    control.toggleClass('is-active');
    if (control.hasClass('is-active')) {
        target.slideDown();
        return;
    }        
    target.slideUp();
}

const formValidator = {
    form: null,
    fields: null,
    formAgreement: null,
    formButtonSubmit: null,
    validFields: [],

    getFieldName(field) {
        return field.attr('name');
    },
    isTextFieldValid(textField) {
        return textField.val().length > 0;
    },
    isCheckboxValid(checkbox) {
        return checkbox.prop('checked');
    },
    validationField(field, fieldName) {
        let isFieldValid = this.isTextFieldValid;

        if (!this.validFields.includes(fieldName) && isFieldValid(field)) {
            this.validFields.push(fieldName);
            field.closest('div').removeClass('error');
        } 
        if (this.validFields.includes(fieldName) && !isFieldValid(field)) {
            this.validFields.splice(this.validFields.indexOf(fieldName), 1);
            field.closest('div').addClass('error');
        }
    },
    validationForm() {
        if (this.validFields.length === this.fields.length
            && this.isCheckboxValid(this.formAgreement)) {
            this.formButtonSubmit.prop('disabled', false);
            return;
        }

        this.formButtonSubmit.prop('disabled', true);
    },
    init() {
        this.form = $('[data-form="callback-form"]');
        this.fields = this.form.find('[data-required]');
        this.formAgreement = this.form.find('[data-agreement]');
        this.formButtonSubmit = this.form.find('input[type="submit"]');

        this.fields.on('input', (event) => {
            this.validationField($(event.target), this.getFieldName($(event.target)))
            this.validationForm();
        });
        this.formAgreement.on('input', this.validationForm.bind(this))
    }
}

const DESKTOP_SIZE = 1151;
const PAD_SIZE = 768;
const WINDOW_WIDTH = window.innerWidth;

window.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        once: true,
        offset: 100,
        disable: 'mobile'
    });
    sameSlidersCreator('[data-role="slider"]');
    formValidator.init();

    if (WINDOW_WIDTH < PAD_SIZE) {
        sameSlidersCreator('[data-role="slider-mob"]');
    }

    $(document).on('click', '[data-collapse="control"]', function() {
        const control = $(this);
        const target = control.siblings('[data-collapse="target"]').slideToggle();       
        initCollapse(control, target);
    });

    $(document).on('click', '[data-show-nav="control"]', function() {
        $(this).toggleClass('is-active');
        $(this).closest('.page-header').find('[data-show-nav="target"]').toggleClass('is-active');
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

    $(document).on('click', '[data-close="control"]', function() {
        if (window.innerWidth >= DESKTOP_SIZE && $('.video-banner').length > 0) {
            $(this).closest('[data-close="target"]').addClass('hidden');
            return;
        } 
        $(this).closest('[data-close="target"]').slideUp(); 
    });
    
});
