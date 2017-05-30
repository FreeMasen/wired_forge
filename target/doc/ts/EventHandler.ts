/**
 * A central location for dealing with HTML and custom events
 */
export class EventHandler {

    private elementEvents = {};

    registerHTMLEvent(selector: string, eventName: string, listener: Function, context: any): void {
        var elements = document.querySelectorAll(selector);
        if (elements === undefined) return console.log('no elements');
        if (this.elementEvents[selector] === undefined) {
            this.elementEvents[selector] = {};
        }
        var eventTarget = this.elementEvents[selector];
        if (!eventTarget[eventName]) {
            eventTarget[eventName] = [];
        }
        eventTarget[eventName].push(listener.bind(context));
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            element.addEventListener(eventName, this, false);
        }
    }

    handleEvent(event): void {
        console.log('hello from the handler', event);
        var target = <HTMLElement>event.target;
        var eventTarget = this.findTarget(target);
        if (eventTarget === undefined) return;
        console.log('Found target', eventTarget);
        var listeners = eventTarget[event.type];
        if (!listeners) return;
        console.log('listeners: ', listeners);
        for (var i = 0; i < listeners.length; i++) {
            var fn = listeners[i];
            console.log('listener', fn);
            fn(event);
        }
    }

    reRegister(node: HTMLElement): void {
        var idElement = this.elementEvents['#' + node.id]
        if (idElement !== undefined) {
            for (var k in idElement) {
                node.addEventListener(k, this, false);
            }
        }
        var classes = node.className.split(' ');
        for (var i = 0; i < classes.length; i++) {
            var classEvent = this.elementEvents['.' + classes[i]]
            if (classEvent != undefined) {
                for (var k in classEvent) {
                    node.addEventListener(k, this, false);
                }
            }
        }
    }

    private findTarget(target: HTMLElement): any {
        //first try the id attribute
        var selector = '#'  + target.id;
        var element = this.elementEvents[selector];
        //if that fails
        if (element === undefined) {
            //try each of the classes
            var classList = target.className.split(' ');
            for (var i = 0; i < classList.length; i ++) {
                var c  = classList[i];
                selector = '.' + c;
                var element = this.elementEvents[selector];
                //if a class was registered, return here
                if (selector) return element;
            }
            //if no class was found try the tagName
            element = this.elementEvents[target.tagName];
        }
        //if we found the
        return element;
    }
}