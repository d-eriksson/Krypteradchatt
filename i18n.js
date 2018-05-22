import i18n from 'i18next';
import Expo from 'expo';

const languageDetector = {
  type: 'languageDetector',
  async: true, // async detection
  detect: (cb) => {
    return Expo.Util.getCurrentLocaleAsync()
      .then(lng => { cb(lng); })
  },
  init: () => {},
  cacheUserLanguage: () => {}
}

i18n
  .use(languageDetector)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        nav: {
          Profile: 'Profile',
          Home: 'Home',
          Scanner: 'Scanner',
        }
      },
      sv: {
        nav: {
          Profile: 'Profil',
          Home: 'Hem',
          Scanner: 'Skanner',
        }
      },
      // have a initial namespace
      ns: ['translation'],
      defaultNS: 'translation',
      interpolation: {
        escapeValue: false // not needed for react
      }
    }
  });

export default i18n;