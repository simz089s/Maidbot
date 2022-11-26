use std::str;
use std::io::Read;
use rouille::{ Request, Response, ResponseBody };

const RESPONSE_MSG_PREPEND: &str = "We received your data:\n";

pub fn startup(addr: &str) {
    println!("Starting server...\n");
    println!("{addr}");
    rouille::start_server(
        addr,
        // move |request| {
        //     Response::text("Hello World!")
        // }
        handle_request
    );
}

fn handle_request(request: &Request) -> Response {
    rouille::log_custom(
        request,
        |req: &Request, _resp: &Response, _elap: std::time::Duration| { println!("Received request: {:?}", req) },
        |req: &Request, _elap: std::time::Duration| { println!("Received request: {:?}", req) },
        || { Response::empty_204() });//println!("Received request: {:?}", request);
    // rouille::log(request, std::io::stdout(), || { rouille::router!(request,
    //     (GET) (/) => { println!("Received request: {:?}", request); Response::text(format!("Received request: {:?}", request)) },
    //     (POST) (/) => { println!("Received request: {:?}", request); Response::text(format!("Received request: {:?}", request)) },
    //     _ => { println!("Received request: {:?}", request); Response::text(format!("Received request: {:?}", request)) }
    // )});
    let mut headers_string = String::new();
    for h in request.headers() {
        // println!("Header: {:?}", h);
        headers_string += &format!("Header: {:?}\n", h);
    }
    rouille::log_custom(
        request,
        |_req: &Request, _resp: &Response, _elap: std::time::Duration| { print!("{headers_string}") },
        |_req: &Request, _elap: std::time::Duration| { print!("{headers_string}") },
        || { Response::empty_204() });
    let mut data = request.data().expect("Couldn't read data from request.");
    let mut buf = RESPONSE_MSG_PREPEND.as_bytes().to_vec();//Vec::<u8>::new();
    match data.read_to_end(&mut buf) {
        Ok(_) => return Response {
                data: ResponseBody::from_data(buf),
                .. Response::text("200 OK")
    }       ,//println!("Data: {}", str::from_utf8(&buf).unwrap()),
        Err(_) => return Response::text("400 NOT OK")
    };
    // return Response::from_data("text/plain", vec![97, 98]);
    // return Response::text("200 OK");
}

pub fn test(addr: &str, msg: &str) -> bool {
    let response = handle_request(&(Request::fake_http("", addr, vec![(String::from("Content-Type"), String::from("text/plain")), (String::new(), String::new())], msg.as_bytes().to_vec())));
    println!();
    println!("Received response: {:?}", response);
    for h in response.headers {
        println!("Header: {:?}", h);
    }
    let (mut body, body_size) = response.data.into_reader_and_size();
    let mut buf = vec![0; body_size.unwrap()];
    assert_eq!(body_size.unwrap(), body.read(&mut buf).unwrap());
    let msg_received = str::from_utf8(&buf).unwrap();
    assert_eq!(msg, msg_received.trim_start_matches(&RESPONSE_MSG_PREPEND));
    println!("{msg_received}\n");

    return true;
}

#[allow(dead_code)]
fn print_type_of<T>(_: &T) {
    println!("Type is {}", std::any::type_name::<T>())
}
