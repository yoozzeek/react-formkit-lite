import TextField from "../src/components/Text";
import type { CSSProperties } from "react";
import { useState } from "react";
import { phoneNumberWithCodeMask } from "@/utils/phoneNumberMask.ts";
import { dateMask } from "@/utils/dateMask.ts";
import { moneyAmountMask } from "@/utils/otherMasks.ts";

const baseBlockStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 21,
};

export default function TextFieldExamples() {
  const [textFieldValue, setTextFieldValue] = useState("");
  const [textareaFieldValue, setTextareaFieldValue] = useState("");
  const [secureFieldValue, setSecureFieldValue] = useState("secret");
  const [numberFieldValue, setNumberFieldValue] = useState(0);
  const [requiredFieldValue, setRequiredFieldValue] = useState("");
  const [phoneNumberWithMaskValue, setPhoneNumberWithMaskValue] = useState("");
  const [dateWithMaskValue, setDateWithMaskValue] = useState("");
  const [moneyWithMaskValue, setMoneyWithMaskValue] = useState("");

  return (
    <section id="text_field_examples">
      <header>
        <h2>Text field examples</h2>
        <a
          href="https://github.com/yoozzeek/react-formkit-lite/blob/main/examples/TextFieldExamples.tsx"
          target="_blank"
        >
          Code example
        </a>
      </header>
      <div>
        <h3>Types</h3>
        <div style={baseBlockStyle}>
          <TextField
            id="text_field"
            name="text_field"
            label="Text"
            type="text"
            placeholder="Enter text..."
            value={textFieldValue}
            onChange={(e) => setTextFieldValue(e.target.value)}
          />
          <TextField
            id="number_field"
            name="number_field"
            label="Number"
            type="number"
            placeholder="Enter number..."
            value={numberFieldValue}
            onChange={(e) => setNumberFieldValue(+e.target.value)}
          />
          <TextField
            textarea
            id="textarea_field"
            name="textarea_field"
            label="Textarea"
            placeholder="Placeholder..."
            value={textareaFieldValue}
            onChange={(e) => setTextareaFieldValue(e.target.value)}
          />
        </div>
      </div>
      <div>
        <h3>Flags</h3>
        <div style={baseBlockStyle}>
          <TextField
            required
            id="required_field"
            name="required_field"
            label="Required"
            placeholder="Enter text..."
            value=""
            onChange={() => {}}
          />
          <TextField
            secure
            id="secure_field"
            name="secure_field"
            label="Secure"
            value={secureFieldValue}
            onChange={(e) => setSecureFieldValue(e.target.value)}
          />
          <TextField
            disabled
            id="disabled_field"
            name="disabled_field"
            label="Disabled"
            placeholder="Enter text..."
            value=""
          />
        </div>
      </div>
      <div>
        <h3>Masks</h3>
        <div style={baseBlockStyle}>
          <TextField
            id="masked_phone_field"
            name="masked_phone_field"
            label="Phone"
            type="text"
            placeholder="Number with country code..."
            mask={phoneNumberWithCodeMask}
            value={phoneNumberWithMaskValue}
            onChange={(e) => setPhoneNumberWithMaskValue(e.target.value)}
          />
          <TextField
            id="masked_date_field"
            name="masked_date_field"
            label="Date"
            type="text"
            placeholder="Date..."
            mask={dateMask}
            value={dateWithMaskValue}
            onChange={(e) => setDateWithMaskValue(e.target.value)}
          />
          <TextField
            resetDisabled
            id="masked_money_amount_field"
            name="masked_money_amount_field"
            label="Money amount"
            type="text"
            placeholder="$10 000"
            autoCorrect="off"
            spellCheck={false}
            pattern="[^0-9]*"
            mask={moneyAmountMask}
            value={moneyWithMaskValue}
            onChange={(e) => setMoneyWithMaskValue(e.target.value)}
          />
        </div>
      </div>
      <div>
        <h3>Error</h3>
        <TextField
          required
          id="error_field"
          name="error_field"
          label="Required"
          placeholder="Enter text..."
          value={requiredFieldValue}
          error={!requiredFieldValue && "Required field"}
          onChange={(e) => setRequiredFieldValue(e.target.value)}
        />
      </div>
    </section>
  );
}
