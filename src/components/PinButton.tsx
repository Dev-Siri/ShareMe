"use client";
import type { ComponentProps } from "react";

interface ActionArgs {
  id: string;
  [key: string]: any;
}

interface Props extends ComponentProps<"button"> {
  action(args: ActionArgs): Promise<void>;
  actionArgs: ActionArgs;
  pinId: string;
}

export default function PinButton({ action, actionArgs, ...props }: Props) {
  return (
    <button
      {...props}
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        action(actionArgs);
      }}
    />
  );
}
