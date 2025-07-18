import { CheckCircle } from 'lucide-react';

function ThankYouPage() {


  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center px-4 text-center">
      <CheckCircle className="w-16 h-16 text-orange-500 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Thank You!</h1>
      <p className="text-lg text-gray-600 mb-6">Your response has been submitted successfully.</p>
    </div>
  );
}

export default ThankYouPage;