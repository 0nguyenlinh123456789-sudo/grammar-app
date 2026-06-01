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

export default function OxfordVocab({ unitData, completedMilestones = [], completeMilestone }) {
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

    const isCompleted = completedMilestones.includes(unitData.id);

    return (
        <div className="w-full h-full max-h-screen flex flex-col bg-transparent">
            {/* Unit Header with Title & Complete Button */}
            <div className="bg-white border-4 border-slate-800 rounded-3xl p-6 mb-6 shadow-[6px_6px_0_0_#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                <div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-tight">{unitData.title}</h2>
                    <p className="text-slate-500 font-bold text-xs md:text-sm mt-1">{unitData.description}</p>
                </div>
                <div className="shrink-0">
                    {isCompleted ? (
                        <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-100 text-emerald-800 font-black border-[3px] border-emerald-800 rounded-xl shadow-[2px_2px_0_0_#065f46] text-xs">
                            ✓ ĐÃ HOÀN THÀNH (+20 XP)
                        </div>
                    ) : (
                        <button 
                            onClick={() => completeMilestone(unitData.id, 20)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-yellow-300 text-slate-900 font-black border-[3px] border-slate-800 rounded-xl shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-yellow-400 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-xs font-sans font-bold"
                        >
                            🌟 HOÀN THÀNH UNIT (+20 XP)
                        </button>
                    )}
                </div>
            </div>

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