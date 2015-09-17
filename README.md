# dom$
< 1KB library for DOM selections in JavaScript

## Download

[Development Version](src/dom$.js) [Production Version](src/dom$.min.js)

## About

dom$ supports a lot of browsers, even back to IE8! It's an easy way to create, modify, and find DOM elements dynamically.

This library also works well with the [Stream.js](https://github.com/PaulBGD/Stream.js) library.

## Examples

Adding 2 DOM elements, then using Stream.js to find ones with a certain class

```javascript
var text = dom$('p.text');
var elements = dom$('<p class="text">This is more text</p><p>Even more!</p>');
elements.each(document.body.appendChild.bind(document.body));

new Stream(text.getElements())
        .filter(function (elem) { return elem.innerHTML.indexOf('text') > 0 })
        .forEach(console.log.bind(console));
```

## Functions

### `dom$(elements) => dom$`

Creates a new dom$.

### `dom$.prototype.each(function(element:Element)) => void`

Iterates through all of the elements.

### `dom$.prototype.getElements() => Element[]`

Returns all elements as an array.
