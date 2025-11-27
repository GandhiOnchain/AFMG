import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'

interface FarcasterContextType {
  isSDKLoaded: boolean
}

const FarcasterContext = createContext<FarcasterContextType>({
  isSDKLoaded: false,
})

export function FarcasterProvider({ children }: { children: ReactNode }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false)

  useEffect(() => {
    const init = async () => {
      setIsSDKLoaded(true)
      
      sdk.actions.ready().catch(() => {})
    }

    init()
  }, [])

  return (
    <FarcasterContext.Provider value={{ isSDKLoaded }}>
      {children}
    </FarcasterContext.Provider>
  )
}

export function useFarcaster() {
  return useContext(FarcasterContext)
}
