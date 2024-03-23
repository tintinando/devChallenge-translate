import { Languages, SourceLanguages } from '../types.d'

export const fetchTranslation = async (value: string, srcLang: SourceLanguages, targetLang: Languages): Promise<string> => {
  if (srcLang === targetLang) return value
  const encodedValue = encodeURIComponent(value)
  const url = 'https://api.mymemory.translated.net/get'
  const response = await fetch(`${url}?q=${encodedValue}!&langpair=${srcLang}|${targetLang}`)
  const data = await response.json()
  return data.responseData.translatedText
}
