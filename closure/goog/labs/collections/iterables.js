/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilities for working with ES6 iterables.
 *
 * The goal is that this should be a replacement for goog.iter which uses
 * a now non-standard approach to iterables.
 *
 * @see https://goo.gl/Rok5YQ
 */

goog.module('goog.labs.collections.iterables');


/**
 * Get the iterator for an iterable.
 * @param {!Iterable<VALUE>} iterable
 * @return {!Iterator<VALUE>}
 * @template VALUE
 */
exports.getIterator = function(iterable) {
  return iterable[goog.global.Symbol.iterator]();
};


/**
 * Call a function with every value of an iterable.
 *
 * Warning: this function will never halt if given an iterable that
 * is never exhausted.
 *
 * @param {!Iterable<VALUE>} iterable
 * @param {function(VALUE) : *} f
 * @template VALUE
 */
exports.forEach = function(iterable, f) {
  for (const elem of iterable) {
    f(elem);
  }
};


/**
 * Maps the values of one iterable to create another iterable.
 *
 * When next() is called on the returned iterable, it will call the given
 * function `f` with the next value of the given iterable
 * `iterable` until the given iterable is exhausted.
 *
 * @param {!Iterable<VALUE>} iterable
 * @param {function(this: THIS, VALUE): RESULT} f
 * @return {!Iterable<RESULT>} The created iterable that gives the mapped
 *     values.
 * @template THIS, VALUE, RESULT
 */
exports.map = function*(iterable, f) {
  for (const elem of iterable) {
    yield f(elem);
  }
};


/**
 * Filter elements from one iterator to create another iterable.
 *
 * When next() is called on the returned iterator, it will call next() on the
 * given iterator and call the given function `f` with that value until `true`
 * is returned or the given iterator is exhausted.
 *
 * @param {!Iterable<VALUE>} iterable
 * @param {function(VALUE): boolean} f
 * @return {!Iterable<VALUE>} The created iterable that gives the mapped
 *     values.
 * @template VALUE
 */
exports.filter = function*(iterable, f) {
  for (const elem of iterable) {
    if (f(elem)) {
      yield elem;
    }
  }
};
