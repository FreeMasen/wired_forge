extern crate iron;
extern crate mount;
extern crate router;
extern crate staticfile;
extern crate postgres;
extern crate serde;
extern crate serde_json;
#[macro_use]
extern crate serde_derive;
extern crate bcrypt;

use bcrypt::{DEFAULT_COST, hash, verify};

use serde_json::*;

use postgres::{Connection, TlsMode};
use postgres::*;

use iron::status;
use iron::{Iron, Request, Response, IronResult, Handler, Url};
use iron::prelude::*;
use mount::Mount;
use router::Router;
use staticfile::Static;

use std::io;
use std::io::prelude::*;
use std::fs::File;
use std::io::Read;
use std::path::Path;
use std::fmt;

struct Blogger;

fn main() {
    
    let mut mount = Mount::new();
    mount.mount("/", Static::new(Path::new("target/doc/")))
        .mount("/rest/", Blogger);
    println!("Listening on 6767");
    Iron::new(mount).http("127.0.0.1:6767").unwrap();
}

impl Handler for Blogger {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        print!("handle!");
        let path = req.url.path()[0];
        if path == "blog" {
            print!("Blog!");
            Ok(Response::with((status::Ok, get_posts())))
        } else if path == "about" {
            print!("About!");
            Ok(Response::with((status::Ok, get_about())))
        } else if path == "login" {
            print!("Login!");
            let mut bdy: String = "".to_string();
            let read = req.body.read_to_string(&mut bdy);
            print!("{}", bdy);
            Ok(Response::with((status::Ok, bdy)))
        } else {
            print!("Else!");
            Ok(Response::with((status::NotFound, "Unmatched request")))
        }
    }
}

fn get_connection_string() ->  String {
    "postgres://postgres@localhost:5432/RFM".to_string()
}

fn get_posts() -> String {
    let conn = Connection::connect(get_connection_string(), TlsMode::None).unwrap();
    let mut posts = Vec::new();
    let result =  &conn.query("select blogposts.title, blogposts.content, authors.firstname || ' ' || authors.lastname as author
                from blogposts
                left join authors
                on authors.id = blogposts.authorid", &[]).unwrap();
    for row in result {
        let post = BlogPost::new(row.get(0), row.get(1), row.get(2));
        let post_json = serde_json::to_string(&post).unwrap();
        posts.push(post_json);
    }
    let list = format!("[{}]", posts.join(","));
    list
}

fn get_about() -> String {
    let conn = Connection::connect(get_connection_string(), TlsMode::None).unwrap();
    let mut about: Vec<String> = Vec::new();
    let result = &conn.query("select title, content
                            from about", &[]).unwrap();
    for row in result {
        let section = About{
            title: row.get(0),
            content: row.get(1)
        };
        let about_json = serde_json::to_string(&section).unwrap();
        about.push(about_json);
    }
    format!("[{}]", about.join(","))
}

fn log_in(username: String, password: String) {
    let hash = getHashForUser(username.clone());
    if checkPassword(password, hash) {
        print!("Logged in: {}", username);
    }
}

fn checkPassword(userValue: String, databaseValue: String) -> bool {
    let hashedPassword = match hash(&userValue, DEFAULT_COST) {
        Ok(h) => h,
        Err(_) => "".to_string()
    };
    hashedPassword == databaseValue
}

fn getHashForUser(username: String) -> String {
    let conn = Connection::connect(get_connection_string(), TlsMode::None).unwrap();
    let results = &conn.query("select password_hash
                            from users
                            where username = $1", 
                            &[&username]).unwrap();
    let mut pw_hash: String = "".to_string();
    for result in results {
        pw_hash = result.get(0);
        break;
    }
    pw_hash
}

#[derive(Serialize, Deserialize)]
struct About {
    title: String,
    content: String
}


#[derive(Serialize, Deserialize)]
struct BlogPost {
    title: String,
    content: String,
    author: String,
}

impl BlogPost {
    fn new(title: String, content: String, author: String) -> BlogPost {
        BlogPost {
            title: title,
            content: content,
            author: author
        }
    }
}