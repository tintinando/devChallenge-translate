import { type FC } from 'react'
import { FormType, Store } from '../types.d'
import { LanguageSelector } from './LanguageSelector'
import { TextInput } from './TextInput'
import { TranslateFooter } from './TranslateFooter'

interface FormProps {
  store: Store
  type: FormType
}

export const Form: FC<FormProps> = ({ type, store }) => {
  const typeClass = `${type === 'source' ? 'bg-bgSource' : 'bg-bgTarget'}`

  return (
    <div className={`${typeClass} text-textSecondary w-[558px] h-[337px] px-4 py-6 rounded-3xl border-[1px] border-borderForm`}>
      <LanguageSelector store={store} type={type} />
      <TextInput store={store} type={type} />
      <TranslateFooter store={store} type={type} />
    </div>
  )
}
