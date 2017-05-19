extern crate iron;
extern crate staticfile;
extern crate mount;

use std::path::Path;

use iron::Iron;
use staticfile::Static;
use mount::Mount;

fn main() {
    let mut mount = Mount::new();
    mount.mount("/", Static::new(Path::new("target/doc/")));
    println!("Listening on 6767");
    Iron::new(mount).http("127.0.0.1:6767").unwrap();
}