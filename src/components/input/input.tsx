import "./input.css";
import { h } from "preact";
import { className } from "../../platform/class-name.ts";

export type InputProps = preact.InputHTMLAttributes & {};

export function Input({
  className: className1,
  class: className2,
  ...props
}: InputProps) {
  return (
    <input
      className={className(
        "app-input",
        className1?.valueOf().toString(),
        className2?.valueOf().toString()
      )}
      {...props}
    />
  );
}
