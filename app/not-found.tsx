'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Frown } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted/20">
            <Frown className="h-6 w-6 text-muted-foreground" />
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
            404 - Page Not Found
          </h1>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
