import type { Meta, StoryObj } from "@storybook/react-vite";
import CheckboxField from "./CheckboxField";
import { fn } from "storybook/test";

const meta = {
  title: "CheckboxField",
  component: CheckboxField,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    id: "checkbox",
    label: "Checkbox",
    value: false,
    onClick: fn(),
  },
} satisfies Meta<typeof CheckboxField>;

export default meta;

type Story = StoryObj<typeof CheckboxField>;

export const Default: Story = {
  args: {
    id: "checkbox",
    label: "Checkbox",
  },
};
