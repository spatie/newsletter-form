const $ = require('jquery');
const validator = require('email-validator');
const merge = require('lodash.merge');

class NewsletterForm {

    /**
     * @param {object} htmlElements
     * @param {JQuery} htmlElements.form
     * @param {JQuery} htmlElements.email
     * @param {JQuery} htmlElements.message
     */
    constructor({$form, $email, $message}) {
        this.$form = $form || $('[data-newsletter]');
        this.$email = $email || $('[data-newsletter-email]');
        this.$message = $message || $('[data-newsletter-message]'),

        this.responseKeys =   {
            message: 'message',
            type: 'type',
        },

        this.cssClasses = {
            success: '-success',
            info: '-info',
            error: '-error',
        },

        this.resetMessage()
            .startSubmitListener();
    }

    /**
     * @param {object} htmlElements
     * @param {JQuery} htmlElements.form
     * @param {JQuery} htmlElements.email
     * @param {JQuery} htmlElements.message
     */
    static init(htmlElements) {
        return new NewsletterForm(htmlElements);
    }

    /**
     * @param {object} responseKeys
     * @param {string} responseKeys.message
     * @param {string} responseKeys.type
     *
     * @return NewsletterForm
     */
    setResponseKeys(responseKeys) {
        this.responseKeys = merge(this.responseKeys, responseKeys);

        return this;
    }

    /**
     * @param {object} cssClasses
     *
     * @param {string} cssClasses.info
     * @param {string} cssClasses.success
     * @param {string} cssClasses.error
     *
     * @return NewsletterForm
     */
    setCssClasses(cssClasses) {
        this.cssClasses = merge(this.cssClasses, cssClasses);

        return this;
    }

    /**
     * Start listening for submit events.
     *
     * @returns {NewsletterForm}
     */
    startSubmitListener() {
        this.$form.on('submit', (event) => {
            event.preventDefault();
            this.resetMessage();

            if (!validator.validate(this.$email.val())) {
                this.showMessage(this.$message.data('newsletter-error-email') || 'Email error without message', 'error');
                return false;
            }

            let responseProperties = {};

            $.ajax({
                type: 'POST',
                data: this.$form.serialize(),
                url: this.$form.attr('action'),
                success:  (ajaxResponse) => {
                    responseProperties.message = ajaxResponse[this.responseKeys.message] || 'Ajax success without message';
                    responseProperties.type = ajaxResponse[this.responseKeys.message] || 'error';
                },
                error: function () {
                    responseProperties.message = this.$message.data('newsletter-error-ajax') || 'Ajax error without message';
                },
                complete: () => {
                    this.showMessage(responseProperties.message, responseProperties.type || 'error');
                },
            });
        });

        return this;
    }

    /**
     * Display a message.
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
     * @returns {NewsletterForm}
     */
    resetMessage() {
        this.$message
            .removeClass(Array.from(this.cssClasses).join(' '))
            .html('')
            .hide();
            
        return this;
    }
}

export default NewsletterForm;
