import {ElementAttribute} from './ElementAttribute';
export {ElementAttribute} from './ElementAttribute';

/**
 * A confient way to create HTML Elements
 */
export class HTMLFactory {
    /**
     * Create and anchor element
     * @param {string} href - The address that this element is linked to
     * @param {string} link - The content that will be the clickable link
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    a(href: string, link: string | HTMLElement, ...attributeList: ElementAttribute[]): HTMLAnchorElement {
        var element = this.createElement('a', ...attributeList);
        element.setAttribute('href', href);
        if (typeof link === 'string')
            element.appendChild(document.createTextNode(link));
        else
            element.appendChild(link);
        return <HTMLAnchorElement>element;
    }

    button(text: string, ...attributeList: ElementAttribute[]): HTMLButtonElement {
        var element = this.createElement('button', ...attributeList);
        element.innerText = text;
        return <HTMLButtonElement>element;
    }
    
    /**
     * Create a div element
     * @param {HTMLElement} innerContent - Inner content
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    div(innerContent: HTMLElement = null, ...attributeList: ElementAttribute[]): HTMLDivElement {
        var element = this.createElement('div', ...attributeList);
        element.appendChild(innerContent);
        return <HTMLDivElement>element;
    }

    /**
     * Create a header element
     * @param {number} level - Rhe level of header between 1 and 6
     * @param {string} text - The content to be displayed
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    h(level: number, text: string, ...attributeList: ElementAttribute[]): HTMLElement {
        var element = this.createElement('h' + level.toString(), ...attributeList);
        element.appendChild(document.createTextNode(text));
        return element;
    }

    /**
     * Create an i element (typically used as an icon element)
     * @param {string} text - Icon name for the font assigned
     * @param {string} font - The name of the icon font
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes 
     */
    i(text: string, font: string = null, ...attributeList: ElementAttribute[]): HTMLElement {
        var element = this.createElement('i', ...attributeList);
        element.appendChild(document.createTextNode(text));
        if (font !== null) {
            element.style.fontFamily = font;
        }
        return element;
    }

    /**
     * Create a link element
     * @param {string} href - Address of the linked resource
     * @param {string} type - Type of linked resource (defaults to 'text/css')
     * @param {string} rel  - Relationship to the document (defaults to 'stylesheet')
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    link(href: string, type: string = 'text/css', rel: string = 'stylesheet', ...attributeList: ElementAttribute[]): HTMLLinkElement {
        var element = this.createElement('link', ...attributeList);
        element.setAttribute('type', type);
        element.setAttribute('rel', rel);
        return <HTMLLinkElement>element;
    }

    /**
     * Create a list item element
     * @param {string HTMLElement} content - The content to be included in the list
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    li(content: string | HTMLElement, ...attributeList: ElementAttribute[]): HTMLLIElement {
        var element = this.createElement('li', ...attributeList);
        if (typeof content === 'string')
            element.appendChild(document.createTextNode(content));
        else
            element.appendChild(<HTMLElement>content);
        return <HTMLLIElement>element;
    }

    /**
     * Create a span element
     * @param {string} text - The string to be displayed
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    span(text: string, ...attributeList: ElementAttribute[]) {
        var element = this.createElement('span', ...attributeList);
        element.appendChild(document.createTextNode(text));
        return element;
    }

    /**
     * Create a table element
     * @param {HTMLTableRowElement} headers - A table row with a list of th elements
     * @param {HTMLTableRowElement} body - A list of table row eleemnts with td elements
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    table(headers: HTMLTableRowElement, body: HTMLTableRowElement[], ...attributeList: ElementAttribute[]): HTMLTableElement {
        var element = this.createElement('table', ...attributeList);
        element.appendChild(headers);
        for (var i = 0; i < body.length; i++) {
            element.appendChild(body[i]);
        }
        return <HTMLTableElement>element;
    }

    /**
     * Create a table body cell
     * @param {string} content - The text to be displayed in this cell
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    td(content: string, ...attributeList: ElementAttribute[]): HTMLTableDataCellElement {
        var element = this.createElement('td', ...attributeList);
        element.appendChild(document.createTextNode(content));
        return <HTMLTableDataCellElement>element;
    }

    /**
     * Create a table row element
     * @param {HTMLTableHeaderCellElement[] | HTMLTableDataCellElement[]} content 
     *          - The cells in this row
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    tr(content: HTMLTableHeaderCellElement[] | HTMLTableDataCellElement[], ...attributeList: ElementAttribute[]): HTMLTableRowElement {
        var element = this.createElement('tr', ...attributeList);
        for (var i = 0; i < content.length; i++) {
            element.appendChild(content[i]);
        }
        return <HTMLTableRowElement>element;
    }

    /**
     * Create a table header cell
     * @param {string} content - The text that will be displayed in the cell
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    th(content: string, ...attributeList: ElementAttribute[]): HTMLTableHeaderCellElement {
        var element = this.createElement('th', ...attributeList);
        element.appendChild(document.createTextNode(content));
        return <HTMLTableHeaderCellElement>element;
    }

    /**
     * Create an unordered list
     * @param {HTMLLIElement} list - An array of <li> elements to be displayed
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    ul(list: HTMLLIElement[], ...attributeList: ElementAttribute[]): HTMLUListElement {
        var element = this.createElement('ul', ...attributeList);
        for (var i = 0; i < list.length; i++) {
            element.appendChild(list[i]);
        }
        return <HTMLUListElement>element;
    }

    /**
     * Create an HTML Element
     * @param {string} tagName - The tag name of the element being created
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    createElement(tagName: string = 'div', ...attributeList: ElementAttribute[]): HTMLElement {
        var element = document.createElement(tagName);

        if (attributeList){
            for (var i = 0; i < attributeList.length; i++) {
                element.setAttribute(attributeList[i].name, attributeList[i].value);
            }
        }
        return element;
    }
}