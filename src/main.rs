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
            req.body.read_to_string(&mut bdy);
            let mut response_code = status::Ok;
            let user: User = serde_json::from_str(&bdy).unwrap_or(
                User {
                    username: "".to_string(),
                    password: "".to_string()
                });
            let (success, message) = log_in(user);
            if success {
                response_code = status::Ok;
            } else {
                response_code = status::Unauthorized;
            }
            Ok(Response::with((response_code, message)))
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
        let section = About {
            title: row.get(0),
            content: row.get(1)
        };
        let about_json = serde_json::to_string(&section).unwrap();
        about.push(about_json);
    }
    format!("[{}]", about.join(","))
}

fn log_in(user: User) -> (bool, String) {
    let db_user: User = get_db_user(user.username.clone());
    if check_password(user.password, db_user.password) {
        let message = format!("Logged in: {}", db_user.username.clone()).to_string();
        print!("Logged in: {}", message);
        return (true, message)
    }
    (false, "No user fount or incorrect password.".to_string())
}

fn check_password(userValue: String, databaseValue: String) -> bool {
    let hashedPassword = match hash(&userValue, DEFAULT_COST) {
        Ok(h) => h,
        Err(_) => "".to_string()
    };
    hashedPassword == databaseValue
}

fn get_db_user(username: String) -> User {
    let conn = Connection::connect(get_connection_string(), TlsMode::None).unwrap();
    let results = &conn.query("select username, passwordhash
                            from users
                            where username = $1", 
                            &[&username]).unwrap();
    if results.len() < 1 {
        return User {
            username: "".to_string(),
            password: "".to_string()
        }
    }
    let result = results.get(1);
    let user = User {
        username: result.get(0),
        password: result.get(1)
    };
    user
}

fn new_user(username: &str, password: &str) -> bool {
    let pw_hash = hash(password, DEFAULT_COST);
    match pw_hash {
        Ok(x) => return insert_new_user(username.to_string(), x),
        _ => return false
    }
}

fn insert_new_user(username: String, password_hash: String) -> bool {
    let conn = Connection::connect(get_connection_string(), TlsMode::None).unwrap();
    let result: &std::result::Result<u64, postgres::error::Error> = &conn.execute("INSERT INTO users (username, passwordhash) VALUES($1, $2)"
                , &[&username, &password_hash]);
    match *result {
        Ok(_) => return true,
        _ => return false
    }
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

#[derive(Serialize, Deserialize)]
struct User {
    username: String,
    password: String,
}