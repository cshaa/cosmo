use std::collections::HashMap;

use crate::{
    ast::{FunctionContentPart, FunctionInterface},
    runtime_types::{CosmoRuntimeError, CosmoRuntimeValue, NativeFunction},
};

pub fn get_native_functions() -> HashMap<String, NativeFunction> {
    let mut lib = HashMap::new();

    lib.insert(
        String::from("print"),
        NativeFunction {
            interface: FunctionInterface {
                content: vec![
                    FunctionContentPart::Text(String::from("Print")),
                    FunctionContentPart::Input {
                        placeholder: String::from("Hello world!"),
                    },
                ],
            },
            implementation: Box::new(|v| {
                let [x] = v.as_slice() else {
                    return Err(CosmoRuntimeError::Internal(format!(
                        "Argument type mismatch: Expected a single value, got: {:#?}",
                        v
                    )));
                };
                println!("{}", x);
                Ok(CosmoRuntimeValue::None)
            }),
        },
    );

    lib.insert(
        String::from("add"),
        NativeFunction {
            interface: FunctionInterface {
                content: vec![
                    FunctionContentPart::Input {
                        placeholder: String::from("1"),
                    },
                    FunctionContentPart::Text(String::from("+")),
                    FunctionContentPart::Input {
                        placeholder: String::from("1"),
                    },
                ],
            },
            implementation: Box::new(|v| match v.as_slice() {
                [CosmoRuntimeValue::Number(a), CosmoRuntimeValue::Number(b)] => {
                    Ok(CosmoRuntimeValue::Number(a + b))
                }
                _ => Err(CosmoRuntimeError::Internal(format!(
                    "Argument type mismatch: Expected two numbers, got: {:#?}",
                    v
                ))),
            }),
        },
    );

    lib
}
