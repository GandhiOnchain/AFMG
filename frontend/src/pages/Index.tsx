import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { useWallet } from '@/hooks/useWallet'
import { useReadContract } from '@/hooks/useReadContract'
import { useWriteContractLifecycle } from '@/hooks/useWriteContractLifecycle'
import { useFarcaster } from '@/lib/providers/FarcasterProvider'
import { getDeployedContract } from '@/blockchain-config'
import { toast } from 'sonner'
import { sdk } from '@farcaster/miniapp-sdk'
import { AllowlistSubmission } from '@/components/AllowlistSubmission'

const NFT_ADDRESS = "0xc909a4e17e5d7f19eb9e91ae30d21a77c7f06074" as const
const CHAIN_ID = 8453
const MINT_START_DATE = new Date('2025-12-01T00:00:00Z')

const Index = () => {
  const { address, connect, isConnected } = useWallet()
  const { isSDKLoaded } = useFarcaster()
  const [currentTime, setCurrentTime] = useState(new Date())
  
  const nftContract = getDeployedContract({ chainId: CHAIN_ID, contractAddress: NFT_ADDRESS })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const { data: totalSupplyData, isLoading: isLoadingSupply } = useReadContract({
    contractAddress: NFT_ADDRESS,
    chainId: CHAIN_ID,
    abi: nftContract.abi,
    functionName: "totalSupply",
    args: [],
  })
  const totalSupply = totalSupplyData as bigint | undefined

  const { data: maxSupplyData } = useReadContract({
    contractAddress: NFT_ADDRESS,
    chainId: CHAIN_ID,
    abi: nftContract.abi,
    functionName: "maxSupply",
    args: [],
  })
  const maxSupply = maxSupplyData as bigint | undefined

  const { data: nameData } = useReadContract({
    contractAddress: NFT_ADDRESS,
    chainId: CHAIN_ID,
    abi: nftContract.abi,
    functionName: "name",
    args: [],
  })
  const nftName = nameData as string | undefined

  const { data: balanceData, refetch: refetchBalance } = useReadContract({
    contractAddress: NFT_ADDRESS,
    chainId: CHAIN_ID,
    abi: nftContract.abi,
    functionName: "balanceOf",
    args: address ? [address as `0x${string}`] : undefined,
    options: {
      enabled: !!address,
    },
  })
  const userBalance = balanceData as bigint | undefined

  const hasMinted = userBalance !== undefined && userBalance > 0n
  const isSoldOut = totalSupply !== undefined && maxSupply !== undefined && totalSupply >= maxSupply
  const mintProgress = totalSupply && maxSupply 
    ? (Number(totalSupply) / Number(maxSupply)) * 100 
    : 0

  const {
    write: mint,
    isLoading: isMinting,
    status: mintStatus,
    txHash,
  } = useWriteContractLifecycle({
    successMessage: 'NFT Minted Successfully!',
    errorMessage: 'Mint failed. Please try again.',
  })

  useEffect(() => {
    if (mintStatus === 'success' && txHash) {
      refetchBalance()
    }
  }, [mintStatus, txHash, refetchBalance])

  const handleMint = async () => {
    if (!address) {
      toast.error('Please connect your wallet first')
      return
    }
    if (hasMinted) {
      toast.error('You have already minted')
      return
    }
    if (isSoldOut) {
      toast.error('Sold out!')
      return
    }

    await mint({
      contractAddress: NFT_ADDRESS,
      chainId: CHAIN_ID,
      abi: nftContract.abi,
      functionName: "mintSeaDrop",
      args: [address as `0x${string}`, 1n],
      value: 0n,
    })
  }

  const handleShare = async () => {
    try {
      await sdk.actions.composeCast({
        text: `Just minted my ${nftName || 'NFT'}! 🧬\n\n${totalSupply}/${maxSupply} minted`,
        embeds: [window.location.href],
      })
    } catch (error) {
      console.error('Failed to compose cast:', error)
    }
  }

  const isMintLive = currentTime >= MINT_START_DATE

  if (!isSDKLoaded || isLoadingSupply) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="atomic-loading" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
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
          <rect width="100%" height="100%" fill="url(#atomic-loading)"/>
        </svg>
        <Card className="w-full max-w-md p-6 space-y-6 relative z-10">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-2 w-full" />
          </div>
          <Skeleton className="h-12 w-full" />
        </Card>
      </div>
    )
  }

  if (!isMintLive) {
    return <AllowlistSubmission nftName={nftName} mintStartTime={MINT_START_DATE} />
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="atomic" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
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
        <rect width="100%" height="100%" fill="url(#atomic)"/>
      </svg>
      <Card className="w-full max-w-md p-6 space-y-6 relative z-10">
        <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center relative">
          <svg viewBox="0 0 400 400" className="w-full h-full absolute inset-0 opacity-20">
            <defs>
              <pattern id="hexagon" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
                <path d="M30,0 L45,13 L45,39 L30,52 L15,39 L15,13 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="30" cy="0" r="3" fill="currentColor"/>
                <circle cx="45" cy="13" r="3" fill="currentColor"/>
                <circle cx="45" cy="39" r="3" fill="currentColor"/>
                <circle cx="30" cy="52" r="3" fill="currentColor"/>
                <circle cx="15" cy="39" r="3" fill="currentColor"/>
                <circle cx="15" cy="13" r="3" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#hexagon)"/>
          </svg>
          <div className="text-6xl relative z-10">🧬</div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{nftName || 'Loading...'}</h1>
          <p className="text-muted-foreground">
            Limited edition • Free mint • One per wallet
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Minted</span>
            <span className="font-mono">
              {totalSupply?.toString() ?? '...'} / {maxSupply?.toString() ?? '777'}
            </span>
          </div>
          <Progress value={mintProgress} />
        </div>

        {hasMinted && (
          <div className="p-3 bg-accent/10 border border-accent rounded-lg">
            <p className="text-sm text-accent">✓ You've already minted your NFT</p>
          </div>
        )}

        {isSoldOut && (
          <div className="p-3 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-sm text-destructive">Sold out!</p>
          </div>
        )}

        {!isConnected ? (
          <Button 
            onClick={connect} 
            className="w-full"
            size="lg"
          >
            Connect Wallet
          </Button>
        ) : (
          <Button
            onClick={handleMint}
            disabled={isMinting || hasMinted || isSoldOut || isLoadingSupply}
            className="w-full"
            size="lg"
          >
            {isMinting ? 'Minting...' : hasMinted ? 'Already Minted' : isSoldOut ? 'Sold Out' : 'Mint NFT'}
          </Button>
        )}

        {mintStatus === 'success' && (
          <Button
            onClick={handleShare}
            variant="outline"
            className="w-full"
          >
            Share on Farcaster
          </Button>
        )}

        {address && (
          <div className="text-xs text-muted-foreground text-center">
            Connected: {address.slice(0, 6)}...{address.slice(-4)}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Index;