export class HTMLFactory {
    createElement(tagName: string = 'div', id: string = null, classList: string[] = null): HTMLElement {
        var element = document.createElement(tagName);

        if (id)
            element.setAttribute('id', id);
        if (classList)
            element.setAttribute('class', classList.join(' '));
        
        return element;
    }
}