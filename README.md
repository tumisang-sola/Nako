# Nako Date Module

A flexible, multi-language date formatting module with support for custom patterns, time formats, and UTC/local time options.

---

## Table of Contents

- [Introduction](#introduction)
- [Download Options](#download-options)
- [Installation](#installation)
- [Usage](#usage)
- [Supported Languages & Features](#supported-languages--features)
- [Extending Languages](#extending-languages)
- [Updating the Module](#updating-the-module)
- [License](#license)
- [Support & Feedback](#support--feedback)

---

## Introduction

This module allows you to generate formatted date strings with support for multiple languages, custom separators, and patterns. It is ideal for internationalized applications needing flexible date representations.

---

## Download Options

### 1. Clone via Git

Open your terminal and run:

```bash
git clone https://github.com/yourusername/yourrepository.git
```

*(Replace with the actual repository URL)*

### 2. Download ZIP File from GitHub

1. Visit the repository page on [GitHub](https://github.com/yourusername/yourrepository).
2. Click the **Code** button.
3. Select **Download ZIP**.

![Download ZIP](https://docs.github.com/assets/cb-20363/images/help/repository/code-button.png)

4. Save the ZIP file to your computer.
5. Extract the ZIP archive to your desired location.

---

## Installation

After cloning or downloading the ZIP, include the module in your project:

```js
const Nako = require('./path/to/nako.js'); // Adjust the path as needed
```

---

## Usage

### 1. Default usage

```js
const dateStr = Nako();
console.log(dateStr);
```

### 2. Customized options

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

### 3. Pattern formatting

Use the `format` string with placeholders:

```js
const pattern = 'Today is: dd mm yyyy, at hh';
const dateStr = Nako({ format: pattern });
console.log(dateStr);
```

**Placeholders include:**

| Placeholder | Description                         |
|--------------|-------------------------------------|
| `wd`         | Weekday name                        |
| `dd`         | Day (two digits)                    |
| `mm`         | Month name or number                |
| `yyyy`       | Year                                |
| `hh`         | Time (formatted per `timeFormat`)   |
| `tt`         | Time zone or custom info            |

---

## Supported Languages & Features

### Languages include:

- **African**: Sesotho,Swahili, Hausa, Yoruba, Amharic, Xhosa, Oromo, Fula, Kikuyu, Zulu, etc.
- **European**: English, French, German, Spanish, Italian, Portuguese, Dutch, Swedish, Greek, Russian.
- **Americas & Others**: Hispanic American, Quechua, Nahuatl, Guarani, Mayan, Tupi-Guarani, Middle Eastern languages like Arabic, Persian, Turkish, Hebrew, etc.

### Features:

- Multi-language day and month names.
- Customizable date components (`get` array).
- Pattern-based date formatting.
- Support for 12-hour and 24-hour time formats.
- UTC or local time.
- Custom separators between components.

---

## Extending Languages

Feel free to modify or add new language entries within the `languages` object in the source code to support additional languages or dialects.

---

## Updating the Module

To update your local copy:

```bash
cd path/to/yourclone
git pull origin main
```

*(Replace `main` with your branch name)*

---

## License

This module is provided without restrictions. Use, modify, and distribute freely.

---

## Support & Feedback

For questions or issues, open an issue on the [GitHub repository](https://github.com/yourusername/yourrepository).
