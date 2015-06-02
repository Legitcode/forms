"use strict";

export default class Obj {
  static clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}
