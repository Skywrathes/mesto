export default class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addCards(array) {
    array.forEach(element => {
      this._renderer(element);
    });
  }

  addItem(domElement) {
    //prepend dom elements (gotten by getInputsValue method or from initial cards) by renderer described in index.js
    this._container.prepend(domElement);
  }

  addItemAppend(domElement) {
    this._container.append(domElement);
  }

}