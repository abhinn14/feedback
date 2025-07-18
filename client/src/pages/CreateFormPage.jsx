import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useFormStore } from '../store/useFormStore.js';

export default function CreateFormPage() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { text: '', type: 'text', options: [''] },
  ]);
  const navigate = useNavigate();

  const { createForm, isLoading } = useFormStore();

  const handleAddQuestion = () =>
    setQuestions([
      ...questions,
      { text: '', type: 'text', options: [''] },
    ]);

  const handleChangeText = (i, val) => {
    const q = [...questions];
    q[i].text = val;
    setQuestions(q);
  };

  const handleChangeType = (i, type) => {
    const q = [...questions];
    q[i].type = type;
    if (type === 'text') q[i].options = [''];
    setQuestions(q);
  };

  const handleOptionChange = (qi, oi, val) => {
    const q = [...questions];
    q[qi].options[oi] = val;
    setQuestions(q);
  };

  const handleAddOption = (i) => {
    const q = [...questions];
    q[i].options.push('');
    setQuestions(q);
  };

  const handleRemoveOption = (qi, oi) => {
    const q = [...questions];
    q[qi].options.splice(oi, 1);
    setQuestions(q);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createForm({
      title,
      questions: questions.map(({ text, type, options }) => ({
        questionText: text,
        questionType: type === 'text' ? 'text' : 'mcq',
        options: type === 'text' ? [] : options.filter(Boolean),
      })),
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">
        {/* Back Button */}
        <button
            onClick={() => navigate('/')}
            className="flex items-center text-orange-600 hover:text-orange-700 font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 rounded pb-5"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>

        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Create New Feedback Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Form Title
            </label>
            <input
              type="text"
              placeholder="Enter form title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {questions.map((q, i) => (
            <div
              key={i}
              className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Question {i + 1}
                </h2>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-600"
                  onClick={() =>
                    setQuestions(questions.filter((_, idx) => idx !== i))
                  }
                >
                  Remove
                </button>
              </div>

              <input
                type="text"
                placeholder="Question text"
                value={q.text}
                onChange={(e) => handleChangeText(i, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />

              <select
                value={q.type}
                onChange={(e) => handleChangeType(i, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="text">Text</option>
                <option value="mcq">Mcq</option>
              </select>

              {q.type === 'mcq' && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">Options</h3>
                  {q.options.map((opt, oi) => (
                    <div key={oi} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder={`Option ${oi + 1}`}
                        value={opt}
                        onChange={(e) =>
                          handleOptionChange(i, oi, e.target.value)
                        }
                        className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        required
                      />
                      <button
                        type="button"
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => handleRemoveOption(i, oi)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-orange-500 hover:text-orange-600 font-medium"
                    onClick={() => handleAddOption(i)}
                  >
                    + Add Option
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddQuestion}
            className="flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            + Add Question
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Form'}
          </button>
        </form>
      </div>
    </div>
  );
}
