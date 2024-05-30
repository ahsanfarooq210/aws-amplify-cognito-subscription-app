import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Badge } from '@/components/ui/badge'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1 className='text-7xl text-red-500 underline' >
        This is the heading
      </h1>
      <Badge>badge</Badge>
    </div>
  )
}

export default App
