import {ElementAttribute} from './ElementAttribute';

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
        var a = this.createElement('a', ...attributeList);
        a.setAttribute('href', href);
        if (typeof link === 'string')
            a.appendChild(document.createTextNode(link));
        else
            a.appendChild(link);
        return <HTMLAnchorElement>a;
    }
    
    /**
     * Create a div element
     * @param {HTMLElement} innerContent - Inner content
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    div(innerContent: HTMLElement = null, ...attributeList: ElementAttribute[]): HTMLDivElement {
        var div = this.createElement('div', ...attributeList);
        div.appendChild(div);
        return <HTMLDivElement>div;
    }

    /**
     * Create a header element
     * @param {number} level - Rhe level of header between 1 and 6
     * @param {string} text - The content to be displayed
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    h(level: number, text: string, ...attributeList: ElementAttribute[]): HTMLElement {
        var h = this.createElement('h' + level.toString(), ...attributeList);
        h.appendChild(document.createTextNode(text));
        return h;
    }

    /**
     * Create an i element (typically used as an icon element)
     * @param {string} text - Icon name for the font assigned
     * @param {string} font - The name of the icon font
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes 
     */
    i(text: string, font: string = null, ...attributeList: ElementAttribute[]): HTMLElement {
        var i = this.createElement('i', ...attributeList);
        i.appendChild(document.createTextNode(text));
        if (font !== null) {
            i.style.fontFamily = font;
        }
        return i;
    }

    /**
     * Create a link element
     * @param {string} href - Address of the linked resource
     * @param {string} type - Type of linked resource (defaults to 'text/css')
     * @param {string} rel  - Relationship to the document (defaults to 'stylesheet')
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    link(href: string, type: string = 'text/css', rel: string = 'stylesheet', ...attributeList: ElementAttribute[]): HTMLLinkElement {
        var link = this.createElement('link', ...attributeList);
        link.setAttribute('type', type);
        link.setAttribute('rel', rel);
        return <HTMLLinkElement>link;
    }

    /**
     * Create a list item element
     * @param {string HTMLElement} content - The content to be included in the list
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    li(content: string | HTMLElement, ...attributeList: ElementAttribute[]): HTMLLIElement {
        var li = this.createElement('li', ...attributeList);
        if (typeof content === 'string')
            li.appendChild(document.createTextNode(content));
        else
            li.appendChild(<HTMLElement>content);
        return <HTMLLIElement>li;
    }

    /**
     * Create a span element
     * @param {string} text - The string to be displayed
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    span(text: string, ...attributeList: ElementAttribute[]) {
        var span = this.createElement('span', ...attributeList);
        span.appendChild(document.createTextNode(text));
        return span;
    }

    /**
     * Create a table element
     * @param {HTMLTableRowElement} headers - A table row with a list of th elements
     * @param {HTMLTableRowElement} body - A list of table row eleemnts with td elements
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    table(headers: HTMLTableRowElement, body: HTMLTableRowElement[], ...attributeList: ElementAttribute[]): HTMLTableElement {
        var table = this.createElement('table', ...attributeList);
        table.appendChild(headers);
        for (var i = 0; i < body.length; i++) {
            table.appendChild(body[i]);
        }
        return <HTMLTableElement>table;
    }

    /**
     * Create a table body cell
     * @param {string} content - The text to be displayed in this cell
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    td(content: string, ...attributeList: ElementAttribute[]): HTMLTableDataCellElement {
        var td = this.createElement('td', ...attributeList);
        td.appendChild(document.createTextNode(content));
        return <HTMLTableDataCellElement>td;
    }

    /**
     * Create a table row element
     * @param {HTMLTableHeaderCellElement[] | HTMLTableDataCellElement[]} content 
     *          - The cells in this row
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    tr(content: HTMLTableHeaderCellElement[] | HTMLTableDataCellElement[], ...attributeList: ElementAttribute[]): HTMLTableRowElement {
        var tr = this.createElement('tr', ...attributeList);
        for (var i = 0; i < content.length; i++) {
            tr.appendChild(content[i]);
        }
        return <HTMLTableRowElement>tr;
    }

    /**
     * Create a table header cell
     * @param {string} content - The text that will be displayed in the cell
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    th(content: string, ...attributeList: ElementAttribute[]): HTMLTableHeaderCellElement {
        var th = this.createElement('th', ...attributeList);
        th.appendChild(document.createTextNode(content));
        return <HTMLTableHeaderCellElement>th;
    }

    /**
     * Create an unordered list
     * @param {HTMLLIElement} list - An array of <li> elements to be displayed
     * @param {Array<ElementAttribute>} attributeList - List of HTML attributes
     */
    ul(list: HTMLLIElement[], ...attributeList: ElementAttribute[]): HTMLUListElement {
        var ul = this.createElement('ul', ...attributeList);
        for (var i = 0; i < list.length; i++) {
            ul.appendChild(list[i]);
        }
        return <HTMLUListElement>ul;
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

            }
            element.setAttribute('class', attributeList.join(' '));
        }
        return element;
    }
}