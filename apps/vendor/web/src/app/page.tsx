export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            ONE MEDI
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Your Comprehensive Healthcare Partner
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Welcome to ONE MEDI - Kurnool's most trusted healthcare platform.
            Access medicines, lab tests, scans, and doctor consultations all in one place.
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-2">💊</div>
              <h3 className="font-semibold">Medicines</h3>
            </div>
            <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-2">🧪</div>
              <h3 className="font-semibold">Lab Tests</h3>
            </div>
            <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-2">🏥</div>
              <h3 className="font-semibold">Scans</h3>
            </div>
            <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-2">👨‍⚕️</div>
              <h3 className="font-semibold">Doctors</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
