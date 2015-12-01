const $ = require('jquery');
const validator = require('email-validator');
const _merge = require('lodash.merge');

// the object
module.exports = {
    form: $('[data-newsletter]'),
    email: $('[data-newsletter-email]'),
    response: {
        element: $('[data-newsletter-message]'),
        cssClass: {
            error: '-error',
            info: '-info',
            success: '-success',
        },
        keys: {
            message: 'message',
            type: 'type',
        },
    },
    _resetResponse() {
        this.response.element.removeClass(Array.from(this.response.cssClass).join(' '))
                             .html('')
                             .hide();
        return this;
    },
    _respond(message, type) {
        this.response.element.html(message)
                             .addClass(this.response.cssClass[type])
                             .show();
        return this;
    },
    _initHandler() {

        let nf = this;

        this.form.on('submit', function(event) {
            event.preventDefault();
            nf._resetResponse();

            if(! validator.validate(nf.email.val())){
                nf._respond(nf.response.element.data('newsletter-error-email') || 'Email error without message', 'error');
                return false;
            }

            $.ajax({
                type: 'POST',
                data: nf.form.serialize(),
                url: nf.form.attr('action'),
                success: function(ajaxResponse) {
                    nf._respond(ajaxResponse[nf.response.keys.message] || 'Ajax success without message', ajaxResponse[nf.response.keys.type] || 'error');
                },
                error: function() {
                    nf._respond(nf.response.element.data('newsletter-error-ajax') || 'Ajax error without message', 'error');
                },
            });
        });

        return this;
    },
    init(options) {
        _merge(this, options);

        this._resetResponse()
            ._initHandler();

        return this;
    },
};
