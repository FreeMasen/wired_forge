import {Component} from './Component';
import {HTMLFactory} from './HTMLFactory';
import {ElementAttribute} from './ElementAttribute';
export class BlogPost implements Component {
    node: HTMLElement 
    html = new HTMLFactory();
    constructor(title: string, content: string, author: string) {
        let header = this.header(title, author);
        this.node = this.html.div(header,
            new ElementAttribute('class', 'blog-post'));
        let c = this.content(content);
        this.node.appendChild(c);
    }

    header(title: string, author: string): HTMLElement {
        let subHeader = this.html.span(author, 
            new ElementAttribute('class', 'sub-header'));
        let t = this.title(title);
        let container = this.html.div(t, 
            new ElementAttribute('class', 'header'));
        container.appendChild(subHeader);
        return container;
    }

    title(title: string): HTMLElement {
        let text = this.html.span(title, 
            new ElementAttribute('class', 'title-text'))
        return this.html.div(text,
            new ElementAttribute('class', 'title-container'));
    }

    content(content: string): HTMLElement {
        let c = this.html.span(content, 
            new ElementAttribute('class', 'content'));
        return this.html.div(c, 
            new ElementAttribute('class', 'content-wrapper'));
    }
}