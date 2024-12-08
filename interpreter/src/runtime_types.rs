use std::{collections::HashMap, fmt, rc::Rc};

use crate::ast::{FunctionInterface, Lambda};

#[derive(Debug)]
pub enum CosmoRuntimeValue {
    None,
    String(String),
    Number(f64),
}
impl fmt::Display for CosmoRuntimeValue {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            CosmoRuntimeValue::None => write!(f, "None"),
            CosmoRuntimeValue::Number(n) => write!(f, "{}", n),
            CosmoRuntimeValue::String(s) => write!(f, "\"{}\"", s),
        }
    }
}

pub type CosmoRuntimeScope = HashMap<String, Rc<CosmoRuntimeValue>>;

pub enum CosmoRuntimeCallable {
    Native(NativeFunction),
    Script {
        scope: CosmoRuntimeScope,
        script: Lambda,
    },
}

pub enum CosmoRuntimeError {
    Internal(String),
}

pub struct NativeFunction {
    pub interface: FunctionInterface,
    pub implementation:
        Box<dyn Fn(Vec<CosmoRuntimeValue>) -> Result<CosmoRuntimeValue, CosmoRuntimeError>>,
}
