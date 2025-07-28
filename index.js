module.exports = function Nako(opts = {}) {
  const {
    get = ['wkday', 'month', 'day', 'year', 'time'], // default components
    separator = ' ', // separator string
    format = '', // optional pattern, e.g., 'dd-mm-yyyy'
    lang = 'default', // 'default' or 'en', 'ts' for typescript, or extend for other languages
    timeFormat = '24h', // '12h' or '24h'
    utc = false // use UTC time
  } = opts;

  const dateStruct = ['wkday', 'month', 'day', 'year', 'time', 'time-zone'];

  // Language-specific names (extend as needed)
  const languages = {
    default: {
      dayNames: ['Mantaha','Labobeli','Laboraro','Labone','Labohlano','Moqebelo','Sontaha'],
      engDayNames: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      monthNames: ['Pherekhong','Hlakola','Hlakubele','\'Mesa','Motseanong','Phupjane','Phupu','Phato','Loetse','Mphalane','Pulunguana','Tsitoe'],
      engMonthNames: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    },
	//AFRICAN
	swahili: {
      dayNames: ["Jumanne","Jumatatu","Jumanne","Jumatano","Alhamisi","Ijumaa","Jumamosi"
      ],
      engDayNames: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      monthNames: [
        "Januari",
        "Februari",
        "Machi",
        "Aprili",
        "Mei",
        "Juni",
        "Julai",
        "Agosti",
        "Septemba",
        "Oktoba",
        "Novemba",
        "Desemba"
      ],
      engMonthNames: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    },
	  "hausa": {
    "dayNames": ["Litinin", "Talata", "Laraba", "Alhamis", "Jummaʼa", "Asabar", "Lahadi"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Janairu", "Febrairu", "Maris", "Afirilu", "Mayu", "Yuni", "Yuli", "Agusta", "Satumba", "Oktoba", "Nuwamba", "Disamba"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "yoruba": {
    "dayNames": ["Aje", "Isegun", "Rere", "Bọ", "E̩tì", "Abamẹta", "Aiku"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Kínní", "Èrẹ̀nà", "Ẹrẹ̀nà", "Ìgbé", "Ɛ̀bibi", "Òkúdù", "Agẹmọ", "Ọ̀wàrà", "Ṣẹ́rẹ́", "Ọ̀wàrà", "Bẹ̀rẹ̀nù", "Ọ̀pẹ̀"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "amharic": {
    "dayNames": ["ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ", "እሑድ"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["መስከረም", "ጥቅምት", "የካቲት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "መስከረም", "ጥቅምት", "ህዳር", "ታህሳስ"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "xhosa": {
    "dayNames": ["uMvulo", "uLwesibini", "uLwesithathu", "uLwesine", "uLwesihlanu", "uMgqibelo", "iCawa"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Januwari", "Februwari", "Matshi", "Aprili", "Meyi", "Juni", "Julayi", "Agasti", "Septemba", "Oktobha", "Novemba", "Disemba"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "oromo": {
    "dayNames": ["Dilbata", "Wixata", "Qibxata", "Roobii", "Kamiisa", "Jimaata", "Sanbata"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Amajjii", "Guraandhala", "Bitooteessa", "Ebla", "Caamsa", "Waxabajjii", "Adoolessa", "Hagayya", "Fulbaana", "Onkoloolessa", "Sadaasa", "Muddee"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "fula": {
    "dayNames": ["Alaama", "Talaataa", "Araba", "Alhamiisa", "Jummaata", "Sibiti", "Akarre"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Jannuyaa", "Furaaruu", "Maaris", "Apreel", "Me", "Juun", "Juli", "Augaasii", "Fulbaana", "Oktoba", "Nobemba", "Disamba"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "kikuyu": {
    "dayNames": ["Kiumia", "Njumaa", "Kaire", "Kithanu", "Mûthoni", "Ngetha", "Ndamu"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Mûhyû", "Wînyû", "Mûcûrû", "Wînyû", "Mûûthî", "Mûûthî", "N̂gô", "N̂gô", "Kîmenyi", "Kîmenyi", "N̂gô", "N̂gô"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  }
	,
	zulu:{
      dayNames: [
        "uMsombuluko",
        "uLwesibili",
        "uLwesithathu",
        "uLwesine",
        "uLwesihlanu",
        "uMgqibelo",
        "uSonto"
      ],
      engDayNames: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      monthNames: [
        "Januwari",
        "Febhuwari",
        "Matshi",
        "Apreli",
        "Meyi",
        "Juni",
        "Julayi",
        "Agasti",
        "Okthoba",
        "Lwezi",
        "Novemba",
        "Disemba"
      ],
      engMonthNames: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    },
	//EUROPEAN
	"english": {
    "dayNames": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "french": {
    "dayNames": ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "german": {
    "dayNames": ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "spanish": {
    "dayNames": ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "italian": {
    "dayNames": ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "portuguese": {
    "dayNames": ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "dutch": {
    "dayNames": ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "swedish": {
    "dayNames": ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "greek": {
    "dayNames": ["Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο", "Κυριακή"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "russian": {
    "dayNames": ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  //AMERICAN
   "hispanic_american": {
    "dayNames": ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "quechua": {
    "dayNames": ["Inti", "Tuta", "Wiraqocha", "Killa", "Phiri", "Qhapaq", "Uku"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Inti Raymi", "Aymuray", "Ch'isi", "Inti Raymi", "Qhapaq Raymi", "Aymuray", "Ch'isi", "Inti Raymi", "Qhapaq Raymi", "Aymuray", "Ch'isi", "Inti Raymi"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "nahuatl": {
    "dayNames": ["Cuauhtli", "Ocelotl", "Miquiztli", "Cipactli", "Calli", "Cuetzpalin", "Coatl"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Atlacualo", "Tlacaxipehualiztli", "Tozoztli", "April", "Huetzi", "Toxcatl", "Etzalcualiztli", "Atlacualo", "Tlacaxipehualiztli", "Tozoztli", "Atlacualo", "Tlacaxipehualiztli"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "guarani": {
    "dayNames": ["Aña", "Arakaʼe", "Mboʼeha", "Paʼũ", "Jueves", "Sexta", "Pati"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Jasykõi", "Jasyapy", "Jasypo", "Jasyja", "Jasypakõi", "Jasypoapy", "Jasypoapy", "Jasypaʼũ", "Jasypaʼũ", "Jasypaʼũ", "Jasypaʼũ", "Jasypaʼũ"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "mayan": {
    "dayNames": ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Pop", "Uo", "Zip", "Zotz", "Tzec", "Xul", "Yaxkin", "Mol", "Chen", "Yax", "Zac", "Ceh"],
    "engMonthNames": ["Pop", "Uo", "Zip", "Zotz", "Tzec", "Xul", "Yaxkin", "Mol", "Chen", "Yax", "Zac", "Ceh"]
  },
  "tupi_guarani": {
    "dayNames": ["Avañe'ẽ", "Avañe'ẽ", "Avañe'ẽ", "Avañe'ẽ", "Avañe'ẽ", "Avañe'ẽ", "Avañe'ẽ"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Jasy", "Jasy", "Jasy", "Jasy", "Jasy", "Jasy", "Jasy", "Jasy", "Jasy", "Jasy", "Jasy", "Jasy"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  //MIDDLE EAST
  "arabic": {
    "dayNames": ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "farsi (Persian)": {
    "dayNames": ["دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه", "یک‌شنبه"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
    "engMonthNames": ["Far", "Ord", "Kho", "Tir", "Mordad", "Shahr", "Mehr", "Aban", "Azar", "Dey", "Bahman", "Esfand"]
  },
  "turkish": {
    "dayNames": ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "hebrew": {
    "dayNames": ["יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "שבת", "ראשון"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "arabic_coptic": {
    "dayNames": ["الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "kurmanji": {
    "dayNames": ["Duşem", "Sêşem", "Çarşem", "Pêncşem", " În", "Şemî", "Yekşem"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Gulan", "Sibat", "Adar", "Nîsan", "Gulan", "Hezîran", "Tîr", "Tebax", "Îlon", "Cotax", "Mijdar", "Gelawêj"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  "assyrian": {
    "dayNames": ["Yawmā", "Yawmā", "Yawmā", "Yawmā", "Yawmā", "Yawmā", "Yawmā"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["Nisan", "Iyar", "Sivan", "Tammuz", "Av", "Elul", "Tishrei", "Heshvan", "Kislev", "Tevet", "Shevat", "Adar"],
    "engMonthNames": ["Nis", "Iya", "Siv", "Tam", "Av", "Elu", "Tis", "Hes", "Kis", "Tev", "She", "Adar"]
  },
  "lebanese": {
    "dayNames": ["الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"],
    "engDayNames": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "monthNames": ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
    "engMonthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  }
    // Add other languages here if needed
  };

  const langData = languages[lang] || languages['default'];

  // Get date object (UTC or local)
  const now = utc ? new Date(Date.UTC(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate(),
    new Date().getUTCHours(),
    new Date().getUTCMinutes(),
    new Date().getUTCSeconds()
  )) : new Date();

  // Helper functions
  function getWeekDay() {
    const engDayIdx = (now.getDay() + 6) % 7; // 0=Mon
    const engDay = langData.engDayNames[engDayIdx];
    const index = langData.engDayNames.indexOf(engDay);
    return index !== -1 ? langData.dayNames[index] : undefined;
  }

  function getMonth() {
    const engMonthIdx = now.getMonth();
    const engMonth = langData.engMonthNames[engMonthIdx];
    const index = langData.engMonthNames.indexOf(engMonth);
    return index !== -1 ? langData.monthNames[index] : undefined;
  }

  function getDay() {
    return (now.getDate()).toString().padStart(2, '0');
  }

  function getYear() {
    return now.getFullYear().toString();
  }

  function getTime() {
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    if (timeFormat === '12h') {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12; // convert to 12h
      return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
    } else {
      return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
    }
  }

  function getTimeZone() {
    return Date().slice(25,Date().length)
  }

  // Build object with all parts
  const parts = {
    wkday: getWeekDay(),
    month: getMonth(),
    day: getDay(),
    year: getYear(),
    time: getTime(),
    'time-zone': getTimeZone()
  };

  // If pattern format provided, parse it
  if (format) {
    const replacements = {
	  'wd': parts.wkday,
      'dd': parts.day,
      'mm': parts.month,
      'yyyy': parts.year,
      'hh': parts.time,
      'tt': parts['time-zone']
    };
    let result = format;
    for (const key in replacements) {
      result = result.replace(new RegExp(key, 'g'), replacements[key]);
    }
    return result;
  }

  // Else, assemble based on get array
  let resultStr = '';

  for (const item of get) {
    if (dateStruct.includes(item)) {
      const val = parts[item];
      if (val != null) {
        resultStr += val + separator;
      }
    }
  }

  return resultStr.trim();
};
