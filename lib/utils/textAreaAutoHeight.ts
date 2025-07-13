import type { ChangeEvent } from "react";

export default function textAreaAutoHeight(event: ChangeEvent<HTMLTextAreaElement>) {
  event.currentTarget.style.height = "6px";
  event.currentTarget.style.height = event.currentTarget.scrollHeight + "px";
}
