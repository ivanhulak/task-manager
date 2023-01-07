import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
   .use(Backend)
   .use(LanguageDetector)
   .use(initReactI18next) // passes i18n down to react-i18next
   .init({
      supportedLngs: ['en', 'ukr', 'ru'],
      backend: {
         // translation file path
         loadPath: '/task-manager/locales/i18n/{{ns}}/{{lng}}.json',
      },
      detection: {
         order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
         cashes: ['coockie']
      },
      // disable in production
      debug: true,
      // can have multiple namespaces in case you want to devide a huge translation into smaller pieces 
      ns: ["common", "form", "info"],
      interpolation: {
         escapeValue: false,
         formatSeparator: ","
      },
      react: {
         wait: true
      }
   });
export default i18n;