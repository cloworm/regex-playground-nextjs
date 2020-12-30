import useIsMounted from './useIsMounted'
import { useEffect, useState } from 'react'

const useWindowLocation = (): Location|void => {
  const isMounted = useIsMounted()
  const [location, setLocation] = useState<Location|void>()

  useEffect(() => {
    if (!isMounted) return

    const setWindowLocation = () => {
      setLocation(window.location)
    }

    if (!location) {
      setWindowLocation()
    }

    window.addEventListener('popstate', setWindowLocation)

    return () => {
      window.removeEventListener('popstate', setWindowLocation)
    }
  }, [isMounted, location])

  return location
}

export default useWindowLocation
