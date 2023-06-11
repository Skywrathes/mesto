export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._items = items; //array
    this._renderer = renderer;
  }

  addCards() {
    this._items.forEach(element => {
      //use addItem for items array
      this.addItem(element);
    });
  }

  addItem(domElement) {
    //prepend dom elements (gotten by getInputsValue method) by renderer described in index.js
    this._container.prepend(this._renderer(domElement));
  }
}