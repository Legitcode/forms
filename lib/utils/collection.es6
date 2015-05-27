"use strict";

export default class Collection {
  static include(coll, value) {
    return coll.indexOf(value) != -1
  }

  static find(coll, value, def) {
    let idx = coll.indexOf(value);

    if (idx != -1) {
      return idx;
    } else {
      return def;
    }
  }
}
