/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type Statement =
  | {
      functionCall: FunctionCall;
    }
  | {
      variableDeclaration: {
        expression: Expression;
        identifier: string;
      };
    }
  | {
      variableAssignment: {
        expression: Expression;
        identifier: string;
      };
    };
export type Expression =
  | {
      functionCall: FunctionCall;
    }
  | {
      textLiteral: string;
    }
  | {
      numberLiteral: number;
    }
  | {
      lambda: Lambda;
    };
export type FunctionContentPart =
  | {
      text: string;
    }
  | {
      input: {
        placeholder: string;
      };
    };

export interface Program {
  chunks: ProgramChunk[];
}
export interface ProgramChunk {
  statements: Statement[];
}
export interface FunctionCall {
  arguments: Expression[];
  identifier: string;
  interface: FunctionInterface;
}
export interface Lambda {
  parameters: string[];
  statements: Statement[];
}
export interface FunctionInterface {
  content: FunctionContentPart[];
}
