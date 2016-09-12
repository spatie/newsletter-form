const $ = require('jquery');
const validator = require('email-validator');
const merge = require('lodash.merge');

const ResponseType = {
    SUCCESS: 'success',
    INFO: 'info',
    ERROR: 'error',
};

/**
 * @class
 *
 * @property {Jquery} $form
 * @property {Jquery} $email
 * @property {Jquery} $message
 * @property {object} responseKeys
 * @property {object} cssClasses
 * @property {object} errorMessages
 */
class NewsletterForm {

    /**
     * @param {object} options
     * @param {JQuery} options.$form
     * @param {JQuery} options.$email
     * @param {JQuery} options.$button
     * @param {JQuery} options.$message
     * @param {object} options.responseKeys
     * @param {object} options.cssClasses
     * @param {object} options.errorMessages
     */
    constructor({$form, $email, $button, $message, responseKeys, cssClasses, errorMessages} = {}) {
        this.$form = $form || $('[data-newsletter]');
        this.$email = $email || $('[data-newsletter-email]');
        this.$button = $button || $('[data-newsletter-button]');
        this.$message = $message || $('[data-newsletter-message]');

        this.responseKeys = merge({
            message: 'message',
            type: 'type',
        }, responseKeys);

        this.cssClasses = merge({
            success: '-success',
            info: '-info',
            error: '-error',
        }, cssClasses);

        this.errorMessages = merge({
            invalidEmail: 'Email error without message',
            subscribed: 'Subscription ok',
            subscriptionError: 'Subscription failed',
        }, errorMessages);

        this.hideMessage()
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
        this.$form.on('submit', event => {

            event.preventDefault();
            this.hideMessage();

            if (!validator.validate(this.$email.val())) {
                this.showMessage(this.$message.data('newsletter-error-email') || this.errorMessages.invalidEmail, ResponseType.ERROR);
                return false;
            }

            let responseProperties = {};
            this.disableButton();

            $.ajax({
                type: 'POST',
                data: this.$form.serialize(),
                url: this.$form.attr('action'),
                success: ajaxResponse => {
                    responseProperties.message = ajaxResponse[this.responseKeys.message] || this.errorMessages.subscribed;
                    responseProperties.type = ajaxResponse[this.responseKeys.type] || ResponseType.ERROR;
                },
                error: () => {
                    responseProperties.message = this.$message.data('newsletter-error-ajax') || this.errorMessages.subscriptionError;
                },
                complete: () => {
                    this.showMessage(responseProperties.message, responseProperties.type || ResponseType.ERROR)
                        .enableButton();
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
     * @param {string} message
     * @param {string} type
     *
     * @returns {NewsletterForm}
     */
    showMessage(message, type) {
        this.$message
            .html(message)
            .addClass(this.cssClasses[type])
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
    hideMessage() {
        this.$message
            .removeClass(this.getAllCssClasses())
            .html('')
            .hide();

        return this;
    }

    /**
     * Disable the button.
     *
     * @protected
     *
     * @returns {NewsletterForm}
     */
    disableButton() {
        this.$button
            .attr('disabled', true);

        return this;
    }

    /**
     * Enable the button.
     *
     * @protected
     *
     * @returns {NewsletterForm}
     */
    enableButton() {
        this.$button
            .removeAttr('disabled');

        return this;
    }

    /**
     * Get all css classes.
     *
     * @protected
     *
     * @returns {string}
     */
    getAllCssClasses() {
        return Object.keys(this.cssClasses)
            .map(key => this.cssClasses[key])
            .join(' ');
    }
}

export default NewsletterForm;
