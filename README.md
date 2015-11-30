# newsletter-form

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie-custom/newsletter-form/master.svg?style=flat-square)](https://travis-ci.org/spatie-custom/newsletter-form)
[![Code Climate](https://img.shields.io/codeclimate/github/spatie-custom/newsletter-form.svg?style=flat-square)](https://img.shields.io/codeclimate/github/spatie-custom/newsletter-form.svg)

Client-side handling of newsletter subscriptions via ajax. Validates email and shows server response.

## Install

This package is custom built for [Spatie](https://spatie.be) projects and is therefore not registered on npm.
In order to install it via npm you have to go through out registry:

```bash
npm set registry https://npm.spatie.be
npm set ca null
```

Or you can require the package straight from Github:

```bash
npm install spatie-custom/newsletter-form
```


## Usage

```es6
const newsletterForm = require('newsletter-form');

// Default options
let options= {
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
            success: 'success'
        },
    },
}

newsletterForm.init(options);
```

```html
<form data-newsletter method="POST" action="...">
    <input data-newsletter-email type="email">
    <button>Subscribe</button>
</form>

<div data-newsletter-message 
     data-newsletter-error-email="No valid email" 
     data-newsletter-error-ajax="Submission failed" 
>
</div>
```

### Expected server response
```js
// All Good
{ message: "Subscription is done", success: true }

// No Good
{ message: "Newsletter database is down", success: false }
```

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please contact [Willem Van Bockstal](https://github.com/willemvb) instead of using the issue tracker.

## Credits

- [Willem Van Bockstal](https://github.com/willemvb)
- [All Contributors](../../contributors)

## About Spatie
Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
