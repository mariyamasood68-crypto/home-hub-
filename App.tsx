/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  Settings, 
  Tv, 
  Lightbulb, 
  ChevronLeft, 
  Power, 
  Plus, 
  Minus, 
  ChevronUp, 
  ChevronDown, 
  Newspaper, 
  Film, 
  Tv2, 
  Undo2, 
  VolumeX,
  ShoppingBasket,
  Heart,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Screen = 'home' | 'lights' | 'remote' | 'food' | 'family' | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'lights':
        return <LightsScreen onBack={() => setCurrentScreen('home')} />;
      case 'remote':
        return <RemoteScreen onBack={() => setCurrentScreen('home')} />;
      case 'food':
        return <FoodScreen onBack={() => setCurrentScreen('home')} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7f8] font-sans text-slate-900 flex flex-col max-w-md mx-auto shadow-2xl relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="flex-1 flex flex-col"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 pb-8 pt-4 max-w-md mx-auto z-50">
        <div className="flex items-center justify-between">
          <NavButton 
            icon={<Home size={32} />} 
            label="Home" 
            active={currentScreen === 'home'} 
            onClick={() => setCurrentScreen('home')} 
          />
          <NavButton 
            icon={<Users size={32} />} 
            label="Family" 
            active={currentScreen === 'family'} 
            onClick={() => setCurrentScreen('family')} 
          />
          <NavButton 
            icon={<Settings size={32} />} 
            label="Settings" 
            active={currentScreen === 'settings'} 
            onClick={() => setCurrentScreen('settings')} 
          />
        </div>
      </nav>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-[#30abe8]' : 'text-slate-400'}`}
    >
      {icon}
      <span className="text-sm font-bold">{label}</span>
    </button>
  );
}

// --- SCREENS ---

function HomeScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col p-6 pb-32">
      <header className="flex items-center justify-between mb-12 pt-4">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-full border-2 border-[#30abe8] p-0.5 overflow-hidden">
            <img 
              src="https://picsum.photos/seed/grandma/100/100" 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Home Hub</h1>
        </div>
        <button className="text-[#30abe8] relative">
          <Bell size={32} />
          <span className="absolute top-0 right-0 size-3 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      <div className="mb-10">
        <h2 className="text-5xl font-black text-slate-900 leading-tight mb-2">
          Hello,<br />Grandma!
        </h2>
        <p className="text-xl text-slate-500 font-medium">Everything is running smoothly.</p>
      </div>

      <div className="space-y-6">
        <BigButton 
          icon={<Tv size={48} />} 
          label="Turn on TV" 
          color="bg-[#30abe8]" 
          onClick={() => onNavigate('remote')}
        />
        <BigButton 
          icon={<Lightbulb size={48} />} 
          label="Lights" 
          color="bg-[#30abe8]" 
          onClick={() => onNavigate('lights')}
        />
        <BigButton 
          icon={<ShoppingBasket size={48} />} 
          label="Get Food" 
          color="bg-[#30abe8]" 
          onClick={() => onNavigate('food')}
        />
      </div>
    </div>
  );
}

function BigButton({ icon, label, color, onClick }: { icon: React.ReactNode, label: string, color: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`${color} w-full py-10 rounded-[2rem] text-white flex flex-col items-center justify-center gap-4 shadow-xl active:scale-95 transition-transform`}
    >
      {icon}
      <span className="text-2xl font-bold">{label}</span>
    </button>
  );
}

function LightsScreen({ onBack }: { onBack: () => void }) {
  const [lights, setLights] = useState({
    living: true,
    bedroom: false,
    kitchen: false,
    hallway: true
  });

  const toggleLight = (key: keyof typeof lights) => {
    setLights(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f6f7f8] pb-32">
      <header className="sticky top-0 z-10 bg-[#f6f7f8]/80 backdrop-blur-md px-6 pt-12 pb-4 flex items-center justify-between">
        <button onClick={onBack} className="size-12 rounded-full bg-[#30abe8]/10 text-[#30abe8] flex items-center justify-center">
          <ChevronLeft size={32} />
        </button>
        <h1 className="text-2xl font-bold">Control Lights</h1>
        <div className="size-12"></div>
      </header>

      <div className="px-6 mt-4 mb-8">
        <p className="text-slate-500 text-lg">Tap the switches below to turn your lights on or off. Large buttons for easy use.</p>
      </div>

      <div className="px-6 space-y-4">
        <LightRow 
          label="Living Room" 
          sub="Main Ceiling Light" 
          isOn={lights.living} 
          onToggle={() => toggleLight('living')} 
        />
        <LightRow 
          label="Bedroom" 
          sub="Bedside Lamp" 
          isOn={lights.bedroom} 
          onToggle={() => toggleLight('bedroom')} 
        />
        <LightRow 
          label="Kitchen" 
          sub="Counter Lights" 
          isOn={lights.kitchen} 
          onToggle={() => toggleLight('kitchen')} 
        />
        <LightRow 
          label="Hallway" 
          sub="Night Light" 
          isOn={lights.hallway} 
          onToggle={() => toggleLight('hallway')} 
        />

        <button 
          onClick={() => setLights({ living: false, bedroom: false, kitchen: false, hallway: false })}
          className="w-full bg-[#30abe8] text-white py-6 rounded-2xl text-xl font-bold flex items-center justify-center gap-3 shadow-lg mt-8 active:scale-95 transition-transform"
        >
          <Power size={32} />
          Turn All Lights Off
        </button>
      </div>
    </div>
  );
}

function LightRow({ label, sub, isOn, onToggle }: { label: string, sub: string, isOn: boolean, onToggle: () => void }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className={`size-16 rounded-full flex items-center justify-center transition-colors ${isOn ? 'bg-[#30abe8]/20 text-[#30abe8]' : 'bg-slate-100 text-slate-400'}`}>
          <Lightbulb size={36} fill={isOn ? "currentColor" : "none"} />
        </div>
        <div>
          <h3 className="text-xl font-bold">{label}</h3>
          <p className="text-slate-500">{sub}</p>
        </div>
      </div>
      <button 
        onClick={onToggle}
        className={`relative w-20 h-10 rounded-full transition-colors p-1 ${isOn ? 'bg-[#30abe8]' : 'bg-slate-200'}`}
      >
        <div className={`size-8 bg-white rounded-full shadow-md transition-transform ${isOn ? 'translate-x-10' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}

function RemoteScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex-1 flex flex-col bg-[#f6f7f8] pb-32">
      <header className="flex items-center bg-white p-4 shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="size-12 flex items-center justify-center rounded-full hover:bg-slate-100">
          <ChevronLeft size={32} />
        </button>
        <h1 className="text-2xl font-bold flex-1 text-center pr-12">TV Remote</h1>
      </header>

      <div className="px-6 pt-8 space-y-10">
        <div className="flex justify-center">
          <button className="bg-red-500 text-white size-32 rounded-full shadow-lg flex flex-col items-center justify-center active:scale-95 transition-transform">
            <Power size={48} />
            <span className="text-lg font-bold">POWER</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col items-center gap-4">
            <span className="text-xl font-bold text-[#30abe8]">VOLUME</span>
            <div className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden w-full">
              <button className="py-8 flex justify-center active:bg-slate-50"><Plus size={48} /></button>
              <div className="h-px bg-slate-100" />
              <button className="py-8 flex justify-center active:bg-slate-50"><Minus size={48} /></button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-xl font-bold text-[#30abe8]">CHANNEL</span>
            <div className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden w-full">
              <button className="py-8 flex justify-center active:bg-slate-50"><ChevronUp size={48} /></button>
              <div className="h-px bg-slate-100" />
              <button className="py-8 flex justify-center active:bg-slate-50"><ChevronDown size={48} /></button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-500">Quick Select</h2>
          <div className="grid grid-cols-3 gap-4">
            <QuickBtn icon={<Newspaper className="text-blue-500" />} label="News" />
            <QuickBtn icon={<Film className="text-purple-500" />} label="Movies" />
            <QuickBtn icon={<Tv2 className="text-green-500" />} label="Shows" />
          </div>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 bg-slate-200 h-16 rounded-2xl font-bold text-lg flex items-center justify-center gap-2">
            <VolumeX size={24} /> Mute
          </button>
          <button className="flex-1 bg-slate-200 h-16 rounded-2xl font-bold text-lg flex items-center justify-center gap-2">
            <Undo2 size={24} /> Back
          </button>
        </div>
      </div>
    </div>
  );
}

function QuickBtn({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center gap-2 active:border-[#30abe8] border-2 border-transparent">
      {React.cloneElement(icon as React.ReactElement, { size: 40 })}
      <span className="font-bold">{label}</span>
    </button>
  );
}

function FoodScreen({ onBack }: { onBack: () => void }) {
  const items = [
    { name: 'Milk', sub: 'Fresh whole milk, 1 Gallon', img: 'https://picsum.photos/seed/milk/400/400' },
    { name: 'Bread', sub: 'Whole wheat sliced bread', img: 'https://picsum.photos/seed/bread/400/400' },
    { name: 'Eggs', sub: 'One dozen farm fresh eggs', img: 'https://picsum.photos/seed/eggs/400/400' },
    { name: 'Fruit', sub: 'Seasonal fresh fruit basket', img: 'https://picsum.photos/seed/fruit/400/400' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#f6f7f8] pb-32">
      <header className="sticky top-0 z-10 bg-[#f6f7f8]/95 backdrop-blur-md border-b border-[#30abe8]/10 p-6 flex items-center justify-between">
        <button onClick={onBack} className="size-14 rounded-full bg-[#30abe8]/10 text-[#30abe8] flex items-center justify-center">
          <ChevronLeft size={36} />
        </button>
        <h1 className="text-2xl font-bold flex-1 text-center pr-14">Get Food</h1>
      </header>

      <div className="p-6">
        <h2 className="text-3xl font-black mb-2">Choose an item</h2>
        <p className="text-lg text-slate-500 mb-8">Tap an item to order it to your home.</p>

        <div className="grid grid-cols-1 gap-6">
          {items.map((item) => (
            <div key={item.name} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
              <img src={item.img} alt={item.name} className="w-full aspect-video object-cover" referrerPolicy="no-referrer" />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-1">{item.name}</h3>
                <p className="text-lg text-slate-500 mb-6">{item.sub}</p>
                <button className="w-full bg-[#30abe8] text-white py-5 rounded-full text-xl font-bold shadow-lg active:scale-95 transition-transform">
                  Order This
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
