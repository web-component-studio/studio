export default class Observable {
    #private;
    constructor();
    attach(newObservingComponent: any): void;
    detach(currentlyObservingComponent: any): void;
    notify(): void;
}
