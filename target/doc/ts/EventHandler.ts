/**
 * A central location for dealing with HTML and custom events
 */
export class EventHandler {

    private elementEvents = {};

    registerHTMLEvent(selector: string, eventName: string, listener: Function, context: any): void {
        console.log('registerHTMLElement', selector);
        var elements = document.querySelectorAll(selector);
        console.log('elements', elements);
        if (elements === undefined) return console.log('no elements');
        if (this.elementEvents[selector] === undefined) {
            console.log('not yet registered, setting object');
            this.elementEvents[selector] = {};
        }
        var eventTarget = this.elementEvents[selector];
        console.log('setting host ', eventTarget);
        if (!eventTarget[eventName]) {
            console.log('this selector has no listeners');
            eventTarget[eventName] = [];
        }
        eventTarget[eventName].push(listener.bind(context));
        console.log('events', eventTarget[eventName]);
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            console.log('Registering event for ', element);
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

    registerNonHTMLEvent(eventName: string, listener: Function): void {

    }

    on(eventName: string, args: any[]): void {
        console.log('Hello from the nonHTML Event Handler');

    }

    /**
     * fire a non-HTML event you have registered here on the EventHandler
     * @param eventName - Name that will be used to identify the event
     * @param args - Any arguments that should be sent to the listeners
     */
    fireEvent(event: any, ...args: any[]): void {
       
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