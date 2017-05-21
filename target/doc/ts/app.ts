import { HTMLFactory } from './HTMLFactory';
import { ElementAttribute } from './ElementAttribute';

var app;
window.addEventListener('DOMContentLoaded', function() {
    app = new App();
});

class App {
    private factory = new HTMLFactory();

    constructor(){
        var start = this.factory.createElement('h1', new ElementAttribute('id', 'first-div'));
        start.appendChild(document.createTextNode('Hello World'));
        document.body.appendChild(start);

    }
}