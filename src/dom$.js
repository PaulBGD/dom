(function (global, document, TEMP_DIV) {

    TEMP_DIV = document.createElement('div');

    function dom$(elements) {
        if (!(this instanceof dom$)) {
            return new dom$(elements);
        }
        var arr = [];
        if (!elements || elements instanceof dom$) {
            return elements;
        } else if (isArray(elements)) {
            for (var i = 0, max = elements.length; i < max; i++) {
                var returned = getGroup(elements[i]);
                if (isArray(returned)) {
                    for (var j = 0, jmax = returned.length; j < jmax; j++) {
                        arr.push(returned[j]);
                    }
                } else {
                    arr.push(returned);
                }
            }
        } else {
            arr = getGroup(elements);
            if (!isArray(arr)) {
                arr = [arr];
            }
        }
        this.groups = arr;
    }

    var prototype = dom$.prototype;

    prototype['each'] = function (func) {
        var elements = this['getElements']();
        var length = elements.length;
        while (length--) {
            var element = elements[length];
            func.call(element, element);
        }
        return this;
    };

    prototype['empty'] = function () {
        this['each'](function (element) {
            while (element.hasChildNodes()) {
                element.removeChild(element.lastChild);
            }
        });
        return this;
    };

    prototype['remove'] = function () {
        this['each'](function (element) {
            element.parentNode.removeChild(element);
        });
        return this;
    };

    prototype['getElements'] = function () {
        var arr = [];
        var length = this.groups.length;
        while (length--) {
            var elems = this.groups[length]();
            if (isArray(elems)) {
                var eLength = elems.length;
                while (eLength--) {
                    arr.push(elems[eLength]);
                }
            } else {
                arr.push(elems);
            }
        }
        return arr;
    };

    function isArray(arr) {
        return Object.prototype.toString.call(arr) === '[object Array]' || arr instanceof NodeList || arr instanceof HTMLCollection;
    }

    function getGroup(element) {
        if (typeof element == 'string') {
            if (/<[a-z][\s\S]*>/i.test(element)) { // contains html elements
                TEMP_DIV.innerHTML = element;
                element = TEMP_DIV.childNodes;
                return returnValue(element);
            } else {
                element = element.trim();
                if (element.indexOf(' ') < 0) {
                    var first = element.charAt(0);
                    if (first == '#') {
                        element = split(element, '#');
                        return function () {
                            return document.getElementById(element);
                        };
                    } else if (first == '.') {
                        // returns an HTMLCollection which is always updated, no need to constantly query!
                        element = document.getElementsByClassName(split(element, '.'));
                        return returnValue(element);
                    } else if (/^[0-9a-zA-Z]+$/.test(element)) {
                        // returns an HTMLCollection which is always updated, no need to constantly query!
                        element = document.getElementsByTagName(element);
                        return returnValue(element);
                    }
                }
                return function () {
                    return document.querySelectorAll(element);
                };
            }
        } else {
            return returnValue(element);
        }
    }

    function split(str, c) {
        return str.split(c).slice(1).join(c);
    }

    function returnValue(value) {
        return function () {
            return value;
        };
    }

    if (typeof module != 'undefined') {
        module.exports = dom$;
    } else {
        global['dom$'] = dom$;
    }
})(this, document);
