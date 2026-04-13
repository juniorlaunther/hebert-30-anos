import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  Users, 
  Search,
  UserPlus,
  RefreshCcw
} from 'lucide-react';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, auth, googleProvider, signInWithPopup } from '../firebase';
import { Guest } from '../types';
import GuestDetailPopup from './GuestDetailPopup';

interface AdminPanelProps {
  key?: string;
  onBack: () => void;
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [newGuestName, setNewGuestName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'name' | 'confirmed' | 'unconfirmed'>('name');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'guests'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const guestList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Guest[];
      setGuests(guestList);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'guests');
    });

    return () => unsubscribe();
  }, []);

  const addGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;

    try {
      await addDoc(collection(db, 'guests'), {
        name: newGuestName.trim(),
        confirmed: false
      });
      setNewGuestName('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'guests');
    }
  };

  const toggleConfirmation = async (guest: Guest) => {
    if (!guest.id) return;
    try {
      await updateDoc(doc(db, 'guests', guest.id), {
        confirmed: !guest.confirmed,
        confirmedAt: !guest.confirmed ? new Date().toISOString() : null
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `guests/${guest.id}`);
    }
  };

  const removeGuest = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'guests', id));
      setDeletingId(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `guests/${id}`);
    }
  };

  const sortedGuests = [...guests].sort((a, b) => {
    if (filterType === 'confirmed') {
      if (a.confirmed === b.confirmed) return a.name.localeCompare(b.name);
      return a.confirmed ? -1 : 1;
    }
    if (filterType === 'unconfirmed') {
      if (a.confirmed === b.confirmed) return a.name.localeCompare(b.name);
      return a.confirmed ? 1 : -1;
    }
    return a.name.localeCompare(b.name);
  });

  const filteredGuests = sortedGuests.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const confirmedCount = guests.filter(g => g.confirmed).length;
  const totalWithCompanions = guests.reduce((acc, g) => acc + 1 + (g.companions || 0), 0);
  const confirmedWithCompanions = guests.filter(g => g.confirmed).reduce((acc, g) => acc + 1 + (g.companions || 0), 0);
  const confirmedCompanionsOnly = guests.filter(g => g.confirmed).reduce((acc, g) => acc + (g.companions || 0), 0);

  const handleLogin = async () => {
    const adminEmails = ['canalpapeldetrouxa@gmail.com', 'contatohebertt@gmail.com'];
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Login result email:', result.user.email);
      const userEmail = result.user.email?.toLowerCase();
      if (!userEmail || !adminEmails.includes(userEmail)) {
        alert(`Acesso negado. O e-mail ${result.user.email} não tem permissão de administrador.`);
        await auth.signOut();
      }
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      if (error.code === 'auth/unauthorized-domain') {
        alert('Erro: Domínio não autorizado. Você precisa adicionar "convite.hebertt.com" na lista de domínios autorizados no Console do Firebase (Autenticação > Configurações).');
      } else if (error.code === 'auth/popup-blocked') {
        alert('O popup de login foi bloqueado pelo seu navegador. Por favor, permita popups para este site.');
      } else {
        alert('Erro ao tentar realizar o login com Google. Verifique se o domínio está autorizado no Firebase.');
      }
    }
  };

  const isAdmin = auth.currentUser?.email?.toLowerCase() ? 
    ['canalpapeldetrouxa@gmail.com', 'contatohebertt@gmail.com'].includes(auth.currentUser.email.toLowerCase()) : 
    false;

  if (!isAdmin) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative h-screen w-full flex flex-col items-center justify-center p-6 text-center"
      >
        <div className="western-card p-8 rounded-2xl max-w-sm w-full space-y-6">
          <div className="w-20 h-20 bg-[#f4e4bc]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-[#f4e4bc]" />
          </div>
          <h2 className="text-2xl font-display text-[#f4e4bc]">Acesso Restrito</h2>
          <p className="text-[#d2b48c] font-print text-sm">
            Esta área é reservada apenas para o administrador do evento.
          </p>
          <button
            onClick={handleLogin}
            className="western-btn w-full py-3 rounded-xl flex items-center justify-center gap-2"
          >
            Entrar com Google
          </button>
          <button
            onClick={onBack}
            className="text-[#d2b48c] font-print text-xs hover:underline"
          >
            Voltar para o Convite
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-screen w-full flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="bg-[#52331f] p-4 text-[#f4e4bc] shadow-md flex items-center justify-between border-b-2 border-white/20">
        <button onClick={onBack} className="flex items-center gap-2 font-display text-sm">
          <ArrowLeft className="w-5 h-5" />
          Sair
        </button>
        
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          <span className="font-display text-sm">Gestão</span>
        </div>
      </div>

      {/* Stats & Search */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="western-card p-4 rounded-xl">
            <p className="text-[10px] text-[#d2b48c] uppercase font-print">Total Convites</p>
            <p className="text-2xl font-display text-[#f4e4bc]">{guests.length}</p>
            <p className="text-[10px] text-[#d2b48c] font-print">({totalWithCompanions} pessoas)</p>
          </div>
          <div className="western-card p-4 rounded-xl">
            <p className="text-[10px] text-[#d2b48c] uppercase font-print">Confirmados</p>
            <p className="text-2xl font-display text-[#4ade80]">{confirmedWithCompanions}</p>
            <p className="text-[10px] text-[#4ade80] font-print">({confirmedCompanionsOnly} acompanhantes)</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#d2b48c]" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#2a1b12] border-2 border-[#d2b48c] text-[#f4e4bc] placeholder-[#a68b6d] focus:outline-none focus:border-white font-print"
            />
          </div>

          <div className="flex gap-1 justify-between">
            <button 
              onClick={() => setFilterType('name')}
              className={`flex-1 px-1 py-2 rounded-lg font-print text-[10px] transition-all border-2 ${filterType === 'name' ? 'bg-[#f4e4bc] text-[#52331f] border-[#f4e4bc]' : 'bg-transparent text-[#d2b48c] border-[#d2b48c]'}`}
            >
              Nome (A-Z)
            </button>
            <button 
              onClick={() => setFilterType('confirmed')}
              className={`flex-1 px-1 py-2 rounded-lg font-print text-[10px] transition-all border-2 ${filterType === 'confirmed' ? 'bg-[#4ade80] text-[#52331f] border-[#4ade80]' : 'bg-transparent text-[#d2b48c] border-[#d2b48c]'}`}
            >
              Confirmados
            </button>
            <button 
              onClick={() => setFilterType('unconfirmed')}
              className={`flex-1 px-1 py-2 rounded-lg font-print text-[10px] transition-all border-2 ${filterType === 'unconfirmed' ? 'bg-[#f87171] text-[#52331f] border-[#f87171]' : 'bg-transparent text-[#d2b48c] border-[#d2b48c]'}`}
            >
              Pendentes
            </button>
          </div>
        </div>
      </div>

      {/* Guest List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-[#d2b48c]">
            <RefreshCcw className="w-8 h-8 animate-spin mb-2" />
            <p className="font-print">Carregando...</p>
          </div>
        ) : filteredGuests.length === 0 ? (
          <div className="text-center py-12 text-[#d2b48c]">
            <Users className="w-12 h-12 mx-auto mb-2 opacity-20" />
            <p className="font-print">Nenhum encontrado.</p>
          </div>
        ) : (
          filteredGuests.map((guest) => (
            <div 
              key={guest.id}
              onClick={() => setSelectedGuest(guest)}
              className={`western-card p-4 rounded-xl flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform ${guest.confirmed ? 'ring-2 ring-green-500' : ''}`}
            >
              <div className="flex-1 min-w-0 mr-4">
                <p className={`font-bold truncate ${guest.confirmed ? 'text-[#f4e4bc]' : 'text-[#d2b48c]'}`}>
                  {guest.name}
                </p>
                {guest.confirmed && (
                  <div className="space-y-1">
                    <p className="text-[10px] text-[#4ade80] font-print uppercase">Confirmado</p>
                    {guest.companions !== undefined && guest.companions > 0 && (
                      <p className="text-[10px] text-[#d2b48c] font-print">+{guest.companions} acompanhante(s)</p>
                    )}
                    {guest.message && (
                      <p className="text-[10px] text-[#d2b48c] font-print italic line-clamp-1">"{guest.message}"</p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {deletingId === guest.id ? (
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => removeGuest(guest.id!)}
                      className="p-2 bg-red-500 text-white rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingId(null)}
                      className="p-2 bg-white/10 text-white rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => toggleConfirmation(guest)}
                      className={`p-2 rounded-lg transition-colors ${guest.confirmed ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-[#d2b48c]'}`}
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setDeletingId(guest.id!)}
                      className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Guest Form */}
      <div className="p-4 bg-[#52331f] border-t border-white/20 shadow-lg">
        <form onSubmit={addGuest} className="flex gap-2">
          <input
            type="text"
            placeholder="Novo convidado..."
            value={newGuestName}
            onChange={(e) => setNewGuestName(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-[#2a1b12] border-2 border-[#d2b48c] text-[#f4e4bc] placeholder-[#a68b6d] focus:outline-none focus:border-white font-print"
          />
          <button
            type="submit"
            disabled={!newGuestName.trim()}
            className="western-btn p-3 rounded-xl disabled:opacity-50"
          >
            <UserPlus className="w-6 h-6" />
          </button>
        </form>
      </div>

      <GuestDetailPopup 
        guest={selectedGuest}
        onClose={() => setSelectedGuest(null)}
      />
    </motion.div>
  );
}
