import { motion, AnimatePresence } from 'motion/react';
import { X, User, Users, MessageSquare, Calendar } from 'lucide-react';
import { Guest } from '../types';

interface GuestDetailPopupProps {
  guest: Guest | null;
  onClose: () => void;
}

export default function GuestDetailPopup({ guest, onClose }: GuestDetailPopupProps) {
  if (!guest) return null;

  return (
    <AnimatePresence>
      {guest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-md western-card rounded-2xl shadow-2xl border-2 border-[#f4e4bc] max-h-[90vh] flex flex-col"
          >
            <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#f4e4bc]/10 rounded-lg">
                    <User className="w-6 h-6 text-[#f4e4bc]" />
                  </div>
                  <h3 className="text-2xl font-display text-[#f4e4bc] truncate max-w-[200px]">
                    {guest.name}
                  </h3>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-[#d2b48c]" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-[#4ade80]" />
                    <span className="text-[10px] font-print text-[#d2b48c] uppercase">Status</span>
                  </div>
                  <p className={`font-bold ${guest.confirmed ? 'text-[#4ade80]' : 'text-red-400'}`}>
                    {guest.confirmed ? 'Confirmado' : 'Pendente'}
                  </p>
                </div>
              </div>

              {guest.confirmedAt && (
                <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-[#d2b48c]" />
                    <span className="text-[10px] font-print text-[#d2b48c] uppercase">Data da Confirmação</span>
                  </div>
                  <p className="text-sm text-[#f4e4bc]">
                    {new Date(guest.confirmedAt).toLocaleString('pt-BR')}
                  </p>
                </div>
              )}

              <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-[#d2b48c]" />
                  <span className="text-[10px] font-print text-[#d2b48c] uppercase">Mensagem</span>
                </div>
                <p className="text-[#f4e4bc] font-print text-sm italic leading-relaxed break-words">
                  {guest.message ? `"${guest.message}"` : "Nenhuma mensagem deixada."}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
