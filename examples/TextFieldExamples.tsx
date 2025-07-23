import TextField from "../src/components/Text";
import type { CSSProperties } from "react";
import { useState } from "react";
import { phoneNumberWithCodeMask } from "../src/utils/phoneNumberMask";
import { dateMask } from "../src/utils/dateMask";
import { moneyAmountMask } from "../src/utils/otherMasks";

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
    <section>
      <h2>Text field examples</h2>
      <div>
        <h3>Types</h3>
        <div style={baseBlockStyle}>
          <TextField
            id="text_field"
            name="text_field"
            label="Text field"
            type="text"
            placeholder="Text field..."
            value={textFieldValue}
            onChange={(e) => setTextFieldValue(e.target.value)}
          />
          <TextField
            id="number_field"
            name="number_field"
            label="Number field"
            type="number"
            placeholder="Number field..."
            value={numberFieldValue}
            onChange={(e) => setNumberFieldValue(+e.target.value)}
          />
          <TextField
            textarea
            id="textarea_field"
            name="textarea_field"
            label="Textare field"
            placeholder="Textarea placeholder"
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
            label="Required field"
            placeholder="Enter text..."
            value=""
            onChange={() => {}}
          />
          <TextField
            secure
            id="secure_field"
            name="secure_field"
            label="Secure field"
            value={secureFieldValue}
            onChange={(e) => setSecureFieldValue(e.target.value)}
          />
          <TextField
            disabled
            id="disabled_field"
            name="disabled_field"
            label="Disabled field"
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
            label="Phone field"
            type="text"
            placeholder="Number with country code..."
            mask={phoneNumberWithCodeMask}
            value={phoneNumberWithMaskValue}
            onChange={(e) => setPhoneNumberWithMaskValue(e.target.value)}
          />
          <TextField
            id="masked_date_field"
            name="masked_date_field"
            label="Date field"
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
            label="Money amount field"
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
          label="Required field"
          placeholder="Enter text..."
          value={requiredFieldValue}
          error={!requiredFieldValue && "Required field"}
          onChange={(e) => setRequiredFieldValue(e.target.value)}
        />
      </div>
    </section>
  );
}
