import { useReducer } from 'react'
import { Action, Languages, SourceLanguages, State, Store } from '../types.d'
import { fetchTranslation } from '../services/fetchTranslation'

const initialState: State = {
  source: 'en',
  target: 'fr',
  sourceValue: 'Hello, how are you?',
  targetValue: '',
  loading: false
}

const reducer = (state: State, action: Action): State => {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    if (state.source === 'auto') return state
    return {
      ...state,
      source: state.target,
      target: state.source,
      sourceValue: state.targetValue,
      targetValue: ''
    }
  }

  if (type === 'SET_SOURCE_LANGUAGE') {
    return {
      ...state,
      source: action.payload
    }
  }

  if (type === 'SET_TARGET_LANGUAGE') {
    return {
      ...state,
      target: action.payload
    }
  }

  if (type === 'SET_SOURCE_VALUE') {
    return {
      ...state,
      sourceValue: action.payload,
      targetValue: ''
    }
  }

  if (type === 'SET_TARGET_VALUE') {
    return {
      ...state,
      targetValue: action.payload,
      loading: false
    }
  }

  if (type === 'SET_LOADING_TRUE') {
    return {
      ...state,
      loading: true
    }
  }

  return state
}

const useStore = (): Store => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const sourceLanguage = state.source
  const targetLanguage = state.target
  const sourceValue = state.sourceValue
  const targetValue = state.targetValue
  const loading = state.loading

  const interchangeLanguages = (): void => dispatch({ type: 'INTERCHANGE_LANGUAGES' })

  const setSourceLanguage = (lang: SourceLanguages): void => {
    dispatch({ type: 'SET_SOURCE_LANGUAGE', payload: lang })
  }

  const setTargetLanguage = (lang: Languages): void => {
    dispatch({ type: 'SET_TARGET_LANGUAGE', payload: lang })
  }

  const setSourceValue = (value: string): void => {
    dispatch({ type: 'SET_SOURCE_VALUE', payload: value })
  }

  const translate = async (): Promise<undefined> => {
    dispatch({ type: 'SET_TARGET_VALUE', payload: '' })
    dispatch({ type: 'SET_LOADING_TRUE' })
    const translation = await fetchTranslation(sourceValue, sourceLanguage, targetLanguage)
    dispatch({ type: 'SET_TARGET_VALUE', payload: translation })
  }

  return {
    sourceLanguage,
    targetLanguage,
    sourceValue,
    targetValue,
    loading,
    interchangeLanguages,
    setSourceLanguage,
    setTargetLanguage,
    setSourceValue,
    translate
  }
}

export default useStore
