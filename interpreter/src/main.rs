use std::{collections::HashMap, fs};

use ast::{FunctionInterface, Program};
use native_functions::get_native_functions;
use schemars::schema_for;

mod ast;
mod interpreter;
mod native_functions;
mod runtime_types;

fn main() {
    println!("Hello, world!");

    let schema = schema_for!(Program);
    fs::write(
        "./gen/schema.json",
        serde_json::to_string_pretty(&schema).unwrap(),
    )
    .unwrap();

    let lib = get_native_functions();

    fs::write(
        "./gen/native_bindings.json",
        serde_json::to_string_pretty(
            &lib.iter()
                .map(|(k, f)| (k.clone(), f.interface.clone()))
                .collect::<HashMap<String, FunctionInterface>>(),
        )
        .unwrap(),
    )
    .unwrap();

    let program =
        serde_json::from_str::<Program>(&fs::read_to_string("./program.json").unwrap()).unwrap();
}
