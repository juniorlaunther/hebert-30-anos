import { useState } from 'react';
import { motion, AnimatePresence, useIsPresent } from 'motion/react';
import { ArrowLeft, Footprints, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface WhatToWearProps {
  key?: string;
  onBack: () => void;
}

const MEN_IMAGES = [
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiTMBR7wjoK1_IH-_jRQUhYjjB0ilF3DF7lyTBq_KuoiWiVt0j91vj4HcS5GL1LlwsWeszsgNB4rZ24BZXVyfYTK5FsESnuY7BMp6gzThieBAXmHlzcfsBl0Dm4NWeWPXuxndoPrt-cc4xec0Gt2bh-pcW9wHRZxBx-J9IX1pfU8PiQh48Wghixpt8Es2k/w384-h640/roupa%20masculina%20(3).jpeg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjrnAnfDJkGOv45BdIMKrTa0D34sgk2FHsvS6MoUT4OtmwJe55VxxBoTJ2FxRrr2xy8WyKFNsYmtXlCqg6K46ciZSwtHpA_nSAV3s482XWHzHMuYz-GlG-0l0IFYKO_cUMEfwfxPsAh73PjgEMzBhhE-iXA7qsyBQXXrXyuKwrMhOhu3_gnvl5he2xINVo/w384-h640/roupa%20masculina%20(4).jpeg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_eOseK6Pjals9eEe6oekwOU0nY9yOmZT7vqTMpM2KaaCM23VB6jkTVw8c7fwJc5SAJh9QH2RAeDK4fl1Z8Z8ducqEjhMqXk70pGi0kYjjkG35WPcVlre9zvgtzoNnBXXqH3YbeDDKtlGIXW1jFBZvq61flWVv1DfOpG_eLfN62LaMWH4MV8Go3SyZslk/w384-h640/roupa%20masculina%20(1).jpeg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4EM6SzaB0dwnDw1s1HTPZ7ibmj9EY575_tM1mXD2rDDMPgB4G7Hvnl88Zf8ljZZh8P6jzxITM4op6wlWKR9KUMZMzLm-X3wiyr9FCFmLcjtxoa_j9y-AjSaZ3E2gf_yxgiTYvjSvn6rggnfyo9RCUfZvPongR8SS_KHmUR-6VgUHuJMi_Qruk4ZhhSB4/w384-h640/roupa%20masculina%20(2).jpeg',
];

const WOMEN_IMAGES = [
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjJQtti4WWJaBP-x8l12nucIcgb8r82YSNL19zecnKrZ3isHMYu_EEqp0f5afHE2wUbCaqM6LZSJeCGm_ETFU_QaFgM1eTjfOeInyc_qIhof-LQE3jim_ZHEvdpR_sqkIJXE34RXk9P026t2IHXISFXAI-Xa_OlV0TcMN_Pe6VCw1dvmpQs7FPM3WZUHB4/w384-h640/roupa%20feminina%20(1).jpeg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhD-Nuj2zZIsct1sKllu1wvpO0uNhkoN8YrbV_zQ1a4X49CAtx51-8_H1KJGTiRCiYoF5Y6Ds1O9FH_URuFB9ygBeHeNbVG2B8464jRhtQCXCT2FXnaIcC8zKnVV7LLjdrArINasYhuj8AbjzGzPN_jtnAoKytrWN3AajhG8DcvnGpykRH_jqMQbRljaIc/w384-h640/roupa%20feminina%20(2).jpeg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjios9H90xwAi5Z7gQDfdJukToTOHJ1YWBcRDaUcO45O49Bp-StsodOE-xfo1fr9w0JRY5XssZqDXn4epiZYZ8CQec6dK5ohvsAfFyJ40WkIt2lM1q_28yuf9yqQ6YTnsZCxRf2f9TE5So6VoYQiOPpi3Rt6jYnAK2MlMV6IM8Q1MqfkoWdoCjlsGFDuSw/w384-h640/roupa%20feminina%20(3).jpeg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhB624lbuyT1643TuShs-YoZisHk-QxCmNyvx07wB3bRftgSMN4stjoqj6_nq0NDuT3OD31a_3oLcATEU-mKTn9XZ_SKXvqHEW7E3hOvDdYHKtTxaxEH-jQ6rGJBu8J07u61Sys_haEGIkuLFWSM6nMAqal121U-Qgasn_WSvU0TpvHA_T1JrDAnlhTFJs/w384-h640/roupa%20feminina%20(4).jpeg',
];

export default function WhatToWear({ onBack }: WhatToWearProps) {
  const [selectedImage, setSelectedImage] = useState<{ url: string; index: number; category: string } | null>(null);
  const isPresent = useIsPresent();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const images = selectedImage.category === 'HOMENS' ? MEN_IMAGES : WOMEN_IMAGES;
    const nextIndex = (selectedImage.index + 1) % images.length;
    setSelectedImage({ ...selectedImage, index: nextIndex, url: images[nextIndex] });
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const images = selectedImage.category === 'HOMENS' ? MEN_IMAGES : WOMEN_IMAGES;
    const prevIndex = (selectedImage.index - 1 + images.length) % images.length;
    setSelectedImage({ ...selectedImage, index: prevIndex, url: images[prevIndex] });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: -50 }}
      variants={containerVariants}
      className={`relative min-h-screen z-40 flex flex-col p-6 ${isPresent ? 'overflow-y-auto' : 'overflow-hidden'}`}
    >
      <motion.button
        variants={itemVariants}
        onClick={onBack}
        className="flex items-center gap-2 text-[#f4e4bc] font-print font-bold mb-8 hover:underline drop-shadow-md sticky top-0 z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </motion.button>

      <div className="flex flex-col items-center text-center pb-0">
        <motion.div 
          variants={itemVariants}
          className="w-24 h-24 western-card rounded-full flex items-center justify-center mb-6"
        >
          <img 
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCQSa0Ahfmsgf9-kIkB22cgKvBj4qrf2jZJENkHFGNBQ-lZ3aXCrsDpoQnYYvZj2j4pRLk8j7hHizvWojx__L7VGlovtdjS2FQ7rv-13kEAp0OE97T7IDy5kvM_Y76b8MdRjSYbXCJlPUXldOo6s9llUmmH9HO_CnXSmCibwrlhvpGpMcx1bZAl6lTesA/w200-h200/man.png" 
            alt="Traje" 
            className="w-14 h-14 object-contain"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-lg text-white font-print font-black uppercase tracking-tighter mb-1 drop-shadow-lg">Venha vestido de</p>
          <motion.h2 
            animate={{
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: "top center" }}
            className="text-5xl font-display text-[#f4e4bc] drop-shadow-lg"
          >
            Traje Country
          </motion.h2>
        </motion.div>

        <div className="space-y-6 w-full max-w-xs mb-12">
          <motion.div variants={itemVariants} className="western-card p-4 rounded-xl flex items-start gap-4 text-left">
            <div className="mt-1">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjsSMMbb2gH_4EDbu2S0qIVqM1P1pxdenASN56mTNAzXWm5_qFjCk10ljnzbykmaMf9nHAk1z9GQQ1IUoStYXiJlrpVt977uVZG-vwmIKljrqdidZ8Qp4CqfIxArIjC8WnNqr0DCwUyEtDFkCYw34MjSvkTYj5jwV8ZiSdAi6HJKBOg9Mm8IMkGdS37wtk/w200-h200/check.png" 
                alt="Check" 
                className="w-5 h-5 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h4 className="font-display text-[#f4e4bc] text-sm mb-1">O que usar:</h4>
              <p className="text-[#d2b48c] font-print text-xs">Camisa xadrez, jeans, botas, chapéu e fivela são muito bem-vindos!</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="western-card p-4 rounded-xl flex items-start gap-4 text-left">
            <div className="mt-1">
              <Footprints className="w-5 h-5 text-[#f4e4bc]" />
            </div>
            <div>
              <h4 className="font-display text-[#f4e4bc] text-sm mb-1">Dica de Calçado:</h4>
              <p className="text-[#d2b48c] font-print text-xs">Estaremos em uma chácara, então prefira calçados confortáveis e resistentes.</p>
            </div>
          </motion.div>
        </div>

        {/* Gallery Sections */}
        <div className="w-full max-w-sm space-y-12">
          {[
            { title: 'HOMENS', images: MEN_IMAGES },
            { title: 'MULHERES', images: WOMEN_IMAGES }
          ].map((section) => (
            <motion.div key={section.title} variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-display text-[#f4e4bc] border-b-2 border-[#f4e4bc]/20 pb-2">{section.title}</h3>
              <div className="grid grid-cols-2 gap-3">
                {section.images.map((url, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedImage({ url, index: idx, category: section.title })}
                    className="aspect-[3/5] western-card rounded-lg overflow-hidden cursor-pointer relative group"
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <img 
                      src={url} 
                      alt={`${section.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-white z-[110]"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X className="w-5 h-5" />
            </button>

            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full text-white z-[110] hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full text-white z-[110] hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-[90vw] max-h-[80vh] aspect-[3/5] western-card rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                alt="Enlarged view"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-[#f4e4bc] font-print text-sm bg-black/50 inline-block px-4 py-1 rounded-full">
                  {selectedImage.category} - {selectedImage.index + 1} / {selectedImage.category === 'HOMENS' ? MEN_IMAGES.length : WOMEN_IMAGES.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CheckItem() {
  return (
    <div className="w-5 h-5 rounded-full bg-[#f4e4bc] flex items-center justify-center">
      <div className="w-2 h-2 bg-[#52331f] rounded-full" />
    </div>
  );
}
