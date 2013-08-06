/*
 * slugify.js
 *
 * JS version of some slugify code I use elsewhere. "Slug" is a
 * newspaper term used to quickly identify an article as it moves
 * through the editing process.
 *
 * I was introduced to it via Django, where it refers to a "URL-safe"
 * version of a piece of text (usually the headline of a given post).
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
