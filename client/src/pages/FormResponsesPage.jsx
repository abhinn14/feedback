import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Download, Trash2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore.js';
import { useFormStore } from '../store/useFormStore.js';
import Navbar from "../components/Navbar.jsx";
import toast from 'react-hot-toast';

export default function FormResponsesPage() {
  const { formId } = useParams();
  const navigate = useNavigate();

  const { authUser } = useAuthStore();
  const {
    responses,
    summary,
    isLoading,
    isSummarizing,
    fetchResponses,
    currentForm,
    getFormById,
    fetchSummary,
    deleteForm
  } = useFormStore();

  const [error, setError] = useState(null);

  // Loading the form & raw responses
  useEffect(() => {
    setError(null);
    // 1) load form, 2) load responses, then 3) load summary
    getFormById(formId)
      .then(() => fetchResponses(formId))
      .then(() => fetchSummary(formId))
      .catch((err) => {
        console.error('Data loading error:', err);
        setError('Failed to load form, responses, or summary');
      });
  }, [formId, fetchResponses, getFormById]);

  // Fetching AI summary
  useEffect(() => {
    if (currentForm?.questions?.length > 0 && responses.length > 0) {
      fetchSummary(formId);
    }
  }, [currentForm, responses, formId, fetchSummary]);

  const handleDelete = async () => {
    if(window.confirm('Delete this form and all its responses?')) {
      await deleteForm(formId);
      navigate('/', { replace: true });
    }
  };

  // Copying public link
  const handleCopyLink = () => {
    if (!currentForm?.publicUrl) {
      toast.error('Public link not available');
      return;
    }
    const link = `${window.location.origin}/form/${currentForm.publicUrl}`;
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success('Link copied to clipboard!'))
      .catch(() => toast.error('Failed to copy link'));
  };

  // Download CSV
  const handleDownloadCsv = () => {
    if (!Array.isArray(responses) || responses.length === 0) {
      toast.error('No responses to download');
      return;
    }
  
    let headers = [];
    if (currentForm?.questions && Array.isArray(currentForm.questions)) {
      headers = currentForm.questions.map((q) => q.questionText || `Q${i+1}`);
    } else {
      const count = responses[0].answers?.length || 0;
      headers = Array.from({ length: count }, (_, i) => `Question ${i + 1}`);
    }
  
    const rows = responses.map((resp) => {
      const answersArr = Array.isArray(resp.answers) ? resp.answers : [];
      return headers
        .map((_, qi) => {
          let ansText = '';
          if (currentForm?.questions) {
            const q = currentForm.questions[qi];
            const ansObj = answersArr.find((a) => a.questionId === q._id || a.questionId === q.id);
            ansText = ansObj?.answerText ?? '';
          } else {
            ansText = answersArr[qi]?.answerText || '';
          }
          return `"${ansText.replace(/"/g, '""')}"`;
        })
        .join(',');
    });
  
    const csvLines = [
      headers.map((h) => `"${h.replace(/"/g, '""')}"`).join(','),
      ...rows,
    ];
    const csvContent = '\uFEFF' + csvLines.join('\n');
  
    // Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentForm?.title || 'responses'}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  
    toast.success('CSV download should start shortly');
  };

  if (isLoading) return <div className="p-4 text-center">Loading…</div>;
  if (error)   return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-6">
          {/* Top buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-orange-600 hover:text-orange-700 font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 rounded"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            
          </div>

          {/* Form title */}
          <h1 className="text-4xl font-bold text-gray-800">
            {currentForm?.title || 'Form Responses'}
          </h1>

          {/* Buttons */}

          <div className="flex gap-4">
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy Public Link
                  </button>

                  <button
                    onClick={handleDownloadCsv}
                    className="flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download Raw Responses (.csv)
                  </button>

                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-1 text-sm text-orange-600 hover:text-red-600 font-medium focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Form</span>
                  </button>
            </div>


          {/* AI‐Generated Summary */}
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h1>Summary of Customer Feedback (AI-Generated)</h1>
            {isSummarizing ? (
              <p className="text-orange-600">Summarizing responses…</p>
            ) : summary ? (
              <p className="text-gray-800 italic">{summary}</p>
            ) : (
              <p className="text-gray-500">No summary available.</p>
            )}
          </div>

          {/* Raw Responses */}
          {/* {responses.length === 0 ? (
            <p className="text-gray-500">No responses yet.</p>
          ) : (
            <ul className="space-y-4">
              {responses.map((resp, idx) => (
                <li
                  key={resp._id || idx}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <h2 className="font-semibold text-gray-800 mb-2">
                    Response {idx + 1}
                  </h2>
                  <ol className="list-decimal ml-5 space-y-1">
                    {resp.answers.map((a, i) => (
                      <li key={i} className="text-gray-700">
                        {a.answerText}
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ul>
          )} */}
        </div>
      </div>
    </>
  );
}








  