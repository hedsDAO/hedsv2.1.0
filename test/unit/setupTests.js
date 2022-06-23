import "@testing-library/jest-dom/extend-expect";
import "regenerator-runtime/runtime";

window.HTMLMediaElement.prototype.load = () => {
  /* do nothing /
    };
    window.HTMLMediaElement.prototype.play = () => {
    / do nothing /
    };
    window.HTMLMediaElement.prototype.pause = () => {
    / do nothing /
    };
    window.HTMLMediaElement.prototype.addTextTrack = () => {
    / do nothing */
};

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();