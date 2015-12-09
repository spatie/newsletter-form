# newsletter-form

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie-custom/newsletter-form/master.svg?style=flat-square)](https://travis-ci.org/spatie-custom/newsletter-form)
[![Code Climate](https://img.shields.io/codeclimate/github/spatie-custom/newsletter-form.svg?style=flat-square)](https://img.shields.io/codeclimate/github/spatie-custom/newsletter-form.svg)

Client-side handling of newsletter subscriptions via ajax. Validates email and shows server response.

## Installation

This package is custom built for [Spatie](https://spatie.be) projects and is therefore not registered on npm.
In order to install it via npm you have to go through our registry:

```bash
npm set registry https://npm.spatie.be
npm set ca null
```

Or you can require the package straight from GitHub:

```bash
npm install spatie-custom/newsletter-form
```

## Usage

The first step is to create a form that looks like this:

```html
<form data-newsletter method="POST" action="...">
    <input data-newsletter-email type="email">
    <button>Subscribe</button>
</form>

<div data-newsletter-message 
     data-newsletter-error-email="No valid email" 
     data-newsletter-error-ajax="Submission failed">
</div>
```

If you're using the defaults, the easiest way to use the component is to call the `init` function.

```es6
const NewsletterForm = require('newsletter-form');

NewsletterForm.init();
```

Want to use some other form elements? Just pass them to the constructor.

```es6
const myElements = {
    form: $('[data-newsletter-custom-form]'),
    email: $('[data-newsletter-custom-email]'),
    message: $('[data-newsletter-message]'),
};

NewsletterForm.init(myElements);
```

The used css classes and expected repsonse keys can also be changed:

```es6
NewsletterForm.init(myElements)
              .setResponseKeys({message: "customMessageField", type: "customTypeField"})
              .setCssClasses({error: "-custom-error", success: "-custom-success"})
;
```

### Expected server response

If you're using the default response keys, a json response with these keys is expected from the server:

```js
// All Good
{"message":"Subscription is done", "type":"success"}

// Warning 
{"message":"Already subscribed", "type":"info"}

// No Good
{"message":"Newsletter database is down", "type":"error"}
```

## Changelog

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
