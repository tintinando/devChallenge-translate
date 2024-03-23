import { ReactNode, type FC } from 'react'
import { HorizontalArrowIcon } from '../assets/HorizontalArrowIcon'
import { FormType, Store } from '../types.d'
import { AVAILABLE_LANGUAGES } from '../constants'

interface LanguageSelectorProps {
  type: FormType
  store: Store
}

interface ButtonProps {
  children: ReactNode
  active: boolean
  onClick: () => void
}

const Button: FC<ButtonProps> = ({ children, active, onClick }) => {
  const activeClass = active ? 'bg-bgButtonSecondary text-textPrimary' : ''
  return (
    <button
      className={`${activeClass} p-2 font-bold rounded-md hover:bg-bgButtonSecondary hover:text-textPrimary`}
      onClick={onClick}
    >{children}
    </button>
  )
}

export const LanguageSelector: FC<LanguageSelectorProps> = ({ type, store }) => {
  const capitalize = (str: string): string => {
    return str[0].toUpperCase() + str.substring(1)
  }

  const handleChangeLanguage = (): void => {
    store.interchangeLanguages()
  }

  const languages = type === FormType.source
    ? { auto: 'Detect language', ...AVAILABLE_LANGUAGES }
    : AVAILABLE_LANGUAGES

  const currentLanguage = type === FormType.source ? store.sourceLanguage : store.targetLanguage

  const handleClick = (e) => {
    if (type === FormType.source) {
      store.setSourceLanguage(e)
    } else {
      store.setTargetLanguage(e)
    }
  }

  return (
    <ul className='flex flex-row gap-4 border-b-[1px] border-borderForm pb-3 mx-2'>
      {
        Object.keys(languages).map(e => (
          <Button
            key={e}
            active={currentLanguage === e}
            data-lang={e}
            onClick={() => handleClick(e)}
          >
            {capitalize(languages[e])}
          </Button>
        ))
      }
      {type === FormType.target && (
        <span
          className='interchange border-2 border-borderForm p-1.5 rounded-xl ms-auto hover:bg-bgButtonSecondary'
          onClick={handleChangeLanguage}
        >
          <HorizontalArrowIcon className='fill-bgButtonSecondary' />
        </span>
      )}
    </ul>
  )
}
