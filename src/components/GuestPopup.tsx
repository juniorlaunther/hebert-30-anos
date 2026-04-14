import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Minus, Plus } from 'lucide-react';

interface GuestPopupProps {
  key?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { name: string; message: string }) => void;
}

export default function GuestPopup({ isOpen, onClose, onConfirm }: GuestPopupProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onConfirm({ 
        name: name.trim(), 
        message: message.trim() 
      });
      setName('');
      setMessage('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-sm western-card rounded-xl max-h-[90vh] flex flex-col"
          >
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-center mb-4 sticky top-0 bg-[#3d2616] z-10 pb-2 -mt-2 pt-2">
                <h3 className="text-3xl font-display text-[#f4e4bc]">Confirmar</h3>
                <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-6 h-6 text-[#f4e4bc]" />
                </button>
              </div>
              
              <p className="text-[#d2b48c] font-print text-sm mb-6">
                Digite seu nome para confirmar sua presença na minha festa!
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-print text-[#d2b48c] uppercase mb-1">Seu Nome</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Julieta"
                    autoFocus
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#d2b48c] bg-[#2a1b12] text-[#f4e4bc] placeholder-[#a68b6d] focus:outline-none focus:border-white transition-colors font-print"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-end mb-1">
                    <label className="block text-[10px] font-print text-[#d2b48c] uppercase">Mensagem (opcional)</label>
                    <span className={`text-[9px] font-print ${message.length >= 500 ? 'text-red-400' : 'text-[#d2b48c]'}`}>
                      {message.length}/500
                    </span>
                  </div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                    placeholder="Deixe um recado para o Hebert!"
                    rows={3}
                    maxLength={500}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#d2b48c] bg-[#2a1b12] text-[#f4e4bc] placeholder-[#a68b6d] focus:outline-none focus:border-white transition-colors font-print resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="western-btn w-full py-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <img 
                    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjsSMMbb2gH_4EDbu2S0qIVqM1P1pxdenASN56mTNAzXWm5_qFjCk10ljnzbykmaMf9nHAk1z9GQQ1IUoStYXiJlrpVt977uVZG-vwmIKljrqdidZ8Qp4CqfIxArIjC8WnNqr0DCwUyEtDFkCYw34MjSvkTYj5jwV8ZiSdAi6HJKBOg9Mm8IMkGdS37wtk/w200-h200/check.png" 
                    alt="Check" 
                    className="w-5 h-5 object-contain"
                    referrerPolicy="no-referrer"
                  />
                  Confirmar
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
