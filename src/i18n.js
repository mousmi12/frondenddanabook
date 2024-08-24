// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "transamountError": "Value must be greater than or equal to zero",
          "docdateError": "Enter a correct date",
          // "accidError": "select Account",
          // "nameError":"Pleace Enter Account Name",
          // "invalidMobileError":"enter 10 digit number",
          // "EmailError":"Eneter correct Email",
          // "websiteError":"Enter correct website formate 'https://www.danabook.com'",
          // "creditperiodError":"Only Enter Integer",
          // "creditexceptionError":"Only enter decimalpoint two"
          "multipleLageError":"Enter a correct ",
        }
      },
      hi: {
        translation: {
          "transamountError": "मान शून्य के बराबर या उससे अधिक होना चाहिए",
          "docdateError": "सही तारीख दर्ज करें",
        }
      },
      ar: {
        translation: {
          "transamountError": "يجب أن تكون القيمة أكبر من أو تساوي الصفر",
          "docdateError": "أدخل تاريخًا صحيحًا",
          "accidError": "أدخل تاريخًا صحيحًا",
        }
      },
      // Add other languages here
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already does escaping
    }
  });

export default i18n;
