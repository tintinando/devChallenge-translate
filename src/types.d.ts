import { AVAILABLE_LANGUAGES } from './constants'
type Languages = keyof typeof AVAILABLE_LANGUAGES
type SourceLanguages = Languages | 'auto'

export interface State {
  source: SourceLanguages
  target: Languages
  sourceValue: string
  targetValue: string
  loading: boolean
}

interface Store {
  sourceLanguage: SourceLanguages
  targetLanguage: Languages
  sourceValue: string
  targetValue: string
  loading: boolean
  interchangeLanguages: () => void
  setSourceLanguage: (lang: SourceLanguages) => void
  setTargetLanguage: (lang: Languages) => void
  setSourceValue: (value: string) => void
  translate: () => Promise<undefined>
}

export type Action =
  | { type: 'INTERCHANGE_LANGUAGES' }
  | { type: 'SET_SOURCE_LANGUAGE', payload: SourceLanguages }
  | { type: 'SET_TARGET_LANGUAGE', payload: Languages }
  | { type: 'SET_SOURCE_VALUE', payload: string }
  | { type: 'SET_TARGET_VALUE', payload: string }
  | { type: 'SET_LOADING_TRUE' }

export enum FormType {
  source = 'source',
  target = 'target'
}
