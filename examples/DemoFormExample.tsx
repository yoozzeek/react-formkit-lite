import React, { useState } from "react";
import TextField from "../src/components/Text";
import SelectField from "../src/components/Select";
import Button from "../src/components/Button";
import CheckboxField from "../src/components/Checkbox/CheckboxField";
import RadioGroup from "../src/components/Radio/RadioGroup";
import RadioField from "../src/components/Radio/RadioField";
import RangeField from "../src/components/Range";
import MultipleFilesField from "../src/components/MultipleFiles";
import UploadArea from "../src/components/UploadArea";

const COUNTRIES_OPTIONS = [
  {
    label: "Russia",
    value: "RU",
  },
];

export default function DemoFormExample() {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState<string | undefined>();
  const [minRating, setMinRating] = useState(0);
  return (
    <section>
      <h2>Example form</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 21,
        }}
      >
        <div
          style={{
            width: 240,
          }}
        >
          <TextField
            required
            id="demo_email"
            name="demo_email"
            label="Email"
            value=""
            placeholder="email@domain.zone"
          />
        </div>
        <div
          style={{
            width: 320,
          }}
        >
          <TextField
            secure
            required
            id="demo_password"
            name="demo_password"
            label="Password"
            value=""
            placeholder="Unique password"
          />
        </div>
        <div
          style={{
            width: 320,
          }}
        >
          <TextField
            secure
            required
            id="confirm_demo_password"
            name="confirm_demo_password"
            label="Confirm password"
            value=""
            placeholder="Password"
            helpText="Confirm your new password"
          />
        </div>
        <div>
          <RadioGroup label="Account type">
            <RadioField
              name="base"
              label="Base"
              value="base"
              checkedValue={radioValue}
              onChange={() => setRadioValue("base")}
            />
            <RadioField
              name="pro"
              label="Pro"
              value="pro"
              checkedValue={radioValue}
              onChange={() => setRadioValue("pro")}
            />
            <RadioField
              name="platinum"
              label="Platinum"
              value="platinum"
              checkedValue={radioValue}
              onChange={() => setRadioValue("platinum")}
            />
            <RadioField
              name="enterprise"
              label="Enterprise"
              value="enterprise"
              checkedValue={radioValue}
              onChange={() => setRadioValue("enterprise")}
            />
          </RadioGroup>
        </div>
        <div>
          <UploadArea onSelectFile={() => {}} />
        </div>
        <div
          style={{
            width: 200,
          }}
        >
          <SelectField
            id="demo_country_code"
            name="demo_country_code"
            placeholder="Select country"
            label="Country"
            value={undefined}
            options={COUNTRIES_OPTIONS}
            onChange={() => {}}
          />
        </div>
        <div>
          <RangeField
            id="demo_min_rating_r"
            name="demo_min_rating_r"
            label="Min product rating"
            min={0}
            max={100}
            step={1}
            value={70}
          />
          <br />
          <TextField
            id="demo_min_rating_t"
            name="demo_min_rating_t"
            type="number"
            placeholder="80"
            helpText="Min raring from 0 to 100"
            value={minRating}
            onChange={(e) => setMinRating(+e.target.value)}
          />
        </div>
        <div>
          <SelectField
            multiple
            min={1}
            max={3}
            id="demo_categories"
            name="demo_categories"
            placeholder="Select categories"
            label="Categories"
            value={undefined}
            options={COUNTRIES_OPTIONS}
            helpText="Select the product categories you want to subscribe to"
            onChange={() => {}}
          />
        </div>
        <div>
          <MultipleFilesField
            label="Product photos"
            files={[]}
            onFilesAdded={() => {}}
            onFilesRemoved={() => {}}
          />
        </div>
        <div>
          <CheckboxField
            rightSideLabel
            id="demo_checkbox"
            name="demo_checkbox"
            label="I agree to receive news and updates that I can unsubscribe any time after"
            value={checkboxValue}
            onClick={(checked) => setCheckboxValue(checked)}
          />
        </div>
        <footer>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </footer>
      </form>
    </section>
  );
}
