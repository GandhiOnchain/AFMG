import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useWallet } from '@/hooks/useWallet'
import { toast } from 'sonner'

interface AllowlistSubmissionProps {
  nftName: string | undefined
  mintStartTime: Date
}

export function AllowlistSubmission({ nftName, mintStartTime }: AllowlistSubmissionProps) {
  const { address, connect, isConnected } = useWallet()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useState(() => {
    if (address && localStorage.getItem(`allowlist_submitted_${address}`)) {
      setHasSubmitted(true)
    }
  })

  const handleSubmit = async () => {
    if (!address) {
      toast.error('Please connect your wallet first')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/allowlist/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          timestamp: new Date().toISOString(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setHasSubmitted(true)
        toast.success('Successfully submitted for allowlist!')
        localStorage.setItem(`allowlist_submitted_${address}`, 'true')
      } else {
        toast.error(data.error || 'Submission failed. Please try again.')
        if (data.error === 'Address already submitted') {
          setHasSubmitted(true)
        }
      }
    } catch (error) {
      console.error('Allowlist submission error:', error)
      toast.error('Submission failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const timeUntilMint = mintStartTime.getTime() - Date.now()
  const daysUntilMint = Math.floor(timeUntilMint / (1000 * 60 * 60 * 24))
  const hoursUntilMint = Math.floor((timeUntilMint % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="atomic-pre" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
            <circle cx="75" cy="75" r="8" fill="currentColor"/>
            <circle cx="75" cy="75" r="35" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
            <circle cx="75" cy="75" r="55" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
            <circle cx="75" cy="75" r="70" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
            <circle cx="110" cy="75" r="4" fill="currentColor" opacity="0.6"/>
            <circle cx="40" cy="75" r="4" fill="currentColor" opacity="0.6"/>
            <circle cx="75" cy="20" r="4" fill="currentColor" opacity="0.6"/>
            <circle cx="75" cy="130" r="4" fill="currentColor" opacity="0.6"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#atomic-pre)"/>
      </svg>

      <Card className="w-full max-w-md p-6 space-y-6 relative z-10">
        <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center relative">
          <svg viewBox="0 0 400 400" className="w-full h-full absolute inset-0 opacity-20">
            <defs>
              <pattern id="hexagon-pre" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
                <path d="M30,0 L45,13 L45,39 L30,52 L15,39 L15,13 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="30" cy="0" r="3" fill="currentColor"/>
                <circle cx="45" cy="13" r="3" fill="currentColor"/>
                <circle cx="45" cy="39" r="3" fill="currentColor"/>
                <circle cx="30" cy="52" r="3" fill="currentColor"/>
                <circle cx="15" cy="39" r="3" fill="currentColor"/>
                <circle cx="15" cy="13" r="3" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#hexagon-pre)"/>
          </svg>
          <div className="text-6xl relative z-10">🧬</div>
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">{nftName || 'Loading...'}</h1>
          <p className="text-muted-foreground">
            Limited edition • Free mint • One per wallet
          </p>
        </div>

        <div className="p-4 bg-accent/10 border border-accent rounded-lg space-y-2">
          <p className="text-sm font-medium text-center">Mint starts in</p>
          <p className="text-3xl font-bold text-center font-mono">
            {daysUntilMint}d {hoursUntilMint}h
          </p>
          <p className="text-xs text-muted-foreground text-center">
            {mintStartTime.toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Join the Allowlist</h2>
            <p className="text-sm text-muted-foreground">
              Submit your wallet address to be considered for the allowlist
            </p>
          </div>

          {!isConnected ? (
            <Button 
              onClick={connect} 
              className="w-full"
              size="lg"
            >
              Connect Wallet
            </Button>
          ) : hasSubmitted ? (
            <div className="p-3 bg-accent/10 border border-accent rounded-lg">
              <p className="text-sm text-accent text-center">✓ Wallet submitted for allowlist</p>
              <p className="text-xs text-muted-foreground text-center mt-1">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            </div>
          ) : (
            <>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-mono text-center break-all">
                  {address}
                </p>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Allowlist'}
              </Button>
            </>
          )}
        </div>

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>777 total supply</p>
          <p>Allowlist spots are limited</p>
        </div>
      </Card>
    </div>
  )
}
