import { h } from "preact";
import { useMemo } from "preact/hooks";
import { ResponsiveLine } from "@nivo/line";

export type ButtonProps = preact.ButtonHTMLAttributes & {
};

export function Button({ ...props }: ButtonProps) {
  return (
    <button {...props}/>
  );
}
