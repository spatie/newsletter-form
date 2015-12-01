const $ = require('jquery');
const validator = require('email-validator');
const merge = require('lodash.merge');

class NewsletterForm {

    constructor({form, email, response}) {
        this.form = form || $('[data-newsletter]');
        this.email = email || $('[data-newsletter-email]');
        this.responseMessage = merge({
            element: $('[data-newsletter-message]'),
            cssClass: {
                error: '-error',
                ithiso: '-ithiso',
                success: '-success',
            },
            keys: {
                message: 'message',
                type: 'type',
            },
        }, response);

        this.resetResponseMessage()
            .initHandler();
    }

    resetResponseMessage() {
        this.responseMessage.element
            .removeClass(Array.from(this.responseMessage.cssClass).join(' '))
            .html('')
            .hide();
        return this;
    }

    respondWithMessage(message, type) {
        this.responseMessage.element
            .html(message)
            .addClass(this.responseMessage.cssClass[type])
            .show();
        return this;
    }

    initHandler() {
        this.form.on('submit', (event) => {
            event.preventDefault();
            this.resetResponseMessage();

            if (!validator.validate(this.email.val())) {
                this.respondWithMessage(this.responseMessage.element.data('newsletter-error-email') || 'Email error without message', 'error');
                return false;
            }

            $.ajax({
                type: 'POST',
                data: this.form.serialize(),
                url: this.form.attr('action'),
                success:  (ajaxResponse) => {
                    let message = ajaxResponse[this.responseMessage.keys.message] || 'Ajax success without message';
                    let responseType = ajaxResponse[this.responseMessage.keys.type] || 'error';

                    this.respondWithMessage(message, responseType);
                },
                error: function () {
                    let message = this.responseMessage.element.data('newsletter-error-ajax') || 'Ajax error without message';

                    this.respondWithMessage(message, 'error');
                },
            });
        });

        return this;
    }
}

export default NewsletterForm;
