import { HTMLFactory, ElementAttribute } from './HTMLFactory';
import { EventHandler } from './EventHandler';

var app;
window.addEventListener('DOMContentLoaded', function() {
    app = new App();

});

class App {
    private factory = new HTMLFactory();
    private events = new EventHandler();

    constructor(){
        var start = this.factory.button('start', new ElementAttribute('class', 'clicker'));
        document.body.appendChild(start);
        for (var i = 0; i < 25; i++) {
            document.body.appendChild(start.cloneNode(true));
        }
        this.events.registerHTMLEvent('.clicker', 'click', this.sayHello, this);
        this.events.registerHTMLEvent('.clicker', 'click', this.sayGoodbye, this);
    }

    sayHello(event): void {
        console.log('saying hello');
        var start = this.factory.createElement('h1', new ElementAttribute('id', 'hey'));
        start.appendChild(document.createTextNode('Hello World'));
        document.body.appendChild(start);
    } 

    sayGoodbye(event): void {
        console.log('saying goodby');
        var bye = this.factory.h(1,'Goodbye World!', new ElementAttribute('class', 'bye'))
        document.body.appendChild(bye);
    }
}