type keys = 'user' | 'userResult' | 'menu_list' | 'role_list'

class Storage {
  set(key: keys, value: any) {
    if (key) {
      const val = JSON.stringify(value)
      window.localStorage.setItem(key, val)
    }
  }

  get<T = any>(key: keys): T | null | undefined {
    if (key) {
      const val = window.localStorage.getItem(key)
      return val ? JSON.parse(val) : null
    }
  }

  remove(key: keys) {
    if (key) {
      window.localStorage.removeItem(key)
    }
  }

  clear() {
    window.localStorage.clear()
  }
}

export default new Storage()
