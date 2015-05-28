"use strict";

export default class Strings {
  static capitalize(str) {
    if (typeof str == 'undefined') return '';

    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
  }
}
