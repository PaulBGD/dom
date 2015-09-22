# dom$
< 1KB library for DOM selections in JavaScript

## Download

[Development Version](src/dom$.js) [Production Version](src/dom$.min.js)

## About

Even though it's used less and less, jQuery is still used a lot for its single function that does a lot of different DOM operations. With the increasing browsers support for simple features, some of jQuery's cross-browser compatibility methods have become outdated. This library is made to make it easy to do anything with the DOM, but still use the (much faster) vanilla DOM methods.

dom$ supports a lot of browsers, even back to IE8! It's an easy way to create, modify, and find DOM elements dynamically.

This library also works well with the [Stream.js](https://github.com/PaulBGD/Stream.js) library.

## Examples

Setting all headers to blue:

```javascript
dom$('h1, h2, h3, h4, h5').each(function (elem) {
    elem.style.color = 'blue'; // using `this` would also work here
});
```

Adding 2 DOM elements, then using Stream.js to find ones with a certain class:

```javascript
var text = dom$('p.text');
var elements = dom$('<p class="text">This is more text</p><p>Even more!</p>');
elements.each(document.body.appendChild.bind(document.body));

new Stream(text.getElements())
        .filter(function (elem) { return elem.innerHTML.indexOf('text') > 0 })
        .forEach(console.log.bind(console));
```


## Functions

#### `dom$(elements) => dom$`

Creates a new dom$.

#### `dom$.prototype.each(function(element:Element)) => dom$`

Iterates through all of the elements and returns instance of self.

#### `dom$.prototype.empty() => dom$`

Removes all child nodes and returns instance of self.

#### `dom$.prototype.remove() => dom$`

Removes all nodes and returns instance of self.

#### `dom$.prototype.getElements() => Element[]`

Returns all elements as an array.
