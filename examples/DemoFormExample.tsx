import { useState } from "react";
import TextField from "../src/components/Text";
import SelectField from "../src/components/Select";
import Button from "../src/components/Button";
import CheckboxField from "../src/components/Checkbox/CheckboxField";
import RadioGroup from "../src/components/Radio/RadioGroup";
import RadioField from "../src/components/Radio/RadioField";
import RangeField from "../src/components/Range";
import UploadMultipleFiles from "@/components/UploadMultipleFiles";
import { phoneNumberWithCodeMask } from "@/utils/phoneNumberMask.ts";
import DemoUploadArea from "./components/DemoUploadArea.tsx";
import DateField from "@/components/Date";

const COUNTRIES_OPTIONS = [
  {
    label: "United States",
    value: "US",
  },
  {
    label: "Germany",
    value: "GE",
  },
  {
    label: "Russia",
    value: "RU",
  },
];

const CATEGORIES_OPTIONS = [
  {
    label: "Food",
    value: 1,
  },
  {
    label: "Cats",
    value: 2,
  },
  {
    label: "Cars",
    value: 3,
  },
  {
    label: "Books",
    value: 4,
  },
  {
    label: "Travel",
    value: 5,
  },
];

export default function DemoFormExample() {
  const [values, setValues] = useState({
    email: "",
    phone: "",
    birthday: "",
    type: "",
    rating: 8,
    countryCode: "",
    categoryIds: [] as number[],
    termsConsent: false,
  });

  type Values = typeof values;
  type Field = keyof Values;

  function handleFieldChange<K extends Field>(field: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <section>
      <header>
        <h2>Example form</h2>
        <a
          href="https://github.com/yoozzeek/react-formkit-lite/blob/main/examples/DemoFormExample.tsx"
          target="_blank"
        >
          Code example
        </a>
      </header>
      <form
        style={{
          marginTop: "2rem",
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
            id="email"
            name="email"
            label="Email"
            value={values.email}
            placeholder="email@domain.zone"
            onChange={(e) => handleFieldChange(e.target.name as Field, e.target.value)}
          />
        </div>
        <div
          style={{
            width: 240,
          }}
        >
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone number"
            value={values.phone}
            placeholder="+10000000000"
            mask={phoneNumberWithCodeMask}
            onChange={(e) => handleFieldChange(e.target.name as Field, e.target.value)}
          />
        </div>
        <div
          style={{
            width: 240,
          }}
        >
          <DateField
            id="birthday"
            name="birthday"
            label="Birthday"
            value={values.phone}
            onChange={(field, value) => handleFieldChange(field as Field, value)}
          />
        </div>
        <div>
          <RadioGroup label="Account type">
            <RadioField
              name="type"
              label="Base"
              value="base"
              checkedValue={values.type}
              onChange={() => handleFieldChange("type", "base")}
            />
            <RadioField
              name="pro"
              label="Pro"
              value="pro"
              checkedValue={values.type}
              onChange={() => handleFieldChange("type", "pro")}
            />
          </RadioGroup>
        </div>
        <DemoUploadArea />
        <div
          style={{
            width: 200,
          }}
        >
          <SelectField
            id="country_code"
            name="country_code"
            placeholder="Select country"
            label="Country"
            value={values.countryCode}
            options={COUNTRIES_OPTIONS}
            onChange={(value) => handleFieldChange("countryCode", value)}
          />
        </div>
        <div>
          <RangeField
            id="rating_r"
            name="rating_r"
            label="Product rating"
            min={1}
            max={100}
            step={1}
            value={values.rating}
            onValueChange={(value) => handleFieldChange("rating", value)}
          />
          <br />
          <div
            style={{
              width: 160,
            }}
          >
            <TextField
              id="rating_t"
              name="rating_t"
              type="number"
              placeholder="80"
              helpText="Rating from 1 to 100"
              value={values.rating}
              onChange={(e) => handleFieldChange("rating", +e.target.value)}
            />
          </div>
        </div>
        <div>
          <SelectField<never, number>
            multiple
            min={1}
            max={3}
            id="category_ids"
            name="category_ids"
            placeholder="Select categories"
            label="Categories"
            value={values.categoryIds}
            options={CATEGORIES_OPTIONS}
            helpText="Select the product categories you want to subscribe to"
            onChange={(value) => handleFieldChange("categoryIds", value)}
          />
        </div>
        <div>
          <h4>Upload media files</h4>
          <UploadMultipleFiles
            label="Images, videos and PDFs"
            files={[]}
            onFilesAdded={() => {}}
            onFilesRemoved={() => {}}
          />
        </div>
        <div
          style={{
            marginTop: "1em",
            display: "flex",
            flexDirection: "column",
            gap: "1.4em",
          }}
        >
          <CheckboxField
            id="terms_consent"
            name="terms_consent"
            label="I read terms of service and privacy policy, confirm and agree with them"
            value={values.termsConsent}
            onClick={(checked) => handleFieldChange("termsConsent", checked)}
          />

          <footer>
            <Button fullWidth variant="success" type="submit">
              Submit
            </Button>
          </footer>
        </div>
      </form>

      <div style={{ margin: "2em 0" }}>
        <h3>Form values</h3>
        <pre
          style={{
            marginTop: "2em",
            whiteSpace: "pre-wrap",
          }}
        >
          {JSON.stringify(values, null, 2)}
        </pre>
      </div>
    </section>
  );
}
