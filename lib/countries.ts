import countries from "i18n-iso-countries"
import enLocale from "i18n-iso-countries/langs/en.json"
import ptLocale from "i18n-iso-countries/langs/pt.json"

countries.registerLocale(enLocale)
countries.registerLocale(ptLocale)

const countryCodes = countries.getAlpha2Codes()

export const COUNTRIES = Object.keys(countryCodes)
  .map((code) => ({
    code,
    name: countries.getName(code, "pt") || countries.getName(code, "en") || code,
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

export const getCountryName = (code: string): string => {
  return countries.getName(code, "pt") || countries.getName(code, "en") || code
}
