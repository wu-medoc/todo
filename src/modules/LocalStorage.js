export default function (key) {
  return {
    load () {
      return JSON.parse(window.localStorage.getItem(key) || 'null')
    },
    save (data) {
      window.localStorage.setItem(key, JSON.stringify(data))
    }
  }
}
