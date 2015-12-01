const $ = require('jquery');
const validator = require('email-validator');
const merge = require('lodash.merge');

class NewsletterForm {

    /**
     * @param {object} options
     * @param {JQuery} options.form
     * @param {JQuery} options.email
     * @param {object} options.message
     */
    constructor({form, email, message} = {}) {
        this.form = form || $('[data-newsletter]');
        this.email = email || $('[data-newsletter-email]');
        this.message = merge({
            element: $('[data-newsletter-message]'),
            cssClass: {
                error: '-error',
                info: '-info',
                success: '-success',
            },
            jsonKeys: {
                responseText: 'responseText',
                responseType: 'responseType',
            },
        }, message);

        this.resetMessage()
            .startSubmitListener();
    }

    /**
     * Start listening for submit events.
     *
     * @protected
     *
     * @returns {NewsletterForm}
     */
    startSubmitListener() {
        this.form.on('submit', (event) => {
            event.preventDefault();
            this.resetMessage();

            if (!validator.validate(this.email.val())) {
                this.showMessage(this.message.element.data('newsletter-error-email') || 'Email error without message', 'error');
                return false;
            }

            let messageParameters = {};

            $.ajax({
                type: 'POST',
                data: this.form.serialize(),
                url: this.form.attr('action'),
                success:  ajaxResponse => {
                    messageParameters.responseText = ajaxResponse[this.message.jsonKeys.responseText] || 'Ajax success without message';
                    messageParameters.responseType = ajaxResponse[this.message.jsonKeys.responseType];
                },
                error: () => {
                    messageParameters.responseText = this.message.element.data('newsletter-error-ajax') || 'Ajax error without message';
                },
                complete: () => {
                    this.showMessage(messageParameters.responseText, messageParameters.responseType || 'error');
                },
            });
        });

        return this;
    }


    /**
     * Display a message.
     *
     * @protected
     *
     * @param {string} text
     * @param {string} type
     *
     * @returns {NewsletterForm}
     */
    showMessage(text, type) {
        this.message.element
            .html(text)
            .addClass(this.message.cssClass[type])
            .show();
        return this;
    }

    /**
     * Hide the message.
     *
     * @protected
     *
     * @returns {NewsletterForm}
     */
    resetMessage() {
        this.message.element
            .removeClass(Array.from(this.message.cssClass).join(' '))
            .html('')
            .hide();
        return this;
    }
}

export default NewsletterForm;
