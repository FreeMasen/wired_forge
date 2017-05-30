import { HTML, Attribute } from './HTML';
import { EventHandler } from './EventHandler';
import { DataService } from './DataService';
import { BlogPost } from './BlogPost';
import { About } from './About';

var app;
window.addEventListener('DOMContentLoaded', function() {
    app = new App();

});

class App {
    private html = new HTML();
    private events = new EventHandler();
    private data = new DataService();

    private loggedIn = false;

    constructor() {
        this.events.registerHTMLEvent('#login', 'click', this.login, this);
        this.events.registerHTMLEvent('#home-nav-link','click', this.getPosts, this);
        this.events.registerHTMLEvent('#about-nav-link', 'click', this.getAbout, this);
        this.getPosts(null);
    }

    login(): void {
        this.loggedIn = !this.loggedIn;
        var text = this.loggedIn ? 'Logout' : 'Login';
        var a = this.html.a(text, null, new Attribute('id', 'login'));
        this.html.addClass(a, 'clickable');
        // this.events.registerHTMLEvent('#login', 'click', this.login, this);
        this.html.swapNode('#login', a);
        this.events.reRegister(a);
    }

    getPosts(event): void {
        this.clearMain();
        this.data.get('/rest/blog', (err, posts: Post[]) => {
            if (err) console.error(err);
            else {
                if (typeof posts === 'string') {
                    return console.log(posts);
                }
                this.displayPosts(posts);
            }
        });
    }

    displayPosts(posts: Post[]): void {
        let mainContent = document.getElementById('main-content');
        if (mainContent == null) return;
        var elements = [];
        for (var i = 0; i < posts.length; i++) {
            let post = posts[i];
            elements.push(new BlogPost(post.title, post.content, post.author).node);
        }
        this.fillMain(...elements);
    }

    getAbout(event): void {
        this.data.get('/rest/about', (err, about: Description[]) => {
            if (err) return console.error(err);
            this.displayAbout(about);
        })
    }

    displayAbout(sections: Description[]): void {
        var elements = [];
        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            var sectionElement = new About(section.title, section.content);
            elements.push(sectionElement.node);
        }
        this.fillMain(...elements);
    }

    fillMain(...content: HTMLElement[]): void {
        this.clearMain()
        var main = document.getElementById('main-content');
        if (main === null) return;
        this.html.addContent(main, content);
    }

    clearMain(): void {
        var main = document.getElementById('main-content');
        if (!main) return;
        while (main.hasChildNodes()) {
            main.removeChild(main.lastChild);
        }
    }
}

class Post {
    title: string
    content: string
    author: string
}

class Description {
    title: string
    content: string
}