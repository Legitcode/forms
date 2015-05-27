"use strict";

export default class Collection {
  static include(coll, value) {
    return coll.indexOf(value) != -1
  }
}
