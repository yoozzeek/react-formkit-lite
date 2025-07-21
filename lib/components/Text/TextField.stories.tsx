import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import TextField from "./TextField";

const meta = {
  title: "TextField",
  component: TextField,
  args: {
    id: "text",
    value: "",
    placeholder: "Placeholder...",
    onChange: fn(),
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof TextField>;

export const Base: Story = {
  args: {
    label: "Label",
    value: "",
    onChange: fn(),
  },
};
