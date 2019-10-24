// i18n/index.js

import Vue from 'vue'

/** VueI18n library to handle internationnalization **/
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import elementFR from 'element-ui/lib/locale/lang/fr';
import elementEN from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

import en from './en.json'
import fr from './fr.json'

const defaultLocale = 'en'

const languages = {
  en: en,
  fr: fr,
}

class MyI18n extends VueI18n {
  constructor(args) {
    super(args)
  }
  
  setLocale(newLocale) {
    this.locale = newLocale
    switch (newLocale) {
      case 'fr':
        locale.use(elementFR)
      default:
        locale.use(elementEN)
    }
  }
}

const messages = Object.assign(languages)

export const i18n = new MyI18n({
  locale: defaultLocale, // set locale
  messages, // set locale messages
})
