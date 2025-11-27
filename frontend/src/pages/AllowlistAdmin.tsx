import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

interface Submission {
  address: string
  timestamp: string
}

const AllowlistAdmin = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [adminKey, setAdminKey] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const savedKey = localStorage.getItem('admin_key')
    if (savedKey) {
      setAdminKey(savedKey)
      loadSubmissions(savedKey)
    } else {
      setLoading(false)
    }
  }, [])

  const loadSubmissions = async (key?: string) => {
    const keyToUse = key || adminKey
    if (!keyToUse) return

    setLoading(true)
    try {
      const response = await fetch(`/api/allowlist/list?key=${keyToUse}`)
      
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.submissions)
        setIsAuthenticated(true)
        localStorage.setItem('admin_key', keyToUse)
      } else {
        toast.error('Invalid admin key')
        setIsAuthenticated(false)
        localStorage.removeItem('admin_key')
      }
    } catch (error) {
      console.error('Failed to load submissions:', error)
      toast.error('Failed to load submissions')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    loadSubmissions(adminKey)
  }

  const copyAllAddresses = () => {
    const addresses = submissions.map(s => s.address).join('\n')
    navigator.clipboard.writeText(addresses)
    setCopied(true)
    toast.success('All addresses copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const exportAsCSV = () => {
    const csv = 'Address,Timestamp\n' + submissions.map(s => `${s.address},${s.timestamp}`).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `allowlist-submissions-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    toast.success('CSV exported!')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 space-y-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Access</h1>
            <p className="text-muted-foreground mt-1">
              Enter your admin key to view submissions
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Admin Key"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading || !adminKey}>
              {loading ? 'Verifying...' : 'Access Admin Panel'}
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Allowlist Submissions</h1>
            <p className="text-muted-foreground mt-1">
              Total submissions: {submissions.length}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={copyAllAddresses} disabled={submissions.length === 0}>
            {copied ? 'Copied!' : 'Copy All Addresses'}
          </Button>
          <Button onClick={exportAsCSV} variant="outline" disabled={submissions.length === 0}>
            Export CSV
          </Button>
          <Button onClick={() => loadSubmissions()} variant="outline">
            Refresh
          </Button>
        </div>

        {submissions.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No submissions yet</p>
          </Card>
        ) : (
          <Card className="p-6">
            <div className="space-y-3">
              {submissions.map((submission, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-mono text-sm">{submission.address}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(submission.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      navigator.clipboard.writeText(submission.address)
                      toast.success('Address copied!')
                    }}
                  >
                    Copy
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card className="p-4 bg-muted/50">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Click "Copy All Addresses" to copy all wallet addresses</li>
            <li>Go to your OpenSea Drop settings</li>
            <li>Add these addresses to your allowlist</li>
            <li>Set the merkle root on your contract</li>
            <li>Or export as CSV for easier management</li>
          </ol>
        </Card>
      </div>
    </div>
  )
}

export default AllowlistAdmin
