import { Link } from 'react-router-dom';

export default function Footer() {

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">

          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Remote - Work<span className="text-blue-500">Point</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Discover and share the world's best workspaces for digital nomads and remote professionals.
            </p>
          </div>


        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          <p>© 2026 Remote - WorkPoint. All rights reserved.</p>
          <div className="flex gap-6 uppercase tracking-widest text-[10px]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
      );
}