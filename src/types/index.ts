import { SVGProps } from "react";
export * from "./user";
export * from "./skill";
export * from "./global";
export * from "./project";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
