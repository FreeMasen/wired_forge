import { HTML, Attribute, MDParser } from '../services';
import { Component } from './Component';

export class About implements Component {
    html = new HTML();
    md = new MDParser();
    node: HTMLElement;
    constructor(title: string, content: string) {
        this.node = this.html.div(this.title(title), 
                        new Attribute('class', 'about-content'));
        var c = this.content(content);
        this.node.appendChild(c);
    }

    title(title: string): HTMLElement {
        return this.html.span(title, new Attribute('class', 'about-title'));
    }

    content(content: string): HTMLElement {
        var container = this.html.div(
            null, new Attribute('class', 'content')
        );
        return this.html.addContent(container, this.formatContet(content));
    }

    private formatContet(content: string): HTMLElement[] {
        if (!content) return;
        var split = content.split('\n');
        return split.filter(line => {
            return line.trim().length > 0;
        }).map(paragraph => {
            return this.formatParagraph(paragraph);
        })
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