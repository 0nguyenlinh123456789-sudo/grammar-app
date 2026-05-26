// File: src/components/unitData.jsx
import React, { useState, useEffect } from 'react';
import { BookOpen, Gamepad2, PenTool, Edit3, Keyboard, Layers } from 'lucide-react';

// Sub-components
import TheoryTab from './oxford/TheoryTab';
import FlashcardTab from './oxford/FlashcardTab';
import DragDropTab from './oxford/DragDropTab';
import TypingTab from './oxford/TypingTab';
import QuizTab from './oxford/QuizTab';
import PracticeTab from './oxford/PracticeTab';

export default function OxfordVocab({ unitData }) {
    const [activeTab, setActiveTab] = useState("theory");

    useEffect(() => {
        setActiveTab("theory");
    }, [unitData]);

    if (!unitData) {
        return <div className="flex items-center justify-center h-full text-slate-400 font-bold text-xl">Vui lòng chọn Unit từ Menu bên trái.</div>;
    }

    const tabs = [
        { id: "theory", name: "Lý Thuyết", icon: <BookOpen size={20} className="mr-2" /> },
        { id: "flashcard", name: "Thẻ Nhớ", icon: <Layers size={20} className="mr-2" /> },
        { id: "dragdrop", name: "Ghép Từ", icon: <Gamepad2 size={20} className="mr-2" /> },
        { id: "typing", name: "Gõ Từ", icon: <Keyboard size={20} className="mr-2" /> },
        { id: "quiz", name: "Làm Test", icon: <PenTool size={20} className="mr-2" /> },
        { id: "practice", name: "AI", icon: <Edit3 size={20} className="mr-2" /> }
    ];

    // Remove pb-32 when on flashcard to fix double scrollbar issues
    const getScrollbarClass = () => activeTab === 'flashcard' ? 'pb-10' : 'pb-32';

    return (
        <div className="w-full h-full max-h-screen flex flex-col bg-transparent">
            {/* Tab navigation */}
            <div className="flex gap-3 mb-6 pb-2 overflow-x-auto hide-scrollbar shrink-0">
                {tabs.map(tab => (
                    <button 
                      key={tab.id} 
                      onClick={() => setActiveTab(tab.id)} 
                      className={`flex flex-row items-center px-5 py-4 rounded-2xl font-black text-base whitespace-nowrap transition-all border-4 cursor-pointer ${activeTab === tab.id ? 'bg-yellow-300 border-slate-800 text-slate-900 translate-y-1 shadow-none' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-800 hover:text-slate-800 shadow-[4px_4px_0_0_#e2e8f0]'}`}
                    >
                        {tab.icon} {tab.name}
                    </button>
                ))}
            </div>

            {/* Tab Content Panel */}
            <div className={`flex-1 overflow-y-auto custom-scrollbar pr-2 ${getScrollbarClass()}`}>
                {activeTab === "theory" && <TheoryTab unitData={unitData} />}
                {activeTab === "flashcard" && <FlashcardTab unitData={unitData} />}
                {activeTab === "dragdrop" && <DragDropTab unitData={unitData} />}
                {activeTab === "typing" && <TypingTab unitData={unitData} />}
                {activeTab === "quiz" && <QuizTab unitData={unitData} />}
                {activeTab === "practice" && <PracticeTab unitData={unitData} />}
            </div>
        </div>
    );
}