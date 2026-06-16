export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-gray-500">Page introuvable</p>
      <a href="/" className="mt-4 text-blue-500 underline">
        Retour à l'accueil
      </a>
    </div>
  );
}