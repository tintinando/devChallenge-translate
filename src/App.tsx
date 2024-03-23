import { type FC } from 'react'
import './App.css'
import { Logo } from './assets/logo'
import { Form } from './components/Form'
import { FormType } from './types.d'
import useStore from './hooks/useStore'

const App: FC = () => {
  const store = useStore()

  return (
    <div className='bg-bgMain flex flex-col items-center px-16 py-24 usr-background w-full'>
      <Logo />
      <div className='my-12 flex flex-row flex-wrap gap-4 justify-center'>
        <Form store={store} type={FormType.source} />
        <Form store={store} type={FormType.target} />
      </div>
    </div>
  )
}

export default App
