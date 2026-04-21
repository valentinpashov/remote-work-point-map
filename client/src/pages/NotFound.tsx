import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">


      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
        Oops! Looks like you're lost.
      </h2>
      <p className="text-slate-500 max-w-md mx-auto mb-10 text-lg leading-relaxed">
        The workspace you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      
    </div>
  );
}