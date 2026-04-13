/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  updateDoc, 
  doc, 
  addDoc 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, auth, googleProvider, signInWithPopup } from './firebase';
import Invitation from './components/Invitation';
import WhatToWear from './components/WhatToWear';
import AdminPanel from './components/AdminPanel';
import GiftPage from './components/GiftPage';
import GuestPopup from './components/GuestPopup';
import SuccessPopup from './components/SuccessPopup';
import { ViewState } from './types';

export default function App() {
  const [view, setView] = useState<ViewState>('invitation');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/audio/musica.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    audio.onerror = (e) => {
      console.error("Erro ao carregar o arquivo de áudio /audio/musica.mp3. Verifique se o arquivo foi enviado corretamente.", e);
    };

    const attemptPlay = () => {
      if (audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true);
          console.log("Música iniciada com sucesso!");
          window.removeEventListener('click', attemptPlay);
          window.removeEventListener('touchstart', attemptPlay);
          window.removeEventListener('scroll', attemptPlay);
        }).catch(err => {
          console.warn("Autoplay bloqueado pelo navegador. Aguardando interação...", err);
        });
      }
    };

    window.addEventListener('click', attemptPlay);
    window.addEventListener('touchstart', attemptPlay);
    window.addEventListener('scroll', attemptPlay);

    return () => {
      audio.pause();
      window.removeEventListener('click', attemptPlay);
      window.removeEventListener('touchstart', attemptPlay);
      window.removeEventListener('scroll', attemptPlay);
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (view !== 'invitation') {
      setIsFirstLoad(false);
    }
  }, [view]);

  useEffect(() => {
    if (isSuccessPopupOpen) {
      const timer = setTimeout(() => {
        setIsSuccessPopupOpen(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isSuccessPopupOpen]);

  useEffect(() => {
    if (audioRef.current) {
      if (view === 'admin') {
        audioRef.current.pause();
        setIsPlaying(false);
      } else if (view === 'invitation' && !isFirstLoad) {
        // Resume music when coming back from admin, but only if it was playing before or we want it to auto-resume
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => console.log("Could not resume audio automatically", err));
      }
    }
  }, [view, isFirstLoad]);

  const handleConfirmPresence = async (data: { name: string; companions: number; message: string }) => {
    const { name, companions, message } = data;
    
    // Secret code check
    if (name.toUpperCase() === 'PAINEL') {
      setView('admin');
      setIsPopupOpen(false);
      return;
    }

    try {
      // Check if guest exists
      const q = query(collection(db, 'guests'), where('name', '==', name));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Update existing guest
        const guestDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'guests', guestDoc.id), {
          confirmed: true,
          confirmedAt: new Date().toISOString(),
          companions,
          message
        });
      } else {
        // Add new guest if not in list
        await addDoc(collection(db, 'guests'), {
          name,
          confirmed: true,
          confirmedAt: new Date().toISOString(),
          companions,
          message
        });
      }

      setIsSuccessPopupOpen(true);
      setIsPopupOpen(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'guests');
      alert('Ocorreu um erro ao confirmar sua presença. Tente novamente.');
    }
  };

  const openLocation = () => {
    window.open('https://maps.app.goo.gl/9en2MEJJrv4RzLLQ6', '_blank');
  };

  return (
    <div className="min-h-screen w-full font-sans selection:bg-[#8b5e3c]/30 flex flex-col overflow-x-hidden">
      <AnimatePresence mode="popLayout">
        {view === 'invitation' && (
          <Invitation
            key="invitation"
            isConfirmed={false}
            showIntro={isFirstLoad}
            onConfirmClick={() => setIsPopupOpen(true)}
            onLocationClick={openLocation}
            onAttireClick={() => setView('attire')}
            onGiftClick={() => setView('gift')}
          />
        )}

        {view === 'attire' && (
          <WhatToWear 
            key="attire"
            onBack={() => setView('invitation')} 
          />
        )}

        {view === 'gift' && (
          <GiftPage 
            key="gift"
            onBack={() => setView('invitation')} 
          />
        )}

        {view === 'admin' && (
          <AdminPanel 
            key="admin"
            onBack={() => setView('invitation')} 
          />
        )}
      </AnimatePresence>

      <GuestPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={handleConfirmPresence}
      />

      <SuccessPopup 
        isOpen={isSuccessPopupOpen}
        onClose={() => setIsSuccessPopupOpen(false)}
      />

      {/* Music Toggle - Footer Icon Only */}
      {view !== 'admin' && (
        <footer className="w-full py-8 flex justify-center items-center pointer-events-auto">
          <button
            onClick={toggleMusic}
            className="text-[#f4e4bc] opacity-40 hover:opacity-100 transition-opacity p-2"
            aria-label={isPlaying ? "Pausar música" : "Tocar música"}
          >
            {isPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>
        </footer>
      )}
    </div>
  );
}
