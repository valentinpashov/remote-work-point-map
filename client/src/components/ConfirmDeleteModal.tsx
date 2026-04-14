interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[3000] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all animate-in zoom-in-95 duration-200 p-6 text-center relative">
        
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>

        <h3 className="text-xl font-extrabold text-gray-900 mb-2">Delete Workspace?</h3>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          This action cannot be undone. Are you sure you want to permanently delete this location from the map?
        </p>

        <div className="flex gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors text-sm"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all text-sm shadow-md hover:shadow-lg active:scale-95"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}