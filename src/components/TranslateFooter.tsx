import { ReactNode, type FC } from 'react'
import { SoundIcon } from '../assets/SoundIcon'
import CopyIcon from '../assets/CopyIcon'
import { SortAlfa } from '../assets/SortAlfa'
import { FormType, Store } from '../types.d'

interface Props {
  store: Store
  type: FormType
}

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <span
      className='usr-stroke cursor-pointer hover:bg-bgButtonSecondary border-2 border-borderForm p-2 rounded-xl'
      onClick={onClick}
    >
      {children}
    </span>
  )
}

export const TranslateFooter: FC<Props> = ({ store, type }) => {
  const isSource = type === FormType.source
  const handleCopy = async (): Promise<undefined> => {
    const text = isSource ? store.sourceValue : store.targetValue
    try {
      await navigator.clipboard.writeText(text)
    } catch (e) {
      console.error('Failed to copy to clipboard ', e)
    }
  }

  const handleSpeech = (): void => {
    if (!('speechSynthesis' in window)) return
    const synth = window.speechSynthesis
    const ourText = isSource ? store.sourceValue : store.targetValue
    const utterThis = new SpeechSynthesisUtterance(ourText)
    utterThis.lang = isSource ? store.sourceLanguage : store.targetLanguage
    synth.speak(utterThis)
  }

  const handleTranslate = async (): Promise<undefined> => {
    try {
      await store.translate()
    } catch (e) {
      console.error('Failed to translate', e)
    }
  }

  return (
    <div className='flex flex-row items-center gap-2'>
      <Button onClick={handleSpeech}>
        <SoundIcon />
      </Button>
      <Button onClick={handleCopy}>
        <CopyIcon />
      </Button>

      {type === FormType.source &&
        <button
          className='flex flex-row ms-auto disabled:bg-slate-600 bg-bgButtonPrimary text-textPrimary py-2.5 px-6 rounded-xl border-borderButton border-[1px] font-semibold'
          onClick={handleTranslate}
          disabled={store.loading}
        ><SortAlfa />Translate
        </button>}
    </div>
  )
}
