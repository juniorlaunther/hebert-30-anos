import { motion } from 'motion/react';
import { ArrowLeft, Copy, ExternalLink, Gift as GiftIcon } from 'lucide-react';
import { useState } from 'react';

interface GiftPageProps {
  key?: string;
  onBack: () => void;
}

export default function GiftPage({ onBack }: GiftPageProps) {
  const [copied, setCopied] = useState(false);
  const pixKey = "140.142.716-25";

  const copyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const giftSuggestions = [
    {
      name: "Bota Western Masculina",
      image: "https://picsum.photos/seed/boot/300/300",
      url: "https://www.google.com/search?q=bota+western+masculina"
    },
    {
      name: "Chapéu de Cowboy",
      image: "https://picsum.photos/seed/hat/300/300",
      url: "https://www.google.com/search?q=chapeu+cowboy+feltro"
    },
    {
      name: "Cinto com Fivela",
      image: "https://picsum.photos/seed/belt/300/300",
      url: "https://www.google.com/search?q=cinto+fivela+country"
    },
    {
      name: "Camisa Xadrez",
      image: "https://picsum.photos/seed/shirt/300/300",
      url: "https://www.google.com/search?q=camisa+xadrez+masculina"
    },
    {
      name: "Perfume Masculino",
      image: "https://picsum.photos/seed/perfume/300/300",
      url: "https://www.google.com/search?q=perfume+masculino+importado"
    },
    {
      name: "Jaqueta de Couro",
      image: "https://picsum.photos/seed/jacket/300/300",
      url: "https://www.google.com/search?q=jaqueta+couro+masculina"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: -50 }}
      variants={containerVariants}
      className="relative flex-1 z-40 flex flex-col p-6 overflow-y-auto no-scrollbar"
    >
      <motion.button
        variants={itemVariants}
        onClick={onBack}
        className="flex items-center gap-2 text-[#f4e4bc] font-display text-sm mb-8 self-start"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </motion.button>

      <div className="flex flex-col items-center text-center pb-10">
        <motion.div 
          variants={itemVariants}
          className="w-20 h-20 western-card rounded-full flex items-center justify-center mb-6"
        >
          <img 
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjNiF8QohxPDzc1ah52o6GCGFZsmyPlDBvShjGRjkVD3LV13_gSPFKzOBNlz9edDDkQyINjtsSScTPWVlh6zdr9O8YCGeU-3WMeIinZ1ERAn8do6K8p3sQxiv5TnjEQ4Lo7LpSJU9Ug9PP6MGbYZbbsY6zbpgngn57sQSiRqC8WiOv38uu8Ahxv5yz5kEI/w200-h200/presente.png" 
            alt="Presente" 
            className="w-12 h-12 object-contain"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.h2 
          variants={itemVariants}
          className="text-4xl font-display text-[#f4e4bc] mb-2"
        >
          O que presentear
        </motion.h2>
        
        <motion.p 
          variants={itemVariants}
          className="text-[#d2b48c] font-print text-sm mb-8 max-w-xs"
        >
          Sua presença é o meu maior presente, mas se desejar me agraciar, aqui estão algumas sugestões.
        </motion.p>

        {/* Sizes Info */}
        <motion.div 
          variants={itemVariants}
          className="western-card p-6 rounded-xl w-full max-w-sm mb-6"
        >
          <h3 className="font-display text-[#f4e4bc] mb-4 text-lg">Tamanhos do Hebert</h3>
          <div className="grid grid-cols-3 gap-4 font-print">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#d2b48c] uppercase">Camiseta</span>
              <span className="text-xl font-bold">M</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#d2b48c] uppercase">Calça</span>
              <span className="text-xl font-bold">40</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#d2b48c] uppercase">Tênis</span>
              <span className="text-xl font-bold">40</span>
            </div>
          </div>
        </motion.div>

        {/* PIX Section */}
        <motion.div 
          variants={itemVariants}
          className="western-card p-6 rounded-xl w-full max-w-sm mb-8"
        >
          <h3 className="font-display text-[#f4e4bc] mb-2 text-lg">Presente em Dinheiro</h3>
          <p className="text-xs text-[#d2b48c] font-print mb-4">Se preferir, você pode enviar um PIX:</p>
          <div 
            onClick={copyPix}
            className="bg-[#2a1b12] p-4 rounded-lg flex items-center justify-between cursor-pointer border-2 border-dashed border-[#d2b48c] hover:border-white transition-colors"
          >
            <span className="font-print text-sm">{pixKey}</span>
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-[#d2b48c]" />}
          </div>
          {copied && <p className="text-[10px] text-green-500 mt-2 font-print">Chave copiada!</p>}
        </motion.div>

        {/* Gift Suggestions Grid */}
        <motion.div variants={itemVariants} className="w-full max-w-sm">
          <h3 className="font-display text-[#f4e4bc] mb-6 text-lg">Sugestões de Presentes</h3>
          <div className="grid grid-cols-2 gap-4">
            {giftSuggestions.map((gift, index) => (
              <a 
                key={index}
                href={gift.url}
                target="_blank"
                rel="noopener noreferrer"
                className="western-card p-3 rounded-xl flex flex-col items-center gap-3 group transition-transform active:scale-95"
              >
                <div className="w-full aspect-square rounded-lg overflow-hidden bg-black/20">
                  <img 
                    src={gift.image} 
                    alt={gift.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-print leading-tight">{gift.name}</span>
                  <ExternalLink className="w-3 h-3 text-[#d2b48c]" />
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Check({ className }: { className?: string }) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
