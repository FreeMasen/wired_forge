import { HTMLFactory, ElementAttribute } from './HTMLFactory';
import { EventHandler } from './EventHandler';
import { DataService } from './DataService';
import { BlogPost } from './BlogPost';

var app;
window.addEventListener('DOMContentLoaded', function() {
    app = new App();

});

class App {
    private factory = new HTMLFactory();
    private events = new EventHandler();
    private data = new DataService();

    constructor() {
        this.data.get('/rest/blog', (err, posts: Post[]) => {
            if (err) console.error(err);
            else this.displayPosts(posts);
        });
    }

    displayPosts(posts: Post[]): void {
        let mainContent = document.getElementById('main-content');
        if (mainContent == null) return;
        for (var i = 0; i < posts.length; i++) {
            let post = posts[i];
            mainContent.appendChild(new BlogPost(post.title, post.content, post.firstname + ' ' + post.lastname).node);
        }
    }
}

class Post {
    title: string
    content: string
    firstname: string
    lastname: string
}