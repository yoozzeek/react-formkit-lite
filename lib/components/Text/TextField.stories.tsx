import type { Meta, StoryObj } from "@storybook/react-vite";
import TextField from "./TextField";

const meta = {
  title: "TextField",
  component: TextField,
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    value: "",
    placeholder: "Enter text...",
  },
};
