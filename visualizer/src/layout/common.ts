export interface LayoutingContext {
  document: Document;
  root: SVGElement;
}

export interface LayoutingResult {
  node: SVGElement;
  width: number;
  height: number;
}

export type LayoutingComponent = (ctx: LayoutingContext) => LayoutingResult;
