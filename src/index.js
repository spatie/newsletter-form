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
            success: '-success',
        },
        keys: {
            message: 'message',
            success: 'success',
        },
    },
    _resetResponse() {
        this.response.element.removeClass(this.response.cssClass.join(' '))
                             .hide();
        return this;
    },
    _respond(message, success) {
        this.response.element.html(message)
                             .addClass(this.response.cssClass[success? 'success' : 'error'])
                             .show();
        return this;
    },
    _initHandler() {

        let nf = this;

        this.form.on('submit', function(event) {
            event.preventDefault();
            nf._resetResponse();

            if(! validator.validate(nf.email.val())){
                nf._respond(nf.response.element.data('newsletter-error-email'), false);
                return false;
            }

            $.ajax({
                type: 'POST',
                data: nf.form.serialize(),
                url: nf.form.attr('action'),
                success: function(ajaxResponse) {
                    nf._respond(ajaxResponse[nf.response.keys.message], ajaxResponse[nf.response.keys.success]);
                },
                error: function() {
                    nf._respond(nf.response.element.data('newsletter-error-ajax'), false);
                },
            });
        });

        return this;
    },
    init(options) {
        _merge(this, options);

        this._resetResponse()
            ._initHandler();
    },
};
