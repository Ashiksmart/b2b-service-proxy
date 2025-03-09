'use strict'
import 'es6-promise/auto'
const storage = window.localStorage
let prefixKey = '_prefixKey'

class LocalStorage {
  static setPrefixKey (value) {
    storage.setItem(prefixKey, value)
  }

  static getPrefixKey () {
    return storage.getItem(prefixKey) || ''
  }

  static setItem (code, value) {
    const key = this.getPrefixKey()
    if (key) { code = `${key}.${code}` }
    value = JSON.stringify(value)
    storage.setItem(code, value)
  }

  static getItem (item) {
    const key = this.getPrefixKey()
    if (key) { item = `${key}.${item}` }
    return JSON.parse(storage.getItem(item)) || ''
  }

  static removeItem (item) {
    const key = this.getPrefixKey()
    if (key) { item = `${key}.${item}` }
    storage.removeItem(item)
  }

  static clear () {
      storage.clear()
  }
}

export default LocalStorage
