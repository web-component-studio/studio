import type { LitElement } from 'lit';

export default class Observable {
  #observers: LitElement[];

  constructor(){
    this.#observers = [];
  }

  attach(newObservingComponent) {
    this.#observers.push(newObservingComponent);
  }

  detach(currentlyObservingComponent) {
    this.#observers.splice(this.#observers.indexOf(currentlyObservingComponent), 1);
  }

  notify(){
    this.#observers.forEach(observer => observer.requestUpdate())
  }

}
