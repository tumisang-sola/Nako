# Nako Date Module
Certainly! Here's the updated markdown with real-world use case examples added to the existing examples for better clarity:

```markdown
# Nako Date Module

A flexible, multi-language date formatting module supporting custom patterns, various languages—including Sesotho and other African languages—and options for UTC/local time.

---

## Table of Contents

- [Introduction](#introduction)
- [Download Options](#download-options)
- [Installation](#installation)
- [Usage](#usage)
- [Supported Languages & Features](#supported-languages--features)
- [Default Behavior](#default-behavior)
- [How `get` Works](#how-get-works)
- [Separator and Format Interactions](#separator-and-format-interactions)
- [Extending Languages](#extending-languages)
- [Updating the Module](#updating-the-module)
- [License](#license)
- [Support & Feedback](#support--feedback)

---

## Introduction

**Nako Date Module** enables generating formatted date strings with support for multiple languages, custom components, patterns, and flexible options. It is ideal for internationalized applications needing diverse date representations.

**Features include:**
- Multi-language day and month names, including Sesotho and many African languages
- Customizable components via the `get` array
- Pattern-based formatting with placeholders
- Support for 12-hour and 24-hour time formats
- UTC or local time calculation
- Custom separators

---

## Download Options

### 1. Clone via Git

Open your terminal and run:

```bash
git clone https://github.com/yourusername/yourrepository.git
```

*(Replace with your actual repository URL)*

### 2. Download ZIP from GitHub

1. Visit the repository on [GitHub](https://github.com/yourusername/yourrepository).
2. Click the **Code** button.
3. Select **Download ZIP**.
4. Save and extract the archive to your preferred location.

---

## Installation

Include the module in your project:

```js
const Nako = require('./path/to/nako.js'); // Adjust the path
```

---

## Usage

### 1. Default Usage

```js
const dateStr = Nako();
console.log(dateStr);
```

**Note:**  
*By default, if no options are provided, the module returns the current date/time in Sesotho language.*

**Real-world example:**  
Suppose you have a dashboard showing the current date for users in Lesotho, and you want it in Sesotho:

```js
console.log(Nako()); 
// Output: Mantaha | Pherekhong | 14 | 2023 | 15:45:30
```

---

### 2. Customized Options

```js
const options = {
  get: ['wkday', 'day', 'month', 'year', 'time'],
  separator: ' | ',
  format: 'dd-mm-yyyy hh:tt',
  lang: 'french',
  timeFormat: '12h',
  utc: true
};
const dateStr = Nako(options);
console.log(dateStr);
```

**Real-world example:**  
For a French-language app displaying UTC time:

```js
// Output might be: Mardi | 14 | novembre | 2023 | 03:45 PM
```

---

### 3. Pattern Formatting

```js
const pattern = 'Today is: dd mm yyyy, weekday: wd';
const dateStr = Nako({ format: pattern, lang: 'english' });
console.log(dateStr);
```

**Real-world example:**  
In an English newsletter header:

```js
// Output: Today is: 14 11 2023, weekday: Mantaha
```

---

## Supported Languages & Features

This module supports a wide array of languages, including:

- **African languages:** Sesotho, Swahili, Hausa, Yoruba, Amharic, Xhosa, Oromo, Fulani, Kikuyu, Zulu, and more.
- **European languages:** English, French, German, Spanish, Italian, Portuguese, Dutch, Swedish, Greek, Russian.
- **Others:** Arabic, Persian, Turkish, Hebrew, Middle Eastern languages, and indigenous American languages like Quechua, Nahuatl, Guarani, Mayan, Tupi-Guarani.

### Example: Sesotho support

```js
const options = {
  get: ['wkday', 'day', 'month', 'year', 'time'],
  separator: ' | ',
  lang: 'sesotho'
};
console.log(Nako(options));
```

**Real-world example:**  
Displaying the current day in Sesotho for a local app:

```js
// Output: Mantaha | 14 | Pherekhong | 2023 | 15:45:30
```

---

## Default Behavior

**Important:**  
*If no options are provided, the function defaults to returning the current date/time in Sesotho language.*

```js
console.log(Nako()); 
// Output: Mantaha | Pherekhong | 14 | 2023 | 15:45:30
```

**Real-world example:**  
A footer showing the last update time in Sesotho:

```js
// Output: Mantaha | Pherekhong | 14 | 2023 | 15:45:30
```

---

## How `get` Works

The `get` array specifies which components to include in the output and their order. Components include:

- `'wkday'` — Weekday name (e.g., "Mantaha" in Sesotho)
- `'month'` — Month name (e.g., "Pherekhong")
- `'day'` — Day number (e.g., "14")
- `'year'` — Year (e.g., "2023")
- `'time'` — Time string (e.g., "15:45:30" or "03:45 PM")
- `'time-zone'` — Time zone info (e.g., "GMT+0")

### How it works:

- The module constructs an object with all parts based on current date/time and selected language.
- It iterates over the `get` array.
- For each item, it fetches the corresponding value from the parts object.
- These are concatenated with the `separator`, unless a `format` pattern is used.

### Default:

```js
get = ['wkday', 'month', 'day', 'year', 'time']
```

which produces outputs like:

```
Mantaha | Pherekhong | 14 | 2023 | 15:45:30
```

---

## Separator and Format Interactions

### When `format` is **not** provided:

- The output is assembled from components listed in `get`.
- Components are joined with the `separator` string.
- **Example:**

```js
const options = {
  get: ['wkday', 'day', 'month', 'year'],
  separator: ' - '
};
console.log(Nako(options));
```

**Real-world example:**  
Displaying a date in a custom format for a report:

```js
// Output: Mantaha - 14 - Pherekhong - 2023
```

---

### When `format` **is** provided:

- The `separator` is **ignored**.
- The pattern string replaces placeholders with component values.
- Internal separators in the pattern are used.
- **Example:**

```js
const pattern = 'Today: dd mm yyyy, weekday: wd';
console.log(Nako({ format: pattern, lang: 'sesotho' }));
```

**Real-world example:**  
UI banner showing formatted date:

```js
// Output: Today: 14 11 2023, weekday: Mantaha
```

---

## Extending Languages

You can extend or modify language support:

- Find the `languages` object in the source.
- Add new language entries with localized day/month names.
- Example for Sesotho:

```js
sesotho: {
  dayNames: ['Mantaha', 'Labobeli', 'Laboraro', 'Labone', 'Labohlano', 'Moqebelo', 'Sontaha'],
  engDayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  monthNames: ['Pherekhong', 'Hlakola', 'Hlakubele', 'Mesa', 'Motseanong', 'Phupjane', 'Phupu', 'Phato', 'Loetse', 'Mphalane', 'Pulunguana', 'Tsitoe'],
  engMonthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
}
```

---

## Updating the Module

To update your local copy:

```bash
cd path/to/yourclone
git pull origin main
```

*(Replace `main` with your branch name if different)*

---

## License

This module is provided under permissive licensing. Use, modify, and distribute freely.

---

## Support & Feedback

For questions, issues, or feature requests, open an issue on the [GitHub repository](https://github.com/yourusername/yourrepository).

---

*Enjoy flexible, multilingual date formatting with Nako!*
```
