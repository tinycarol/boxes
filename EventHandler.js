class EventHandler {
  constructor() {
    this.subscribers = {};
  }

  subscribe(event, method) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(method);
  }

  emit(event, state) {
    for (let subscriber in this.subscribers[event]) {
      this.subscribers[event][subscriber](state);
    }
  }

  cleanUp() {
    this.subscribers = {};
  }
}
