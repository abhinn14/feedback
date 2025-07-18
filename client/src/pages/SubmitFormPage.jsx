import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormStore } from '../store/useFormStore.js';

export default function SubmitFormPage() {
  const { publicUrl } = useParams();
  const navigate = useNavigate();

  const { currentForm, isLoading, getForm, submitResponse } = useFormStore();
  const [ answers, setAnswers ] = useState({});
  const [ error, setError ] = useState(null);

  // Loading public form by publicUrl when component mounts
  useEffect(() => {
    setError(null);
    getForm(publicUrl).catch((err) => {
      console.error('Unable to load form:', err);
      setError('Unable to load form');
    });
  }, [publicUrl, getForm]);

  const handleChange = (questionId, answerText) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerText }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = Object.entries(answers).map(([questionId, answerText]) => ({
      questionId,
      answerText,
    }));
    try {
      await submitResponse(publicUrl, payload);
      navigate('/thank-you');
    } catch {
      // toast already shown inside store
    }
  };

  if (isLoading) return <div className="p-4 text-center">Loading…</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (!currentForm) return <div className="p-4 text-center text-gray-500">Form not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-orange-600 text-center">{currentForm.title}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentForm.questions.map((q) => (
            <div key={q._id} className="space-y-2">
              <label className="block text-gray-700 font-medium">{q.questionText}</label>

              {q.questionType === 'text' ? (
                <input
                  type="text"
                  value={answers[q._id] || ''}
                  onChange={(e) => handleChange(q._id, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              ) : (
                <div className="space-y-2">
                  {q.options.map((opt, i) => (
                    <label key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={q._id}
                        value={opt}
                        checked={answers[q._id] === opt}
                        onChange={() => handleChange(q._id, opt)}
                        className="accent-orange-500"
                        required
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 disabled:opacity-50"
          >
            {isLoading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}
