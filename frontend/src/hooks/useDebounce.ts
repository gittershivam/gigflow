import { useState, useEffect } from 'react'

// prevents hitting the API on every single keystroke
const useDebounce = (value: string, delay: number) => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    // cleanup so we don't stack timers
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}

export default useDebounce