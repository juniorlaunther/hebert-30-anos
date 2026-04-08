import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessPopup({ isOpen, onClose }: SuccessPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 pointer-events-none">
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ 
              scale: 1, 
              rotate: 0, 
              opacity: 1,
              transition: {
                type: "spring",
                damping: 12,
                stiffness: 200
              }
            }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            className="western-card p-8 rounded-2xl max-w-sm w-full relative pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-[#f4e4bc]"
          >
            <button 
              onClick={onClose}
              className="absolute top-2 right-2 p-1 text-[#d2b48c] hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center"
              >
                <img 
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjsSMMbb2gH_4EDbu2S0qIVqM1P1pxdenASN56mTNAzXWm5_qFjCk10ljnzbykmaMf9nHAk1z9GQQ1IUoStYXiJlrpVt977uVZG-vwmIKljrqdidZ8Qp4CqfIxArIjC8WnNqr0DCwUyEtDFkCYw34MjSvkTYj5jwV8ZiSdAi6HJKBOg9Mm8IMkGdS37wtk/w200-h200/check.png" 
                  alt="Sucesso" 
                  className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-display text-[#4ade80] drop-shadow-md"
              >
                Confirmado!
              </motion.h2>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[#f4e4bc] font-print text-lg"
              >
                Sua presença foi registrada com sucesso. Nos vemos na festa!
              </motion.p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
