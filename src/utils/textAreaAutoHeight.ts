import type { ComponentProps } from "react";

type TextareaInputEvent = Parameters<NonNullable<ComponentProps<"textarea">["onInput"]>>[0];

export default function textAreaAutoHeight(event: TextareaInputEvent) {
  event.currentTarget.style.height = "6px";
  event.currentTarget.style.height = event.currentTarget.scrollHeight + "px";
}
