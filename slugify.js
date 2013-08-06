/*
 * slugify.js
 *
 * JS version of some slugify code I use elsewhere.
 *
 * Specifically, it does the following:
 *
 * 1) Remove any non-alphanumerics, dashes, and spaces
 * 2) Turn all whitespace characters into dashes
 * 3) Collapse multiple dashes in a row into one
 * 4) Lowercase the string
 *
 * Examples:
 *
 * slugify('Hello world') -> 'hello-world'
 * slugify('This $ string\'s very \' complicated    and odd') -> 'this-strings-very-complicated-and-odd'
 */

function slugify(text) {
    return text.replace(/[^\w- ]/g, '')
        .replace(/[\s]/g, '-')
        .replace(/--+/g, '-')
        .toLowerCase();
}
