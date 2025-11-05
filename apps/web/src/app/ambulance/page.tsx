export default function AmbulancePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Ambulance Service</h1>
      <p className="text-muted-foreground mb-4">24/7 Emergency ambulance service in Kurnool</p>
      <div className="bg-red-100 dark:bg-red-900/20 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">Emergency Call</h2>
        <p className="text-lg">📞 Call: 108 or 102</p>
      </div>
    </div>
  );
}
