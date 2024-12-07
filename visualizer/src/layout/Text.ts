import type { LayoutingComponent } from "./common.ts";

export interface TextProps {
  contents: string;
}
export const Text =
  ({ contents }: TextProps): LayoutingComponent =>
  ({ document, root }) => {
    const node = document.createElementNS("http://www.w3.org/2000/svg", "text");
    node.textContent = contents;
    root.appendChild(node);
    const { width, height } = node.getBBox();
    node.setAttribute("x", "0");
    node.setAttribute("y", `${height}`);
    return { node, width, height };
  };
