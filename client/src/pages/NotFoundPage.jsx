export default function NotFoundPage() {
  return (
    <div className="bg-gray-50">
      <div className="pt-10 min-h-screen flex flex-col items-center px-4">
        <img
          src="/ayna.svg"
          alt="Logo"
          className="w-36 h-auto mb-6 drop-shadow-md"
        />
        <h1 className="text-4xl font-bold text-orange-600 mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600">The page you're looking for doesn't exist.</p>
      </div>
    </div>
    
  );
}
