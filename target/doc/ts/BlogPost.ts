import {Component} from './Component';
import {HTML} from './HTML';
import {Attribute} from './ElementAttribute';
import {MDParser} from './MDParser';
export class BlogPost implements Component {
    node: HTMLElement 
    html = new HTML();
    md = new MDParser();
    constructor(title: string, content: string, author: string) {
        let header = this.header(title, author);
        this.node = this.html.div(header,
            new Attribute('class', 'blog-post'));
        let c = this.content(content);
        this.node.appendChild(c);
    }

    header(title: string, author: string): HTMLElement {
        let subHeader = this.html.span(author, 
            new Attribute('class', 'sub-header'));
        let t = this.title(title);
        let container = this.html.div(t, 
            new Attribute('class', 'header'));
        container.appendChild(subHeader);
        return container;
    }

    title(title: string): HTMLElement {
        let text = this.html.span(title, 
            new Attribute('class', 'title-text'))
        return this.html.div(text,
            new Attribute('class', 'title-container'));
    }

    content(content: string): HTMLElement {
        let container = this.html.div(null, 
            new Attribute('class', 'content'));
        return this.html.addContent(container, this.formatContent(content));
    }

    private formatContent(content: string): HTMLElement[] {
        if (!content) return;
        var split = content.split('\n');
        return split.filter(line => {
            return line.trim().length > 0;
        }).map(paragraph => {
            return this.formatParagraph(paragraph);
        });
    }

    private formatParagraph(paragraph: string): HTMLElement {
        if (paragraph.indexOf('](') > -1) {
            if (paragraph.indexOf('![')) {
                return this.md.parseImage(paragraph);
            } else {
                return this.md.parseLink(paragraph);
            }
        }
        return this.html.span(paragraph, new Attribute('class', 'paragraph'));
    }
}