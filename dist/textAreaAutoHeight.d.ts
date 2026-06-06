import { ComponentProps } from 'react';
type TextareaInputEvent = Parameters<NonNullable<ComponentProps<"textarea">["onInput"]>>[0];
export default function textAreaAutoHeight(event: TextareaInputEvent): void;
export {};
