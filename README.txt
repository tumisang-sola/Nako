Nako - Localized Date Formatter
================================

Nako is a flexible JavaScript module for generating human-readable, localized date strings.
It supports multiple languages, customizable formatting patterns, and various options for date and time display.
Perfect for creating user-friendly date outputs in your applications.

----------------------------------------------------

Table of Contents
-----------------
- Features
- Installation
- Usage
- Options
- Supported Languages
- Extending Languages
- Examples
- Contributing
- License

----------------------------------------------------

Features
--------
- Select which date/time components to include (wkday, day, month, year, time)
- Custom separators between components
- Pattern-based formatting with placeholders
- Multiple language support with easy extension
- Switch between 12-hour and 24-hour time formats
- Optionally display date/time in UTC
- Extendable language data

----------------------------------------------------

Installation
------------
Install via npm:
npm install nako

----------------------------------------------------

Usage
-----
Basic Usage:
-----------
const Nako = require('nako');

console.log(Nako()); // Default formatting (Sesotho language)
                   // e.g., "la 15 8 2024 14:30"

Custom Pattern:
---------------
const pattern = 'Today is wd, dd mm yyyy at hh:tt';
console.log(Nako({ format: pattern }));
// e.g., "la 15 8 2024 at 02:30"

Specify Language:
-----------------
console.log(Nako({ lang: 'swahili' }));
// e.g., "Jumapili, 15 Agosti 2024 14:30"

Include Specific Components with Custom Separator:
--------------------------------------------------
console.log(Nako({
  get: ['wkday', 'month', 'day', 'year'],
  separator: ' | ',
  lang: 'zulu'
}));
// e.g., "Lun, August, 15, 2024"

Use 12-Hour Time Format:
------------------------
console.log(Nako({ timeFormat: '12h' }));
// e.g., "la 15 8 2024 02:30 pm"

Display UTC Time:
-----------------
console.log(Nako({ utc: true }));
// Output will be in UTC timezone

----------------------------------------------------

Options
-------
| Option       | Type     | Default                                              | Description                                                                       |
|--------------|----------|------------------------------------------------------|-----------------------------------------------------------------------------------|
| get          | Array    | ['wkday', 'day', 'month', 'year', 'time']           | Components to include and their order.                                            |
| separator    | String   | ' '                                                 | Separator string between components.                                              |
| format       | String   | ''                                                  | Pattern string with placeholders; overrides get.                                   |
| lang         | String   | 'sesotho'                                           | Language code for localization ('sesotho', 'swahili', 'zulu', etc.)            |
| timeFormat   | String   | '24h'                                               | '12h' or '24h'                                                                    |
| utc          | Boolean  | false                                               | Whether to display date/time in UTC.                                              |

----------------------------------------------------

Supported Languages
-------------------
- sesotho (default)
- swahili
- zulu

You can extend support for other languages by editing the source code.

----------------------------------------------------

Extending Languages
-------------------
1. Locate the internal languages object in the source code.
2. Add a new language entry:
   languages['yourLanguageCode'] = {
     months: [...],
     weekdays: [...],
     monthsShort: [...],
     weekdaysShort: [...],
     am: 'AM',
     pm: 'PM'
   };
3. Use your language code in options:
   Nako({ lang: 'yourLanguageCode' });

----------------------------------------------------

Examples
--------
Default date in Sesotho:
------------------------
console.log(Nako());
// e.g., "la 15 8 2024 14:30"

Pattern with placeholders:
--------------------------
console.log(Nako({ format: 'Today is wd, dd mm yyyy at hh:tt' }));
// e.g., "la 15 8 2024 at 02:30"

Full date with selected components and custom separator:
--------------------------------------------------------
console.log(Nako({
  get: ['wkday', 'day', 'month', 'year', 'time'],
  separator: ' | ',
  lang: 'swahili',
  timeFormat: '12h'
}));
// e.g., "Jumapili, 15 Agosti 2024 02:30 pm"

UTC time in Zulu:
---------------
console.log(Nako({ utc: true, lang: 'zulu' }));
// e.g., "Lwesibili, 15 Agasti 2024 14:30"

----------------------------------------------------

Contributing
------------
Contributions are welcome!
- Fork the repository
- Make your changes
- Submit a pull request

Please follow existing style and include tests.

----------------------------------------------------

License
-------
This project is licensed under the MIT License. See LICENSE file for details.

----------------------------------------------------

Notes
-----
- Default language (sesotho) provides date components in Sesotho.
- Placeholder syntax:
  - 'dd': day of month, zero-padded (e.g., '09')
  - 'mm': month number, zero-padded
  - 'yyyy': four-digit year
  - 'hh': hour, zero-padded
  - 'tt': 'AM' or 'PM' (language dependent)
  - 'wd': weekday name
- The 'get' array defines order and components if 'format' is not used.

Feel free to customize and extend the module for your localization needs!
