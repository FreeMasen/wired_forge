extern crate iron;
extern crate mount;
extern crate router;
extern crate staticfile;
extern crate postgres;
extern crate serde;
extern crate serde_json;
#[macro_use]
extern crate serde_derive;

use serde_json::*;

use postgres::{Connection, TlsMode};
use postgres::*;

use iron::status;
use iron::{Iron, Request, Response, IronResult, Handler};
use iron::prelude::*;
use mount::Mount;
use router::Router;
use staticfile::Static;

use std::io::Read;
use std::path::Path;
use std::fmt;

struct Blogger;

fn main() {
    
    let mut mount = Mount::new();
    mount.mount("/", Static::new(Path::new("target/doc/")))
        .mount("/rest/blog", Blogger);
    println!("Listening on 6767");
    Iron::new(mount).http("127.0.0.1:6767").unwrap();
}

impl Handler for Blogger {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        // let mut body = Vec::new();
        // req
        //     .body
        //     .read_to_end(&mut body)
        //     .map_err(|e| IronError::new(e, (status::InternalServerError, "Error reading request")))?;
        let posts = get_posts();
        Ok(Response::with((status::Ok, posts)))
    }
}

fn get_posts() -> String {
    //"[{\"id\": 1,\"title\": \"Hello from rust server.\",\"content\": \"This is an example of a blog post that hopefully will be stored in the database\",\"images\": []}]".to_string()
    let conn = Connection::connect("postgres://postgres@localhost:5432/RFM", TlsMode::None).unwrap();
    let mut posts = Vec::new();
    let result =  &conn.query("select blogposts.title, blogposts.content, authors.firstname, authors.lastname
                from blogposts
                left join authors
                on authors.id = blogposts.authorid", &[]).unwrap();
    let fields = result.columns();
    for row in result {
        let mut rowList = Vec::new();
        let mut i = 0;
        for field in fields {
            let val: String = row.get(i);
            let prop = format!("\"{}\":\"{}\"", field.name(), val.replace("\n", "\\n"));
            rowList.push(prop);
            i += 1;
        }
        posts.push(format!("{{{}}}", rowList.join(",")));
    }
    let list = format!("[{}]", posts.join(","));
    print!("{}",list);
    list

}

#[derive(Serialize, Deserialize)]
struct BlogPost {
    title: String,
    content: String,
    author: String,
}

impl BlogPost {
    fn to_json(&self) -> String {
        let mut list = Vec::new();
        list.push(format!("\"title\":, \"{}\"", self.title));
        list.push(format!("\"content\":\"{}\"", self.content));
        list.push(format!("\"author\":\"{}\"", self.author));
        format!("{{{}}}", list.join(","))
    }

    fn to_string(&self) -> String {
        format!("title: {}, content: {}, author: {}", self.title, self.content, self.author)
    }
}
