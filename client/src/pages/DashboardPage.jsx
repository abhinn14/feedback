import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore.js';
import { useFormStore } from '../store/useFormStore.js';
import Navbar from "../components/Navbar.jsx";

export default function DashboardPage() {
  const { authUser } = useAuthStore();
  const { forms, fetchForms } = useFormStore();



  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  return (<>
      <Navbar/>
        <div className="min-h-screen bg-gray-50 pt-10">
      
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-5xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-gray-600 text-lg mt-1">
                Admin Name: <span className="font-semibold text-gray-800">{authUser?.name || 'N/A'}</span>
          </p>
        
        </div>

        {/* Create New Form */}
        <Link
          to="/create-form"
          className="inline-block bg-orange-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          + Create New Form
        </Link>

          {/* Forms List */}
          <ul className="space-y-3">
            {forms.map((form) => (
              <li key={form._id}>
                <Link
                  to={`/admin/form/${form._id}/responses`}
                  className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <span className="text-lg font-medium text-gray-800">
                    {form.title}
                  </span>
                  <ArrowRight className="text-orange-500 size-5 shrink-0" />
                </Link>
              </li>
            ))}
            {forms.length === 0 && (
              <li className="text-center text-gray-500">
                No forms yet!
              </li>
            )}
          </ul>

      </div>
    </div>
  </>
    
  );
}
