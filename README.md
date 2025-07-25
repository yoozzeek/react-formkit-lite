# react-formkit-lite

Lightweight form components for modern React apps. Build beautiful, mobile-first forms with just the parts you need. 
From smart selects to masked inputs, everything is approach-agnostic whether you're using raw React state, Formik, or anything else.

[View Demo](https://yoozzeek.github.io/react-formkit-lite/)

### Features
* Single & multi-selects with async search 
* Mobile-first modal UI with smooth animations 
* Masked text inputs (date, phone, currency, tokens)
* File uploads, switches, sliders, checkboxes, and more 
* Easy theming via CSS variables 
* Tree-shakeable: only import what you need

Brought to you by the non-profit [Bitkind.org](https://bitkind.org/about).

## Installation
Install required peer dependencies first:
```bash
yarn add react react-dom react-imask react-responsive simplebar-react
```

Add the context modal dependency:
```bash
yarn add https://github.com/yoozzeek/react-context-modal.git
```

Then install this library directly from GitHub:
```bash
yarn add https://github.com/yoozzeek/react-formkit-lite.git
```

And import the CSS:
```jsx
import "react-formkit-lite/index.css"
```

## Components

### SelectField
Field for selecting a single or multiple values from a list of options. Highly responsive on mobile, supports virtualized lists of thousands of items. Includes dynamic term search and async loading from APIs. Can be easily wrapped to create specific components like `SelectCountry`, `SelectCity`, or `SelectCategories`.

```jsx
import SelectField from "react-formkit-lite/select";

<SelectField
  id="select_field"
  name="select_field"
  label="Label"
  options={optionsList}
  value={value}
  onChange={(_field, value) => setValue(value)}
/>
```
[View Code Example](/examples/SelectFieldExample.tsx)


### TextField
More than just an input field, supports basic text and number types, and can apply dynamic input masks (either custom or built-in). Flexible and adaptable for common text-based use cases.

```jsx
import TextField from "react-formkit-lite/text";
import { phoneNumberWithCodeMask } from "react-formkit-lite/phoneNumberMask";

<TextField
  type="text"
  id="text_field"
  name="text_field"
  label="Text field"
  placeholder="Text field..."
  mask={phoneNumberWithCodeMask}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```
[View Code Example](/examples/TextFieldExamples.tsx)


### DateField
A preconfigured date input based on TextField, using a built-in date mask. Simplifies working with `MM-dd-yyyy` formatted dates.

### CheckboxField
A responsive, cross-browser checkbox field that returns a boolean value. Includes helpful extras for state handling. Can be grouped with `CheckboxGroup` for multiple checkbox scenarios.

```jsx
import CheckboxField from "react-formkit-lite/checbox";

<CheckboxField
  rightSideLabel
  id="checkbox_field"
  name="checkbox_field"
  label="Text or label"
  value={value}
  onClick={(checked) => setValue(checked)}
/>
```

### RadioField
Like `CheckboxField` but for single-choice inputs. Comes with a `RadioGroup` wrapper for defining option groups.

```jsx
<RadioField
  name="radio_field"
  label="Label"
  value="new_value"
  checkedValue={value}
  onChange={() => setValue("new_value")}
/>
```

### RangeField
A mobile-friendly slider for selecting numeric ranges. Includes an expanded click/touch area for improved usability, especially on touch devices.

```jsx
import MultipleFilesField from "react-formkit-lite/range";

<RangeField
  id="range_field"
  name="range_field"
  label="Label"
  min={0}
  max={100}
  step={1}
  value={70}
/>
```

### SwitchField
A toggle-style input that functions like a checkbox but appears as a switch. Offers a modern, compact alternative to traditional checkboxes.

### MultipleFilesField
Robust file upload component supporting multiple files. Works either in immediate-upload mode or with deferred processing using `objectURL` and `FormData`. Flexible for both instant preview and batch upload workflows.

```jsx
import MultipleFilesField from "react-formkit-lite/multipleUpload";

<MultipleFilesField
  label="Label"
  files={[]}
  onFilesAdded={() => {}}
  onFilesRemoved={() => {}}
/>
```

### UploadArea
A drag-and-drop (or click-to-select) area for uploading a single file. Fully configurable: file type restrictions, custom messages, and UX tweaks are all supported.

```jsx
import UploadArea from "react-formkit-lite/upload";

<UploadArea onSelectFile={() => {}} />
```

### Utility Components
Atoms available for building your own UI:
- `Button`
- `Loader`
- `Header`

## Built-in masks
All built-in and custom masks are powered by the [imask](https://imask.js.org/) lib.

- `phoneNumberMask` a few country support (more coming)
- `dateMask` MM-dd-yyyy format
- Other masks such as `moneyAmountMask` and `tokenAmountMask` for fiat and crypto inputs

## Examples
Various use-case examples are provided in the [examples](./examples) directory. Contributions and additional examples are welcome.

## Styles and customization
### Theme variables
Use CSS variables to match your theme:
```css
:root {
    
}
```

### CSS Classes
All class names are prefixed with `formkit-lite-*` for easy targeting. 
Each component provides a set of classes that you can overwrite. For more information check the source code please.

## Bundle and dependencies
* Tree-shakeable components
* Styles provided in a single CSS file

Based on two npm packages:
- [react-viewport-list](https://github.com/oleggrishechkin/react-viewport-list)
- [clsx](https://github.com/lukeed/clsx)

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
