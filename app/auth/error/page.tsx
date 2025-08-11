'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link' // Import Link
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CircleAlert } from "lucide-react"

export default function AuthErrorPage() {
  const [error, setError] = useState<string | null>(null)
  const [errorCode, setErrorCode] = useState<string | null>(null)
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const errorParam = searchParams.get('error')
    const errorCodeParam = searchParams.get('error_code')
    
    setError(errorParam || 'Unknown authentication error')
    setErrorCode(errorCodeParam)
  }, [searchParams])
  
  const getErrorDescription = (errorMessage: string): string => {
    // Map common error messages to more user-friendly descriptions
    const errorMap: Record<string, string> = {
      'OAuthSignin': 'There was a problem with the sign-in process.',
      'OAuthCallback': 'The authentication callback failed.',
      'OAuthCreateAccount': 'Could not create a new account.',
      'EmailCreateAccount': 'Could not create a new account with this email.',
      'Callback': 'The authentication callback failed.',
      'OAuthAccountNotLinked': 'This email is already associated with another account.',
      'EmailSignin': 'The email sign-in link is invalid or has expired.',
      'CredentialsSignin': 'The credentials you provided are invalid.',
      'SessionRequired': 'You must be signed in to access this page.',
      'Default': 'An unexpected authentication error occurred.'
    }
    
    return errorMap[errorMessage] || errorMap['Default']
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardContent className="pt-6 pb-8 px-6">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-4">
                <CircleAlert className="text-red-600 dark:text-red-400" size={24} />
              </div>
              
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Authentication Error
              </h2>
              
              <p className="text-sm text-muted-foreground">
                {errorCode && <span className="font-mono text-xs bg-muted px-1 py-0.5 rounded">{errorCode}</span>}
              </p>
            </div>

            <Alert variant="destructive">
              <AlertTitle className="font-medium">
                {error}
              </AlertTitle>
              {error && (
                <AlertDescription className="mt-1">
                  {getErrorDescription(error)}
                </AlertDescription>
              )}
            </Alert>

            <div className="space-y-3">
              <Button 
                className="w-full" 
                asChild
              >
                <Link href="/auth/login">Try Again</Link>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full" 
                asChild
              >
                <Link href="/">Return to Home</Link>
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              If this problem persists, please contact support for assistance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
