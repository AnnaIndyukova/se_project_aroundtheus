export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItems(items) {
    this._items = items;
  }

  renderItems() {
    this._items.reverse().forEach((item) => this.addItem(this._renderer(item)));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
