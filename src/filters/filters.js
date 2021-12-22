import store from '../store/store'
import ru from '../locales/ru.json'
import en from '../locales/en.json'

const locales = {
    'ru-RU' : ru,
    'en-US': en
}

export default {
    install: (app, options) => {
        app.config.globalProperties.$filters = {
            
            localizeFilter(key) {
                const locale = store.getters.info.locale || 'ru-RU'

                return locales[locale][key] || `[Localize error]: key ${key} not found`
            },

            dateFilter(value, format = 'date') {
                const options = {} 

                if(format.includes('date')) {
                    options.day = '2-digit'
                    options.month = 'long'
                    options.year = 'numeric'
                }

                if(format.includes('time')) {
                    options.hour = '2-digit'
                    options.minute = '2-digit'
                    options.second = '2-digit'
                }

                const locale = store.getters.info.locale
                
                return new Intl.DateTimeFormat(locale, options).format(new Date(value))
            },

            currencyFilter(value, currency = 'UAH') {
                return new Intl.NumberFormat('ru-RU', {
                    style: 'currency',
                    currency
                }).format(value)
            }
        }

    }
}