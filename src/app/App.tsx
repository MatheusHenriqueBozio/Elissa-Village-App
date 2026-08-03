import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart, MessageCircle, Send, Bookmark, Phone, MapPin, Calendar,
  ChevronLeft, Search, Plus, Home, Users, X, AlertTriangle,
  Smile, Paperclip, Bell, MoreHorizontal, PhoneCall, Video, Camera, Image as GalleryIcon,
} from "lucide-react";

// ── Design tokens ──────────────────────────────────────────────────
const P = "#C4665A";
const PL = "#F5E8E6";

// ── Unsplash photos ────────────────────────────────────────────────
const PH = {
  lydia:   "https://images.unsplash.com/photo-1758686254563-5c5ab338c8b9?w=400&h=400&fit=crop",
  emerson: "https://images.unsplash.com/photo-1758691030490-fe1cb6c972ce?w=400&h=400&fit=crop",
  jocelyn: "https://images.unsplash.com/photo-1446161543652-83eaa65fddab?w=400&h=400&fit=crop",
  mira:    "https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?w=400&h=400&fit=crop",
  hanna:   "https://images.unsplash.com/photo-1758686254593-7c4cd55b2621?w=400&h=400&fit=crop",
  martin:  "https://images.unsplash.com/photo-1667312147803-4b2437b5485e?w=400&h=400&fit=crop",
  act1:    "https://images.unsplash.com/photo-1764173039543-f9f197744e1b?w=700&h=700&fit=crop",
  act2:    "https://images.unsplash.com/photo-1758691031288-eda755f22a94?w=700&h=700&fit=crop",
  act3:    "https://images.unsplash.com/photo-1758691031197-fee3ccad4d68?w=700&h=700&fit=crop",
  act4:    "https://images.unsplash.com/photo-1758691031336-054e6f00acb8?w=700&h=700&fit=crop",
  act5:    "https://images.unsplash.com/photo-1773227059808-b47dd1c1774c?w=700&h=700&fit=crop",
};

// ── Data ───────────────────────────────────────────────────────────
const RESIDENTS = [
  {
    id: 1, name: "Lydia Rosser", email: "lydiarosser@email.com",
    phone: "(65) 99940-4144", city: "Cuiabá / MT", birthdate: "02/01/1977",
    photo: PH.lydia, notes: "Necessita de acompanhamento para locomoção.", status: "Saudável",
    family: [
      { name: "José Luiz", rel: "Filho", photo: PH.emerson },
      { name: "Fernanda", rel: "Filha", photo: PH.jocelyn },
      { name: "Ricardo", rel: "Filho", photo: PH.martin },
      { name: "Susana", rel: "Neta", photo: PH.mira },
      { name: "Marta", rel: "Neta", photo: PH.hanna },
    ],
    grid: [PH.act1, PH.act2, PH.act3, PH.act4, PH.act5, PH.act2],
  },
  {
    id: 2, name: "Emerson Gouse", email: "emerson@email.com",
    phone: "(65) 99123-5678", city: "Cuiabá / MT", birthdate: "15/03/1952",
    photo: PH.emerson, notes: "Ativo e participativo nas atividades.", status: "Saudável",
    family: [{ name: "Ana Paula", rel: "Filha", photo: PH.jocelyn }, { name: "Bruno", rel: "Filho", photo: PH.martin }],
    grid: [PH.act2, PH.act3, PH.act4, PH.act1],
  },
  {
    id: 3, name: "Jocelyn Geidt", email: "jocelyn@email.com",
    phone: "(65) 99234-5678", city: "Várzea Grande / MT", birthdate: "08/07/1948",
    photo: PH.jocelyn, notes: "Participa de atividades físicas regularmente.", status: "Em Observação",
    family: [{ name: "Carlos", rel: "Filho", photo: PH.emerson }],
    grid: [PH.act3, PH.act4, PH.act5],
  },
  {
    id: 4, name: "Mira Dokidis", email: "mira@email.com",
    phone: "(65) 99345-6789", city: "Cuiabá / MT", birthdate: "22/11/1955",
    photo: PH.mira, notes: "Dieta especial e acompanhamento nutricional.", status: "Saudável",
    family: [{ name: "Diana", rel: "Filha", photo: PH.jocelyn }],
    grid: [PH.act4, PH.act5, PH.act1, PH.act2],
  },
  {
    id: 5, name: "Hanna Kenter", email: "hanna@email.com",
    phone: "(65) 99456-7890", city: "Rondonópolis / MT", birthdate: "10/04/1950",
    photo: PH.hanna, notes: "Fisioterapia às terças e quintas.", status: "Em Tratamento",
    family: [],
    grid: [PH.act5, PH.act1, PH.act2],
  },
  {
    id: 6, name: "Martin Lupin", email: "martin@email.com",
    phone: "(65) 99567-8901", city: "Cuiabá / MT", birthdate: "30/06/1945",
    photo: PH.martin, notes: "Boa recuperação pós-cirurgia.", status: "Em Tratamento",
    family: [{ name: "Eva", rel: "Filha", photo: PH.mira }],
    grid: [PH.act1, PH.act3, PH.act5],
  },
  {
    id: 7, name: "Paty Batista", email: "paty@email.com",
    phone: "(65) 99678-9012", city: "Cuiabá / MT", birthdate: "14/02/1958",
    photo: PH.jocelyn, notes: "Muito animada e participativa.", status: "Saudável",
    family: [],
    grid: [PH.act2, PH.act4],
  },
  {
    id: 8, name: "Omar Philips", email: "omar@email.com",
    phone: "(65) 99789-0123", city: "Cuiabá / MT", birthdate: "20/09/1949",
    photo: PH.emerson, notes: "Atividades regulares e boa saúde.", status: "Saudável",
    family: [],
    grid: [PH.act3, PH.act5],
  },
  {
    id: 9, name: "Jordana Madsen", email: "jordana@email.com",
    phone: "(65) 99890-1234", city: "Cuiabá / MT", birthdate: "05/05/1953",
    photo: PH.mira, notes: "Ativa e bem-humorada.", status: "Saudável",
    family: [],
    grid: [PH.act1, PH.act4],
  },
];

type Resident = typeof RESIDENTS[0];

const STORIES_DATA = [
  { id: 1, resident: RESIDENTS[0], photos: [PH.act1, PH.act3] },
  { id: 2, resident: RESIDENTS[1], photos: [PH.act2] },
  { id: 3, resident: RESIDENTS[2], photos: [PH.act4] },
  { id: 4, resident: RESIDENTS[3], photos: [PH.act5] },
  { id: 5, resident: RESIDENTS[4], photos: [PH.act5] },
  { id: 6, resident: RESIDENTS[5], photos: [PH.act1] },
];

const POSTS_INIT = [
  { id: 1, resident: RESIDENTS[0], caregiver: "Equipe de Atividades", time: "2h atrás", photo: PH.act1, caption: "Lydia passou uma tarde maravilhosa no jardim com as amigas! Ela estava radiante e cheia de histórias para contar. 🌸", likes: 12, comments: 3, liked: false, bookmarked: false },
  { id: 2, resident: RESIDENTS[1], caregiver: "Equipe de Atividades", time: "4h atrás", photo: PH.act2, caption: "Tarde de xadrez com os amigos! Emerson mostrou que ainda tem muita estratégia. ♟️", likes: 8, comments: 2, liked: false, bookmarked: false },
  { id: 3, resident: RESIDENTS[0], caregiver: "Médico(a)", time: "1 dia atrás", photo: PH.act3, caption: "Consulta de rotina concluída com sucesso. Lydia está muito bem! ✅", likes: 15, comments: 5, liked: false, bookmarked: true },
  { id: 4, resident: RESIDENTS[2], caregiver: "Equipe de Atividades", time: "2 dias atrás", photo: PH.act4, caption: "Jocelyn adorou a atividade da tarde. Muito animada! 🎉", likes: 6, comments: 1, liked: false, bookmarked: false },
  { id: 5, resident: RESIDENTS[4], caregiver: "Fisioterapia", time: "3 dias atrás", photo: PH.act5, caption: "Hanna se destacou na sessão de fisioterapia. Progresso incrível! 💪", likes: 20, comments: 7, liked: false, bookmarked: false },
];

const CAREGIVERS_DATA = [
  { id: 1, name: "Médico(a)", role: "Setor da Saúde", status: "online" as const, lastMsg: "Lorem ipsum dolor sit amet...", time: "17:51 PM", unread: 2 },
  { id: 2, name: "Enfermagem", role: "Setor da Saúde", status: "online" as const, lastMsg: "Lorem ipsum dolor sit amet...", time: "17:51 PM", unread: 0 },
  { id: 3, name: "Assuntos Financeiros", role: "Setor Financeiro", status: "offline" as const, lastMsg: "Lorem ipsum dolor sit amet...", time: "17:51 PM", unread: 1 },
  { id: 4, name: "Administrativo", role: "Setor Administrativo", status: "online" as const, lastMsg: "Lorem ipsum dolor sit amet...", time: "17:51 PM", unread: 0 },
];

type Caregiver = typeof CAREGIVERS_DATA[0];
interface Message { id: number; text: string; mine: boolean; time: string; }

const MSGS_INIT: Record<number, Message[]> = {
  1: [
    { id: 1, text: "Olá!", mine: true, time: "17:45" },
    { id: 2, text: "Adipliscing elit, dolore magna", mine: true, time: "17:46" },
    { id: 3, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in molestie quam,", mine: false, time: "17:48" },
    { id: 4, text: "Elit dolore magna!", mine: true, time: "17:50" },
    { id: 5, text: "Dolor sit amet!", mine: false, time: "17:51" },
  ],
  2: [
    { id: 1, text: "Bom dia! Como está a Lydia hoje?", mine: true, time: "09:00" },
    { id: 2, text: "Bom dia! Ela está muito bem, tomou o café da manhã e está animada para as atividades de hoje.", mine: false, time: "09:15" },
  ],
  3: [
    { id: 1, text: "Qual o vencimento da próxima mensalidade?", mine: true, time: "14:00" },
    { id: 2, text: "O vencimento é no dia 15. Posso enviar o boleto por email, se preferir.", mine: false, time: "14:30" },
  ],
  4: [
    { id: 1, text: "Preciso atualizar os dados cadastrais da Lydia.", mine: true, time: "10:00" },
    { id: 2, text: "Pode trazer pessoalmente ou enviar os documentos digitalmente para admin@elissavillage.com.br", mine: false, time: "10:20" },
  ],
};

const AUTO_REPLIES: Record<number, string[]> = {
  1: ["Entendido! Vou verificar agora.", "Perfeito, estou anotando.", "Em breve retorno com mais informações."],
  2: ["Anotado! Obrigada pelo contato.", "Vou passar para a equipe.", "Fico à disposição para qualquer dúvida."],
  3: ["Vou verificar no sistema.", "Pode deixar que cuido disso.", "Confirmo em instantes."],
  4: ["Recebido! Providencio agora.", "Obrigado pelo aviso.", "Qualquer dúvida estou aqui."],
};

const EMERGENCY_CONTACTS = [
  { id: 1, name: "José Luiz Rodrigues Freitas", relationship: "Filho", phone: "(65) 99111-1111" },
  { id: 2, name: "Fernanda Freitas", relationship: "Filha", phone: "(65) 99222-2222" },
  { id: 3, name: "Ricardo Rodrigues Freitas", relationship: "Filho", phone: "(65) 99333-3333" },
  { id: 4, name: "Susana Lima", relationship: "Neta", phone: "(65) 99444-4444" },
];

type ScreenType = "home" | "profile" | "search" | "chatList" | "chat";

// ── Elissa Tree logo ────────────────────────────────────────────────
function ElissaTree({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.08} viewBox="0 0 60 65" fill="none">
      <line x1="30" y1="58" x2="30" y2="28" stroke={P} strokeWidth="2" strokeLinecap="round"/>
      <path d="M30 46 Q22 40 17 36" stroke={P} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M30 41 Q38 35 43 32" stroke={P} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M30 36 Q24 31 20 25" stroke={P} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M30 34 Q36 29 40 24" stroke={P} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M30 30 Q27 24 26 18" stroke={P} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M30 29 Q33 23 34 17" stroke={P} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="15" cy="35" rx="4" ry="2.5" fill={P} transform="rotate(-25 15 35)"/>
      <ellipse cx="44" cy="31" rx="4" ry="2.5" fill={P} transform="rotate(25 44 31)"/>
      <ellipse cx="18" cy="23" rx="3.5" ry="2" fill={P} transform="rotate(-35 18 23)"/>
      <ellipse cx="41" cy="22" rx="3.5" ry="2" fill={P} transform="rotate(35 41 22)"/>
      <ellipse cx="24" cy="16" rx="3" ry="2" fill={P} transform="rotate(-15 24 16)"/>
      <ellipse cx="36" cy="15" rx="3" ry="2" fill={P} transform="rotate(15 36 15)"/>
      <ellipse cx="30" cy="10" rx="4" ry="2.5" fill={P}/>
    </svg>
  );
}

// ── Status bar ──────────────────────────────────────────────────────
function StatusBar() {
  return (
    <div className="flex justify-between items-center px-5 pt-3 pb-0.5 flex-shrink-0">
      <span className="text-xs font-bold" style={{ color: P }}>12:30</span>
      <div className="flex items-center gap-1.5">
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <rect x="0" y="5.5" width="2.5" height="5.5" rx="0.5" fill={P}/>
          <rect x="3.5" y="3.5" width="2.5" height="7.5" rx="0.5" fill={P}/>
          <rect x="7" y="1.5" width="2.5" height="9.5" rx="0.5" fill={P}/>
          <rect x="10.5" y="0" width="2.5" height="11" rx="0.5" fill={P}/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1.5 1.5 0 100 2 1.5 1.5 0 000-2z" fill={P}/>
          <path d="M4.8 7.2C5.9 6 6.9 5.4 8 5.4S10.1 6 11.2 7.2" stroke={P} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
          <path d="M1.8 4.4C3.6 2.5 5.7 1.5 8 1.5s4.4 1 6.2 2.9" stroke={P} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
        </svg>
        <div className="flex items-center gap-0.5">
          <div className="w-6 h-3 rounded border flex items-center pl-0.5" style={{ borderColor: P }}>
            <div className="h-2 rounded-sm" style={{ width: "70%", background: P }}/>
          </div>
          <div className="w-0.5 h-1.5 rounded-sm" style={{ background: P }}/>
        </div>
      </div>
    </div>
  );
}

// ── Bottom nav ──────────────────────────────────────────────────────
function BottomNav({ active, onTab }: { active: string; onTab: (t: string) => void }) {
  const tabs = [
    { key: "home", Icon: Home },
    { key: "search", Icon: Users },
    { key: "add", Icon: Plus, special: true },
    { key: "chatList", Icon: MessageCircle },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center pb-6 pt-2 z-20">
      {tabs.map(({ key, Icon, special }) => (
        <motion.button key={key} onClick={() => onTab(key)} whileTap={{ scale: 0.8 }} className="flex-1 flex justify-center">
          {special ? (
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200">
              <Icon size={17} color="#777"/>
            </div>
          ) : (
            <Icon size={24} color={active === key ? P : "#D0D0D0"} strokeWidth={active === key ? 2.5 : 1.5}/>
          )}
        </motion.button>
      ))}
    </div>
  );
}

// ── Caregiver icon ──────────────────────────────────────────────────
function CaregiverAvatar({ id, size = 40 }: { id: number; size?: number }) {
  const dotColor = [1, 2, 4].includes(id) ? "#27AE60" : "#CCCCCC";
  const bgColors = ["#E8F0F8", "#E8F4F0", "#F5EEE8", "#F0EEF5"];
  const icons = [
    <path key="1" d="M20 11 C14.5 11 10 15.5 10 21 C10 27 20 33 20 33 C20 33 30 27 30 21 C30 15.5 25.5 11 20 11Z M20 17L20 25 M16 21L24 21" stroke={P} strokeWidth="1.5" fill="none" strokeLinecap="round"/>,
    <><rect key="r" x="15" y="12" width="10" height="16" rx="2" stroke={P} strokeWidth="1.4" fill="none"/><path key="l" d="M13 17L27 17 M13 21L27 21 M13 25L27 25" stroke={P} strokeWidth="0.9" strokeLinecap="round"/></>,
    <><rect key="r" x="11" y="15" width="18" height="12" rx="2" stroke={P} strokeWidth="1.4" fill="none"/><circle key="c" cx="20" cy="21" r="3" stroke={P} strokeWidth="1.4" fill="none"/></>,
    <><rect key="r" x="12" y="12" width="16" height="16" rx="1.5" stroke={P} strokeWidth="1.4" fill="none"/><path key="l" d="M15 18L25 18 M15 21L23 21 M15 24L20 24" stroke={P} strokeWidth="1.2" strokeLinecap="round"/></>,
  ];
  const s = size;
  return (
    <div className="relative flex-shrink-0" style={{ width: s, height: s }}>
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill={bgColors[(id - 1) % bgColors.length]}/>
        {icons[(id - 1) % icons.length]}
      </svg>
      <div
        className="absolute bottom-0 right-0 rounded-full border-2 border-white"
        style={{ width: s * 0.28, height: s * 0.28, background: dotColor }}
      />
    </div>
  );
}

// ── Splash screen ───────────────────────────────────────────────────
function SplashScreen() {
  return (
    <div className="absolute inset-0 bg-white flex flex-col items-center justify-center gap-5">
      <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}>
        <ElissaTree size={90}/>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }} className="flex flex-col items-center">
        <span className="text-[44px] font-light tracking-widest leading-none" style={{ color: P, fontFamily: "Georgia, 'Times New Roman', serif" }}>elissa</span>
        <span className="text-[11px] font-semibold tracking-[0.3em] mt-1" style={{ color: P }}>VILLAGE</span>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }} className="absolute bottom-20 flex gap-1.5">
        {[0, 1, 2].map(i => (
          <motion.div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: P }}
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}/>
        ))}
      </motion.div>
    </div>
  );
}

// ── Stories row ─────────────────────────────────────────────────────
function StoriesRow({ stories, seen, onTap }: {
  stories: typeof STORIES_DATA; seen: Set<number>; onTap: (i: number) => void;
}) {
  return (
    <div className="flex gap-3 px-3 pt-3 pb-2 overflow-x-auto scrollbar-hide">
      {stories.map((s, i) => (
        <motion.button key={s.id} whileTap={{ scale: 0.88 }} onClick={() => onTap(i)} className="flex flex-col items-center gap-1.5 flex-shrink-0">
          <div
            className="w-[58px] h-[58px] rounded-full p-[2px]"
            style={{ background: seen.has(s.id) ? "#DEDEDE" : `conic-gradient(${P} 0deg, #E8906A 180deg, ${P} 360deg)` }}
          >
            <div className="w-full h-full rounded-full border-[2.5px] border-white overflow-hidden">
              <img src={s.resident.photo} alt="" className="w-full h-full object-cover"/>
            </div>
          </div>
          <span className="text-[10px] text-gray-500 max-w-[54px] truncate text-center leading-tight">
            {s.resident.name.split(" ")[0]}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

// ── Post card ───────────────────────────────────────────────────────
interface PostCardProps {
  post: typeof POSTS_INIT[0];
  onLike: () => void;
  onResidentClick: () => void;
}
function PostCard({ post, onLike, onResidentClick }: PostCardProps) {
  const [bookmarked, setBookmarked] = useState(post.bookmarked);
  const [heartPop, setHeartPop] = useState(false);
  const lastTap = useRef(0);

  const handleImageTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (!post.liked) { onLike(); }
      setHeartPop(true);
      setTimeout(() => setHeartPop(false), 900);
    }
    lastTap.current = now;
  };

  return (
    <div className="bg-white mb-1 border-b border-gray-50">
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <motion.button whileTap={{ scale: 0.88 }} onClick={onResidentClick}>
            <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-100 shadow-sm">
              <img src={post.resident.photo} alt="" className="w-full h-full object-cover"/>
            </div>
          </motion.button>
          <div>
            <button onClick={onResidentClick}>
              <p className="text-[13px] font-semibold text-gray-900 leading-tight">{post.resident.name}</p>
            </button>
            <p className="text-[11px] text-gray-400">{post.caregiver} · {post.time}</p>
          </div>
        </div>
        <button className="p-1"><MoreHorizontal size={18} color="#BBBBBB"/></button>
      </div>

      <div className="relative overflow-hidden select-none" onClick={handleImageTap}>
        <img src={post.photo} alt="" className="w-full aspect-square object-cover"/>
        <AnimatePresence>
          {heartPop && (
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }} animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <Heart size={90} fill="white" color="white" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }}/>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
        <div className="flex items-center gap-4">
          <motion.button whileTap={{ scale: 0.6 }} onClick={onLike} className="flex items-center">
            <AnimatePresence mode="wait">
              <motion.div key={post.liked ? "filled" : "empty"} initial={{ scale: 0.7 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                <Heart size={24} fill={post.liked ? P : "none"} color={post.liked ? P : "#333"} strokeWidth={1.5}/>
              </motion.div>
            </AnimatePresence>
          </motion.button>
          <button><MessageCircle size={24} color="#333" strokeWidth={1.5}/></button>
          <button><Send size={24} color="#333" strokeWidth={1.5}/></button>
        </div>
        <motion.button whileTap={{ scale: 0.75 }} onClick={() => setBookmarked(b => !b)}>
          <Bookmark size={24} fill={bookmarked ? "#222" : "none"} color="#333" strokeWidth={1.5}/>
        </motion.button>
      </div>

      <div className="px-3 pb-4">
        <p className="text-[13px] font-semibold text-gray-900">{post.likes + (post.liked ? 1 : 0)} curtidas</p>
        <p className="text-[13px] text-gray-800 mt-0.5 leading-snug">
          <span className="font-semibold">{post.resident.name.split(" ")[0]} </span>
          {post.caption}
        </p>
      </div>
    </div>
  );
}

// ── Story viewer ────────────────────────────────────────────────────
function StoryViewer({ startIdx, stories, onClose, onSeen }: {
  startIdx: number; stories: typeof STORIES_DATA;
  onClose: () => void; onSeen: (id: number) => void;
}) {
  const [curStory, setCurStory] = useState(startIdx);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const story = stories[curStory];

  const advance = useCallback(() => {
    if (photoIdx < story.photos.length - 1) {
      setPhotoIdx(p => p + 1); setProgress(0);
    } else if (curStory < stories.length - 1) {
      onSeen(story.id);
      setCurStory(s => s + 1); setPhotoIdx(0); setProgress(0);
    } else {
      onSeen(story.id); onClose();
    }
  }, [photoIdx, story, curStory, stories.length, onClose, onSeen]);

  useEffect(() => {
    setProgress(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setProgress(p => { if (p >= 100) { advance(); return 0; } return p + 2; });
    }, 100);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [curStory, photoIdx, advance]);

  const tapLeft = () => {
    if (photoIdx > 0) { setPhotoIdx(p => p - 1); setProgress(0); }
    else if (curStory > 0) { setCurStory(s => s - 1); setPhotoIdx(0); setProgress(0); }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 bg-black z-50 flex flex-col overflow-hidden"
    >
      <div className="flex gap-1 px-3 pt-12 pb-0 flex-shrink-0">
        {story.photos.map((_, i) => (
          <div key={i} className="flex-1 h-[3px] bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-none"
              style={{ width: i < photoIdx ? "100%" : i === photoIdx ? `${progress}%` : "0%" }}/>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 px-3 pt-3 pb-2 flex-shrink-0">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/40">
          <img src={story.resident.photo} alt="" className="w-full h-full object-cover"/>
        </div>
        <div className="flex-1">
          <p className="text-white text-xs font-semibold">{story.resident.name}</p>
          <p className="text-white/60 text-[10px]">há 2h</p>
        </div>
        <button onClick={onClose}><X size={22} color="white"/></button>
      </div>
      <div className="flex-1 relative">
        <motion.img
          key={`${curStory}-${photoIdx}`}
          src={story.photos[photoIdx]} alt=""
          initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex">
          <div className="w-1/3 h-full" onClick={tapLeft}/>
          <div className="w-2/3 h-full" onClick={advance}/>
        </div>
      </div>
    </motion.div>
  );
}

// ── Home feed ───────────────────────────────────────────────────────
function HomeFeed({ posts, onLike, onResident, stories, seen, onStory }: {
  posts: typeof POSTS_INIT; onLike: (id: number) => void; onResident: (r: Resident) => void;
  stories: typeof STORIES_DATA; seen: Set<number>; onStory: (i: number) => void;
}) {
  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar/>
      <div className="flex items-center justify-between px-4 py-2 flex-shrink-0">
        <div className="w-8"/>
        <div className="flex items-center gap-1.5">
          <ElissaTree size={20}/>
          <span className="text-[22px] font-light tracking-widest leading-none" style={{ color: P, fontFamily: "Georgia,'Times New Roman',serif" }}>elissa</span>
        </div>
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.8 }}><Bell size={22} color={P} strokeWidth={1.5}/></motion.button>
          <motion.button whileTap={{ scale: 0.8 }}><Search size={22} color={P} strokeWidth={1.5}/></motion.button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
        <div className="border-b border-gray-100">
          <StoriesRow stories={stories} seen={seen} onTap={onStory}/>
        </div>
        {posts.map(p => (
          <PostCard key={p.id} post={p} onLike={() => onLike(p.id)} onResidentClick={() => onResident(p.resident)}/>
        ))}
      </div>
    </div>
  );
}

// ── Resident profile ────────────────────────────────────────────────
function ResidentProfile({ resident, onBack }: { resident: Resident; onBack: () => void }) {
  const statusColor = ({ Saudável: "#27AE60", "Em Observação": "#E67E22", "Em Tratamento": "#E74C3C" } as Record<string, string>)[resident.status] ?? "#888";
  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar/>
      <div className="flex items-center justify-between px-4 py-2 flex-shrink-0">
        <motion.button whileTap={{ scale: 0.8 }} onClick={onBack}><ChevronLeft size={26} color={P}/></motion.button>
        <span className="text-[12px] font-bold tracking-[0.2em] uppercase" style={{ color: P }}>Perfil do Morador</span>
        <div className="w-8"/>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
        <div className="flex flex-col items-center pt-3 pb-5">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-md" style={{ border: `2.5px solid ${P}` }}>
              <img src={resident.photo} alt="" className="w-full h-full object-cover"/>
            </div>
          </motion.div>
          <h2 className="text-xl font-semibold text-gray-800 mt-3">{resident.name}</h2>
          <p className="text-sm text-gray-400 mt-0.5">{resident.email}</p>
        </div>

        <div className="mx-4 mb-4">
          <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">CONTATO</p>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {[
              { Icon: Phone, label: "Telefone", value: resident.phone },
              { Icon: MapPin, label: "Cidade / UF", value: resident.city },
              { Icon: Calendar, label: "Nascimento", value: resident.birthdate },
            ].map(({ Icon, label, value }, i) => (
              <div key={label} className={`flex items-center gap-3 px-4 py-3.5 ${i > 0 ? "border-t border-gray-50" : ""}`}>
                <Icon size={16} color={P} strokeWidth={1.5}/>
                <span className="text-xs text-gray-400 w-24 flex-shrink-0">{label}</span>
                <span className="text-xs font-medium text-gray-700 flex-1 text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {resident.notes && (
          <div className="mx-4 mb-4">
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">OBSERVAÇÕES</p>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-3.5">
              <p className="text-xs text-gray-600 leading-relaxed">{resident.notes}</p>
              <p className="text-[10px] text-gray-300 text-right mt-1">1/30</p>
            </div>
          </div>
        )}

        {resident.family.length > 0 && (
          <div className="mx-4 mb-4">
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">FAMILIARES</p>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
              {resident.family.map((m, i) => (
                <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                    <img src={m.photo} alt="" className="w-full h-full object-cover"/>
                  </div>
                  <span className="text-[10px] font-medium text-gray-700">{m.name}</span>
                  <span className="text-[9px] text-gray-400">{m.rel}</span>
                </div>
              ))}
            </div>
            <motion.button whileTap={{ scale: 0.95 }} className="mt-2.5">
              <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: P }}>VER TODOS</span>
            </motion.button>
          </div>
        )}

        <div className="mx-4 mb-4">
          <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">STATUS CLÍNICO</p>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-3.5 flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: statusColor }}/>
            <span className="text-sm font-semibold" style={{ color: statusColor }}>{resident.status}</span>
          </div>
        </div>

        {resident.grid.length > 0 && (
          <div className="mx-4 mb-4">
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">FOTOS</p>
            <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden">
              {resident.grid.map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden">
                  <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"/>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Search residents ────────────────────────────────────────────────
function SearchResidents({ onResident, onBack }: { onResident: (r: Resident) => void; onBack: () => void }) {
  const [q, setQ] = useState("");
  const filtered = RESIDENTS.filter(r => r.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar/>
      <div className="flex items-center justify-between px-4 py-2 flex-shrink-0">
        <motion.button whileTap={{ scale: 0.8 }} onClick={onBack}><ChevronLeft size={26} color={P}/></motion.button>
        <span className="text-[12px] font-bold tracking-[0.2em] uppercase" style={{ color: P }}>Procurar Moradores</span>
        <div className="w-8"/>
      </div>
      <div className="px-4 mb-3 flex-shrink-0">
        <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-2.5 gap-2">
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Digite"
            className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-300"/>
          <Search size={16} color="#CCCCCC"/>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-24">
        <div className="grid grid-cols-3 gap-3">
          {filtered.map(r => (
            <motion.button key={r.id} whileTap={{ scale: 0.9 }} onClick={() => onResident(r)}
              className="flex flex-col items-center gap-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-3">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img src={r.photo} alt="" className="w-full h-full object-cover"/>
              </div>
              <p className="text-[11px] font-medium text-gray-700 text-center leading-tight">{r.name}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Chat list ───────────────────────────────────────────────────────
function ChatList({ onChat, onBack }: { onChat: (c: Caregiver) => void; onBack: () => void }) {
  const [tab, setTab] = useState(0);
  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar/>
      <div className="flex items-center justify-between px-4 py-2 flex-shrink-0">
        <motion.button whileTap={{ scale: 0.8 }} onClick={onBack}><ChevronLeft size={26} color={P}/></motion.button>
        <span className="text-[12px] font-bold tracking-[0.2em] uppercase" style={{ color: P }}>Conversas</span>
        <div className="w-8"/>
      </div>
      <div className="flex border-b border-gray-100 mx-4 flex-shrink-0">
        {[<MessageCircle key="m" size={20}/>, <Users key="u" size={20}/>].map((Icon, i) => (
          <button key={i} onClick={() => setTab(i)}
            className={`flex-1 flex justify-center py-3 border-b-2 transition-colors`}
            style={{ borderColor: tab === i ? P : "transparent" }}>
            {<Icon.type {...Icon.props} color={tab === i ? P : "#CCCCCC"}/>}
          </button>
        ))}
      </div>
      <div className="px-4 py-3 flex-shrink-0">
        <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-2.5 gap-2">
          <input placeholder="Digite" className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-300"/>
          <Search size={16} color="#CCCCCC"/>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
        {CAREGIVERS_DATA.map(c => (
          <motion.button key={c.id} whileTap={{ scale: 0.97 }} onClick={() => onChat(c)}
            className="flex items-center gap-3 w-full px-4 py-3.5 active:bg-gray-50 transition-colors">
            <CaregiverAvatar id={c.id} size={44}/>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[13px] font-semibold text-gray-800">{c.name}</p>
              <p className="text-xs text-gray-400 truncate">{c.lastMsg}</p>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <p className="text-[10px] text-gray-400">{c.time}</p>
              {c.unread > 0 && (
                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: P }}>
                  <span className="text-[9px] text-white font-bold">{c.unread}</span>
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ── Chat conversation ───────────────────────────────────────────────
function ChatConversation({ caregiver, messages, onSend, onBack }: {
  caregiver: Caregiver; messages: Message[]; onSend: (t: string) => void; onBack: () => void;
}) {
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = () => {
    const t = text.trim(); if (!t) return;
    setText(""); onSend(t);
    setTimeout(() => setTyping(true), 700);
    setTimeout(() => setTyping(false), 3400);
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <StatusBar/>
      <div className="flex items-center gap-2.5 px-3 py-2 border-b border-gray-100 flex-shrink-0">
        <motion.button whileTap={{ scale: 0.8 }} onClick={onBack}><ChevronLeft size={26} color={P}/></motion.button>
        <CaregiverAvatar id={caregiver.id} size={38}/>
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-gray-800 leading-tight">{caregiver.name}</p>
          <p className="text-[10px] text-gray-400">telefone</p>
        </div>
        <div className="flex gap-4">
          <motion.button whileTap={{ scale: 0.8 }}><Video size={20} color={P} strokeWidth={1.5}/></motion.button>
          <motion.button whileTap={{ scale: 0.8 }}><PhoneCall size={20} color={P} strokeWidth={1.5}/></motion.button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-3 py-4 flex flex-col gap-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.mine ? "justify-end" : "justify-start"} items-end gap-2`}>
            {!msg.mine && (
              <div className="flex-shrink-0 mb-0.5"><CaregiverAvatar id={caregiver.id} size={30}/></div>
            )}
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`max-w-[68%] px-3.5 py-2.5 shadow-sm ${msg.mine ? "rounded-2xl rounded-br-sm" : "rounded-2xl rounded-bl-sm"}`}
              style={{ background: msg.mine ? P : "#F2F2F2" }}
            >
              <p className={`text-[13px] leading-relaxed ${msg.mine ? "text-white" : "text-gray-700"}`}>{msg.text}</p>
            </motion.div>
          </div>
        ))}
        <AnimatePresence>
          {typing && (
            <motion.div key="typing" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-end gap-2">
              <div className="flex-shrink-0 mb-0.5"><CaregiverAvatar id={caregiver.id} size={30}/></div>
              <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                {[0, 1, 2].map(i => (
                  <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400"
                    animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.65, delay: i * 0.13, ease: "easeInOut" }}/>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef}/>
      </div>

      <div className="border-t border-gray-100 px-3 py-2 flex items-center gap-2 pb-7 flex-shrink-0">
        <motion.button whileTap={{ scale: 0.8 }}><Smile size={22} color="#BBBBBB"/></motion.button>
        <div className="flex-1 bg-gray-50 rounded-full px-4 py-2.5">
          <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Olá, tudo bem?" className="w-full bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"/>
        </div>
        <AnimatePresence mode="wait">
          {text.trim() ? (
            <motion.button key="send" initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}
              whileTap={{ scale: 0.75 }} onClick={send}
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: P }}>
              <Send size={15} color="white"/>
            </motion.button>
          ) : (
            <motion.button key="attach" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} whileTap={{ scale: 0.8 }}>
              <Paperclip size={22} color="#BBBBBB"/>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Emergency modal ─────────────────────────────────────────────────
function EmergencyModal({ onClose }: { onClose: () => void }) {
  const [calling, setCalling] = useState<typeof EMERGENCY_CONTACTS[0] | null>(null);
  const [ringCount, setRingCount] = useState(0);

  useEffect(() => {
    if (!calling) return;
    const t = setInterval(() => setRingCount(r => r + 1), 1500);
    return () => clearInterval(t);
  }, [calling]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/55 z-50 flex items-end"
      onClick={e => e.target === e.currentTarget && !calling && onClose()}>
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="bg-white rounded-t-3xl w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {calling ? (
            <motion.div key="calling" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center py-10 px-6 gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center mb-1" style={{ background: PL }}>
                <AlertTriangle size={18} color={P}/>
              </div>
              <p className="text-[11px] uppercase tracking-widest text-gray-400">Ligando para</p>
              <p className="text-xl font-semibold text-gray-800 text-center">{calling.name}</p>
              <p className="text-sm text-gray-400">{calling.phone}</p>
              <div className="relative flex items-center justify-center my-6">
                {[0, 1, 2].map(i => (
                  <motion.div key={i}
                    animate={{ scale: [1, 1.7 + i * 0.3], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.5, ease: "easeOut" }}
                    className="absolute rounded-full border-2"
                    style={{ width: 68, height: 68, borderColor: P }}/>
                ))}
                <div className="w-[68px] h-[68px] rounded-full flex items-center justify-center z-10" style={{ background: P }}>
                  <PhoneCall size={28} color="white"/>
                </div>
              </div>
              <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                <p className="text-sm text-gray-400">{ringCount < 3 ? "Chamando..." : "Aguardando resposta..."}</p>
              </motion.div>
              <motion.button whileTap={{ scale: 0.88 }} onClick={() => { setCalling(null); setRingCount(0); }}
                className="mt-5 w-14 h-14 rounded-full flex items-center justify-center bg-red-500 shadow-lg">
                <PhoneCall size={24} color="white"/>
              </motion.button>
              <p className="text-[11px] text-gray-400">Toque para encerrar</p>
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between px-5 pt-5 pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: P }}>
                    <AlertTriangle size={15} color="white"/>
                  </div>
                  <p className="text-base font-semibold text-gray-800">Contatos de Emergência</p>
                </div>
                <button onClick={onClose}><X size={20} color="#AAAAAA"/></button>
              </div>
              <p className="text-xs text-gray-400 px-5 pb-2">Selecione um contato para ligar agora</p>
              <div className="divide-y divide-gray-50 pb-8">
                {EMERGENCY_CONTACTS.map(c => (
                  <motion.button key={c.id} whileTap={{ scale: 0.97 }} onClick={() => { setCalling(c); setRingCount(0); }}
                    className="w-full flex items-center gap-3 px-5 py-4 active:bg-gray-50 transition-colors">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: P }}>
                      {c.name.charAt(0)}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[13px] font-semibold text-gray-800">{c.name}</p>
                      <p className="text-xs text-gray-400">{c.relationship} · {c.phone}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: PL }}>
                      <Phone size={15} color={P}/>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ── Contact caregiver sheet ─────────────────────────────────────────
function ContactSheet({ onClose, onChat }: { onClose: () => void; onChat: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/40 z-40 flex items-end"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="bg-white rounded-t-3xl w-full">
        <div className="flex justify-center pt-3.5 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full"/>
        </div>
        <div className="px-5 pt-3 pb-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-base font-semibold text-gray-800">Contatar Cuidador</p>
            <button onClick={onClose}><X size={18} color="#AAAAAA"/></button>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 mb-5 flex items-center gap-3">
            <CaregiverAvatar id={2} size={44}/>
            <div>
              <p className="text-sm font-semibold text-gray-800">Enfermagem</p>
              <p className="text-xs text-gray-400">Setor da Saúde</p>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-500"/>
                <span className="text-[11px] text-green-600 font-medium">Disponível agora</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mb-5">
            {[{ Icon: Phone, label: "Ligar" }, { Icon: Video, label: "Vídeo" }].map(({ Icon, label }) => (
              <motion.button key={label} whileTap={{ scale: 0.93 }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-gray-200">
                <Icon size={16} color={P} strokeWidth={1.5}/>
                <span className="text-sm font-medium" style={{ color: P }}>{label}</span>
              </motion.button>
            ))}
          </div>
          <motion.button whileTap={{ scale: 0.97 }} onClick={onChat}
            className="w-full py-4 rounded-2xl text-white font-semibold text-[13px] shadow-sm"
            style={{ background: P }}>
            Iniciar Conversa
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Camera sheet ────────────────────────────────────────────────────
function CameraSheet({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/60 z-40 flex items-end"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="w-full px-4 pb-8">
        <div className="bg-white rounded-2xl overflow-hidden mb-3">
          {[{ Icon: Camera, label: "Abrir câmera" }, { Icon: GalleryIcon, label: "Escolher da galeria" }].map(({ Icon, label }, i) => (
            <motion.button key={label} whileTap={{ scale: 0.97 }} onClick={onClose}
              className={`w-full flex items-center gap-3.5 px-5 py-4.5 py-[18px] ${i > 0 ? "border-t border-gray-100" : ""}`}>
              <Icon size={22} color={P} strokeWidth={1.5}/>
              <span className="text-sm font-medium text-gray-800">{label}</span>
            </motion.button>
          ))}
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={onClose}
          className="w-full bg-white rounded-2xl py-4 text-sm font-semibold text-gray-500">
          Cancelar
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ── Emergency FAB pulse ring ────────────────────────────────────────
function EmergencyFAB({ onClick }: { onClick: () => void }) {
  return (
    <div className="relative">
      <motion.div
        animate={{ scale: [1, 1.55], opacity: [0.6, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0 rounded-full bg-red-400"
      />
      <motion.button whileTap={{ scale: 0.82 }} onClick={onClick}
        className="relative w-12 h-12 rounded-full shadow-lg flex items-center justify-center bg-red-500">
        <AlertTriangle size={20} color="white"/>
      </motion.button>
    </div>
  );
}

// ── Slide variants ──────────────────────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({ x: dir === 0 ? 0 : dir > 0 ? "100%" : "-100%", opacity: dir === 0 ? 0 : 1 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir === 0 ? 0 : dir > 0 ? "-100%" : "100%", opacity: dir === 0 ? 0 : 1 }),
};

// ── Main App ────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase] = useState<"splash" | "app">("splash");
  const [navStack, setNavStack] = useState<ScreenType[]>(["home"]);
  const [activeTab, setActiveTab] = useState("home");
  const [slideDir, setSlideDir] = useState(0);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [selectedChat, setSelectedChat] = useState<Caregiver | null>(null);
  const [posts, setPosts] = useState(POSTS_INIT);
  const [seen, setSeen] = useState(new Set<number>());
  const [storyViewer, setStoryViewer] = useState<{ idx: number } | null>(null);
  const [showEmergency, setShowEmergency] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [messages, setMessages] = useState<Record<number, Message[]>>(MSGS_INIT);
  const replyCounts = useRef<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0 });

  const cur = navStack[navStack.length - 1];

  useEffect(() => {
    const t = setTimeout(() => setPhase("app"), 2800);
    return () => clearTimeout(t);
  }, []);

  const push = (screen: ScreenType) => {
    setSlideDir(1);
    setNavStack(p => [...p, screen]);
  };

  const goBack = () => {
    setSlideDir(-1);
    setNavStack(p => p.length > 1 ? p.slice(0, -1) : p);
  };

  const switchTab = (tab: string) => {
    if (tab === "add") { setShowCamera(true); return; }
    setSlideDir(0);
    setActiveTab(tab);
    const map: Record<string, ScreenType> = { home: "home", search: "search", chatList: "chatList" };
    setNavStack([map[tab] ?? "home"]);
  };

  const onResident = (r: Resident) => { setSelectedResident(r); push("profile"); };
  const onChat = (c: Caregiver) => { setSelectedChat(c); push("chat"); };

  const onSend = (text: string) => {
    if (!selectedChat) return;
    const id = selectedChat.id;
    const now = new Date();
    const t = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    setMessages(p => ({ ...p, [id]: [...(p[id] ?? []), { id: Date.now(), text, mine: true, time: t }] }));
    const replies = AUTO_REPLIES[id as keyof typeof AUTO_REPLIES] ?? ["Ok!"];
    const idx = replyCounts.current[id] ?? 0;
    replyCounts.current[id] = idx + 1;
    setTimeout(() => {
      setMessages(p => ({ ...p, [id]: [...(p[id] ?? []), { id: Date.now() + 1, text: replies[idx % replies.length], mine: false, time: t }] }));
    }, 3400);
  };

  const onContactChat = () => {
    setShowContact(false);
    setSelectedChat(CAREGIVERS_DATA[1]);
    push("chat");
  };

  const showBottomNav = !["profile", "chat"].includes(cur);

  const renderScreen = () => {
    switch (cur) {
      case "home": return (
        <HomeFeed posts={posts} onLike={id => setPosts(p => p.map(x => x.id === id ? { ...x, liked: !x.liked } : x))}
          onResident={onResident} stories={STORIES_DATA} seen={seen} onStory={i => setStoryViewer({ idx: i })}/>
      );
      case "profile": return selectedResident ? <ResidentProfile resident={selectedResident} onBack={goBack}/> : null;
      case "search": return <SearchResidents onResident={onResident} onBack={() => switchTab("home")}/>;
      case "chatList": return <ChatList onChat={onChat} onBack={() => switchTab("home")}/>;
      case "chat": return selectedChat
        ? <ChatConversation caregiver={selectedChat} messages={messages[selectedChat.id] ?? []} onSend={onSend} onBack={goBack}/>
        : null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#E8E0DC" }}>
      <div className="relative overflow-hidden shadow-2xl" style={{ width: 390, height: 844, borderRadius: 44, background: "#fff" }}>
        {/* Screen ring */}
        <div className="absolute inset-0 pointer-events-none z-[100] rounded-[44px]" style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.12)" }}/>

        {/* Splash */}
        <AnimatePresence>
          {phase === "splash" && (
            <motion.div key="splash" exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0 z-[90]">
              <SplashScreen/>
            </motion.div>
          )}
        </AnimatePresence>

        {/* App */}
        {phase === "app" && (
          <>
            <AnimatePresence mode="wait" custom={slideDir}>
              <motion.div key={navStack.join("/")} custom={slideDir} variants={slideVariants}
                initial="enter" animate="center" exit="exit"
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                className="absolute inset-0">
                {renderScreen()}
              </motion.div>
            </AnimatePresence>

            {showBottomNav && <BottomNav active={activeTab} onTab={switchTab}/>}

            {/* FABs – only on home */}
            {cur === "home" && (
              <div className="absolute bottom-20 right-4 flex flex-col gap-2.5 z-30">
                <EmergencyFAB onClick={() => setShowEmergency(true)}/>
                <motion.button whileTap={{ scale: 0.82 }} onClick={() => setShowContact(true)}
                  className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
                  style={{ background: P }}>
                  <MessageCircle size={20} color="white"/>
                </motion.button>
              </div>
            )}

            <AnimatePresence>
              {storyViewer && (
                <StoryViewer key="sv" startIdx={storyViewer.idx} stories={STORIES_DATA}
                  onClose={() => setStoryViewer(null)}
                  onSeen={id => setSeen(s => new Set([...s, id]))}/>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showEmergency && <EmergencyModal key="em" onClose={() => setShowEmergency(false)}/>}
            </AnimatePresence>

            <AnimatePresence>
              {showContact && <ContactSheet key="cs" onClose={() => setShowContact(false)} onChat={onContactChat}/>}
            </AnimatePresence>

            <AnimatePresence>
              {showCamera && <CameraSheet key="cam" onClose={() => setShowCamera(false)}/>}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
