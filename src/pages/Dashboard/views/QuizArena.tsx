import React, { useState } from 'react';
import { Timer, AlertCircle } from 'lucide-react';

export default function QuizArena() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const questions: any[] = [];

  if (questions.length === 0) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pt-8">
        <h1 className="text-4xl font-black uppercase mb-2 text-center">Quiz Arena</h1>
        <div className="bg-white border-4 border-black border-dashed rounded-xl p-12 text-center text-gray-500 font-bold">
          No active quizzes at the moment.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pt-8">
      
      {/* Header Info */}
      <div className="bg-white border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black uppercase">React Fundamentals Quiz</h1>
          <p className="font-bold text-gray-500">Question {currentQuestion + 1} of {questions.length}</p>
        </div>
        <div className="bg-red-100 border-4 border-black rounded-xl px-4 py-2 flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Timer className="w-6 h-6 text-red-600" />
          <span className="font-black text-xl text-red-600">14:59</span>
        </div>
      </div>

      {/* Main Question Area */}
      <div className="bg-yellow-300 border-4 border-black rounded-3xl p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-black leading-tight mb-10">
          {questions[currentQuestion].q}
        </h2>

        <div className="space-y-4">
          {questions[currentQuestion].options.map((opt, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedOption(idx)}
              className={`border-4 border-black rounded-xl p-5 cursor-pointer font-bold text-lg flex items-center gap-4 transition-all ${
                selectedOption === idx 
                  ? 'bg-black text-white translate-x-2' 
                  : 'bg-white hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center shrink-0 ${
                selectedOption === idx ? 'border-white text-white' : 'border-black text-black'
              }`}>
                {String.fromCharCode(65 + idx)}
              </div>
              {opt}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex justify-between items-center">
        <button className="flex items-center gap-2 font-black uppercase text-gray-500 hover:text-black transition-colors px-4 py-2">
          <AlertCircle className="w-5 h-5" /> Flag for review
        </button>
        <button 
          disabled={selectedOption === null}
          className="bg-blue-600 text-white border-4 border-black px-10 py-4 rounded-xl font-black uppercase tracking-wider text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestion === questions.length - 1 ? 'Submit Test' : 'Next Question'}
        </button>
      </div>

    </div>
  );
}
