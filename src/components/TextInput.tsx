import { type FC } from 'react'
import { FormType, Store } from '../types.d'

interface TextInputProps {
  store: Store
  type: FormType
}

export const TextInput: FC<TextInputProps> = ({ store, type }) => {
  const value = type === FormType.source ? store.sourceValue : store.targetValue
  const inputLength = value.length

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    if (type === FormType.target) return
    store.setSourceValue(e.target.value)
  }
  return (
    <form className='relative w-full h-48 mb-2 font-semibold'>
      <textarea
        className='bg-transparent py-6 px-2 text-textPrimary w-full h-full resize-none'
        rows={5}
        value={value}
        onChange={handleChange}
        disabled={type === FormType.target}
      />
      {inputLength > 0 && type === FormType.source &&
        <label
          className='absolute right-2 p-1 rounded-md cursor-pointer top-4 hover:bg-bgButtonSecondary'
          onClick={() => store.setSourceValue('')}
        >❌
        </label>}
      <label className='absolute right-2 bottom-2 text-xs'>{`${inputLength}/500`}</label>
    </form>
  )
}
