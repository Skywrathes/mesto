export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._items = items; //array
    this._renderer = renderer;
  }

  addCards() {
    this._items.forEach(element => {
      this.addItem(element);
    });
  }

  addItem(domElement) {
    this._container.prepend(this._renderer(domElement));
  }
}