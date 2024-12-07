use std::{collections::HashMap, fmt, fs};

use native_functions::get_native_functions;
use schemars::{schema_for, JsonSchema};
use serde::{Deserialize, Serialize};

mod native_functions;

#[derive(JsonSchema, Serialize, Deserialize, Clone)]
struct FunctionInterface {
    content: Vec<FunctionContentPart>,
}

#[derive(JsonSchema, Serialize, Deserialize, Clone)]
#[serde(rename_all = "snake_case")]
enum FunctionContentPart {
    Text(String),
    Input { placeholder: String },
}

#[derive(JsonSchema, Serialize, Deserialize, Clone)]
struct Program {
    chunks: Vec<ProgramChunk>,
}

#[derive(JsonSchema, Serialize, Deserialize, Clone)]
struct ProgramChunk {
    statements: Vec<Statement>,
}

#[derive(JsonSchema, Serialize, Deserialize, Clone)]
struct Statement {
    interface: FunctionInterface,
    arguments: Vec<Statement>,
}

#[derive(Debug)]
enum CosmoRuntimeType {
    None,
    String(String),
    Number(f64),
}
impl fmt::Display for CosmoRuntimeType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            CosmoRuntimeType::None => write!(f, "None"),
            CosmoRuntimeType::Number(n) => write!(f, "{}", n),
            CosmoRuntimeType::String(s) => write!(f, "\"{}\"", s),
        }
    }
}

enum CosmoRuntimeError {
    Internal(String),
}

struct NativeFunction {
    interface: FunctionInterface,
    implementation:
        Box<dyn Fn(Vec<CosmoRuntimeType>) -> Result<CosmoRuntimeType, CosmoRuntimeError>>,
}

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
}
