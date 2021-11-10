export default ({app}, inject) => {
  // 讓 localStorage 作為全域可使用的函式
  // 使用方式 $localStorage
  inject('localStorage', {
    set(key = "", value = {}) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    get(key = "") {
      return JSON.parse(localStorage.getItem(key));
    },
    remove(key = "") {
      localStorage.removeItem(key);
    },
    removeAll() {
      localStorage.clear();
    }
  }) 
}