export default class Timer {
  constructor(callback, interval) {
    this.callback = callback;
    this.timerId = null;
    this.setInterval(interval);
  }
  setInterval(interval) {
    if (this.timerId !== null) clearInterval(this.timerId);
    this.timerId = setInterval(this.callback, interval);
  }
  clearInterval() {
    if (this.timerId !== null) clearInterval(this.timerId);
  }
}
