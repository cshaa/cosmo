use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(JsonSchema, Serialize, Deserialize, Clone)]
pub struct Program {
    pub chunks: Vec<ProgramChunk>,
}

#[derive(JsonSchema, Serialize, Deserialize, Clone)]
pub struct ProgramChunk {
    pub statements: Vec<Statement>,
}

#[derive(JsonSchema, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub enum Expression {
    FunctionCall(FunctionCall),
    TextLiteral(String),
    NumberLiteral(f64),
    Lambda(Lambda),
}

#[derive(JsonSchema, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub enum Statement {
    FunctionCall(FunctionCall),
    VariableDeclaration {
        identifier: String,
        expression: Expression,
    },
    VariableAssignment {
        identifier: String,
        expression: Expression,
    },
}

#[derive(JsonSchema, Serialize, Deserialize, Clone)]
pub struct Lambda {
    parameters: Vec<String>,
    statements: Vec<Statement>,
}

#[derive(JsonSchema, Serialize, Deserialize, Clone)]
pub struct FunctionCall {
    pub identifier: String,
    pub interface: FunctionInterface,
    pub arguments: Vec<Expression>,
}

#[derive(JsonSchema, Serialize, Deserialize, Clone)]
pub struct FunctionInterface {
    pub content: Vec<FunctionContentPart>,
}

#[derive(JsonSchema, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub enum FunctionContentPart {
    Text(String),
    Input { placeholder: String },
}
