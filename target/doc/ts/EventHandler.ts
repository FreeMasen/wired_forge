
/**
 * A central location for dealing with HTML and custom events
 */
export class EventHandler {

    private events = {};
    /**
     *  Register an HTML event to an object method, this avoids issues with events and 'this'
     * @param selector - A good way to find the HTML element in question (use CSS Syntax)
     * @param eventName - The event you are trying to listen to for this element (Will work with either on style events or non-on style events i.e. onclick vs click)
     * @param listener - the function you want called on the event
     */
    registerHTMLEvent(selector: string, eventName: string, listener: Function): void {
        var elements = document.querySelectorAll(selector);
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (eventName.substr(0,2) !== 'on') {
                element.addEventListener(eventName, function(event) {
                    listener(event)
                });
            } else {
                element[eventName] = function(event) {
                    listener(event);
                }
            }
        }
    }

    /**
     * Register a non-HTML event
     * @param {string} eventName - Name that will be used to identify the event
     * @param {Function} listener - Function that will be included in the list of functions called for that event
     */
    registerEvent(eventName: string, listener: Function): void {
        var listeners = this.events[eventName];
        if (listeners === undefined) {
            this.events[eventName] = [];
            listeners = this.events[eventName];
        }
        listeners.push(listener);
    }

    /**
     * fire a non-HTML event you have registered here on the EventHandler
     * @param eventName - Name that will be used to identify the event
     * @param args - Any arguments that should be sent to the listeners
     */
    fireEvent(eventName: string, ...args: any[]): void {
        var listeners = this.events[eventName];
        if (!listeners) return;
        for (var i = 0; i < listeners.length; i++) {
            listeners[i](...args);
        }
    }
}