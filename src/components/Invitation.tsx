import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Shirt, CheckCircle, Calendar, Clock, Gift } from 'lucide-react';

interface InvitationProps {
  key?: string;
  isConfirmed: boolean;
  showIntro?: boolean;
  onConfirmClick: () => void;
  onLocationClick: () => void;
  onAttireClick: () => void;
  onGiftClick: () => void;
}

export default function Invitation({ 
  isConfirmed, 
  showIntro = true,
  onConfirmClick, 
  onLocationClick, 
  onAttireClick,
  onGiftClick
}: InvitationProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: showIntro ? 0.8 : 0.2,
        delayChildren: showIntro ? 1.2 : 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { scale: 0.5, opacity: 0, y: -50 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 60,
        damping: 12,
        duration: showIntro ? 1.2 : 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: showIntro ? 1.0 : 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full relative flex flex-col items-center justify-center p-6 text-center gap-3"
    >
      {/* Dark Fade-in Overlay - Only on first load */}
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-[100] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Header */}
        <motion.div 
          variants={headerVariants}
          className="flex flex-col items-center mb-2"
        >
          <img 
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiYMbK5Hoiz8_O723dwp9fj8IUz06bQnWQ0t1A_mgbx1jFo_CJQBnHNXGmGcpLLZZEyn-fpoo0KPlxrz87oGJkfltk-qWG3_5wZLHCS-e0AY9so24j1bCMSV7gxbrxgaBzhVktlL7SJMFOdoCdBQuYXPKC-x_F1j4DW5lR5TQRSo7lnmLrWn8ChEBYE7qo/w200-h195/brasao.png"
            alt="Brasão Hebert 30"
            className="w-32 h-auto mb-4 drop-shadow-xl"
            referrerPolicy="no-referrer"
          />
          <p className="flex flex-wrap justify-center gap-[0.1em] mb-2">
            {"Você é meu convidado!".split("").map((char, index) => (
              <motion.span
                key={index}
                animate={{
                  scale: [1, 1.2, 1],
                  color: ["#ffffff", "#f4e4bc", "#ffffff"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.1,
                  ease: "easeInOut"
                }}
                className={`text-white font-print font-black tracking-[0.1em] uppercase text-sm drop-shadow-md ${char === " " ? "mr-2" : ""}`}
              >
                {char}
              </motion.span>
            ))}
          </p>
          <h1 className="text-5xl sm:text-6xl font-display text-[#f4e4bc] leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] whitespace-nowrap flex items-center gap-3">
            <span>Hebert</span>
            <span>30</span>
          </h1>
          <div className="h-1 w-24 bg-[#f4e4bc] mx-auto mt-2 rounded-full shadow-lg" />
        </motion.div>

        {/* Details Card */}
        <motion.div 
          variants={itemVariants}
          className="western-card p-6 rounded-xl w-full max-w-xs space-y-3"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjG-yoEwzJygd1X6Wi6cRPdP_xf0Pzwz_rg1MjcpuP4m8k-e9Vyk-fVM3Q5Eq4lQeWUCtHx04l6kHHT0QMtHESph-LEX94_eagvzJ838EExPH8MW-LK9x2LmPUKxo3KAwxFNpwQUzHiMERX1doucAL8ZN4Mf_bNOh5t_aYvdkHZOuCwwE-zS_ixM-TbwgU/w200-h200/calendar.png" 
                alt="Calendário" 
                className="w-8 h-8 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="text-[10px] font-print text-[#d2b48c] uppercase">Data</p>
              <p className="font-bold text-[#f4e4bc]">02 de Maio de 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhCFM6xMvhXEoVo53yjotboPgd_nWMOuNo-7j2TUc14cUFtBiD97HYNPZcOwym1EIBj098QWJTicJDewxkRd8hK11FP7b1Dpl5gSs35xoQTQ6WMekqID9Ce3cwXWivPjFwUIWyb1rrJiMhOhJfC4W7z5Tjh5Vlf65wGZS92Zze3UKVOcGI_7ktRjeWymwU/w200-h200/clock.png" 
                alt="Relógio" 
                className="w-8 h-8 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="text-[10px] font-print text-[#d2b48c] uppercase">Horário</p>
              <p className="font-bold text-[#f4e4bc]">A partir das 18:00h</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCg_9f4t_6mEArQIfA-J_Bxh9wcxa-7Rssqr3trDaXYTShleN2y2Q6aOU9A0OvTOFONUGI0A3NoJ824mTJPJ8l7cs_Vlh9rUZwd9ZtiAwagVJeF7qtN4ERkubsZNDhWe3HeguxqH1jqBZZ4kGGYWw12hW8QXy7jlqb0PBXO6kn6xe3DkKWl12ixlfj1XY/w200-h200/local.png" 
                alt="Localização" 
                className="w-8 h-8 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="text-[10px] font-print text-[#d2b48c] uppercase">Local</p>
              <p className="font-bold text-[#f4e4bc]">Chácara Família Santiago</p>
              <p className="text-xs text-[#d2b48c]">Jacutinga, MG</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="w-full max-w-xs space-y-3 mb-0">
          <motion.button 
            onClick={onConfirmClick}
            animate={{
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: "top center" }}
            className="western-btn w-full py-5 rounded-xl flex items-center justify-center gap-2 text-lg"
          >
            <img 
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjsSMMbb2gH_4EDbu2S0qIVqM1P1pxdenASN56mTNAzXWm5_qFjCk10ljnzbykmaMf9nHAk1z9GQQ1IUoStYXiJlrpVt977uVZG-vwmIKljrqdidZ8Qp4CqfIxArIjC8WnNqr0DCwUyEtDFkCYw34MjSvkTYj5jwV8ZiSdAi6HJKBOg9Mm8IMkGdS37wtk/w200-h200/check.png" 
              alt="Check" 
              className="w-6 h-6 object-contain"
              referrerPolicy="no-referrer"
            />
            Confirmar Presença
          </motion.button>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onLocationClick}
              className="western-btn flex flex-col items-center justify-center p-4 rounded-xl"
            >
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCg_9f4t_6mEArQIfA-J_Bxh9wcxa-7Rssqr3trDaXYTShleN2y2Q6aOU9A0OvTOFONUGI0A3NoJ824mTJPJ8l7cs_Vlh9rUZwd9ZtiAwagVJeF7qtN4ERkubsZNDhWe3HeguxqH1jqBZZ4kGGYWw12hW8QXy7jlqb0PBXO6kn6xe3DkKWl12ixlfj1XY/w200-h200/local.png" 
                alt="Localização" 
                className="w-8 h-8 mb-1 object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="text-[10px] font-print">Localização</span>
            </button>
            <button 
              onClick={onAttireClick}
              className="western-btn flex flex-col items-center justify-center p-4 rounded-xl"
            >
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCQSa0Ahfmsgf9-kIkB22cgKvBj4qrf2jZJENkHFGNBQ-lZ3aXCrsDpoQnYYvZj2j4pRLk8j7hHizvWojx__L7VGlovtdjS2FQ7rv-13kEAp0OE97T7IDy5kvM_Y76b8MdRjSYbXCJlPUXldOo6s9llUmmH9HO_CnXSmCibwrlhvpGpMcx1bZAl6lTesA/w200-h200/man.png" 
                alt="O que vestir" 
                className="w-8 h-8 mb-1 object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="text-[10px] font-print">O que vestir</span>
            </button>
          </div>

          <button 
            onClick={onGiftClick}
            className="western-btn w-full py-4 rounded-xl flex items-center justify-center gap-2 text-base"
          >
            <img 
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjNiF8QohxPDzc1ah52o6GCGFZsmyPlDBvShjGRjkVD3LV13_gSPFKzOBNlz9edDDkQyINjtsSScTPWVlh6zdr9O8YCGeU-3WMeIinZ1ERAn8do6K8p3sQxiv5TnjEQ4Lo7LpSJU9Ug9PP6MGbYZbbsY6zbpgngn57sQSiRqC8WiOv38uu8Ahxv5yz5kEI/w200-h200/presente.png" 
              alt="Presente" 
              className="w-6 h-6 object-contain"
              referrerPolicy="no-referrer"
            />
            O que presentear
          </button>
        </motion.div>
      </motion.div>
  );
}
