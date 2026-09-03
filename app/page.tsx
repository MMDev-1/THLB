export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background px-6 py-24">
      <div className="text-center space-y-6 max-w-lg">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">The Hoodie LB</h1>
        <p className="text-base text-muted">Coming soon — cozy comfort, delivered to your door.</p>
        <div className="inline-flex items-center rounded-full bg-accent/20 px-4 py-2 text-sm font-medium text-accent-foreground">
          Store launching soon
        </div>
      </div>
    </div>
  );
}
