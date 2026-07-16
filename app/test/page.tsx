export default function TestPage() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-lg font-medium">Protected test page</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          If you can see this, you&apos;re signed in. If you&apos;re signed out,
          the Clerk proxy should redirect you to the sign-in page.
        </p>
      </div>
    </div>
  )
}
