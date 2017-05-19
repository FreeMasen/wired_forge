import { HTMLFactory } from './HTMLFactory';


var app;
window.addEventListener('DOMContentLoaded', function() {
    app = new App();
});

class App {
    private factory = new HTMLFactory();
    constructor(){
        var start = this.factory.createElement('h1', 'first-div');
        start.appendChild(document.createTextNode('Hello World'));
        document.body.appendChild(start);

    }
}