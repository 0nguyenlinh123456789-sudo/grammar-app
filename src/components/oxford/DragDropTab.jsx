// File: src/components/oxford/DragDropTab.jsx
import { useState, useEffect } from 'react';
import { Gamepad2, RotateCcw } from 'lucide-react';

const DragDropTab = ({ unitData }) => {
    const [words, setWords] = useState([]);

    useEffect(() => {
        if (unitData?.dragDrop) {
            setWords(unitData.dragDrop.items.map(i => ({...i, placedBucket: null})));
        }
    }, [unitData?.id, unitData?.dragDrop]);
    
    const handleDrop = (e, targetBucket) => {
        e.preventDefault();
        const wordId = e.dataTransfer.getData('text/plain');
        setWords(prev => prev.map(w => w.id === wordId ? { ...w, placedBucket: targetBucket } : w));
    };

    const resetGame = () => {
        if (unitData?.dragDrop) {
            setWords(unitData.dragDrop.items.map(i => ({...i, placedBucket: null})));
        }
    };

    if (!unitData?.dragDrop) return <div className="p-10 text-center font-bold">Chưa có dữ liệu ghép từ.</div>;

    const getScore = () => words.filter(w => w.placedBucket === w.target).length;
    const total = words.length;

    return (
        <div className="bg-white rounded-3xl p-8 border-4 border-slate-800 shadow-[8px_8px_0_0_#1e293b] animate-in fade-in mb-10">
            <div className="flex justify-between items-center mb-8 border-b-4 border-dashed border-slate-200 pb-4">
                <div>
                    <h3 className="text-2xl font-black mb-2 flex items-center gap-2"><Gamepad2 className="text-rose-500"/> Phân loại từ vựng</h3>
                    <p className="font-bold text-slate-500">Kéo các từ bên dưới thả vào đúng nhóm ngữ pháp.</p>
                </div>
                <button 
                  onClick={resetGame} 
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl font-bold border-2 border-slate-800 transition-colors cursor-pointer"
                >
                    <RotateCcw size={18}/> Làm lại
                </button>
            </div>
            
            <div 
              className="flex flex-wrap gap-3 mb-10 min-h-[100px] p-6 bg-slate-50 border-4 border-dashed border-slate-300 rounded-3xl" 
              onDragOver={e=>e.preventDefault()} 
              onDrop={e=>handleDrop(e, null)}
            >
                {words.filter(w => !w.placedBucket).map(w => (
                    <div 
                      key={w.id} 
                      draggable 
                      onDragStart={e => e.dataTransfer.setData('text/plain', w.id)} 
                      className="bg-indigo-600 text-white font-black px-4 py-2 rounded-xl cursor-grab shadow-[2px_2px_0_0_#312e81] hover:-translate-y-1 transition-transform"
                    >
                        {w.word}
                    </div>
                ))}
                {words.filter(w => !w.placedBucket).length === 0 && <span className="text-slate-400 font-bold m-auto">Bạn đã xếp xong! Hãy kiểm tra điểm số.</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {unitData.dragDrop.buckets.map(bucket => (
                    <div 
                      key={bucket} 
                      onDragOver={e=>e.preventDefault()} 
                      onDrop={e=>handleDrop(e, bucket)} 
                      className="bg-white border-4 border-slate-800 rounded-3xl p-3 shadow-[4px_4px_0_0_#1e293b] min-h-[300px] flex flex-col"
                    >
                        <h4 className="text-center font-black text-lg mb-3 bg-yellow-300 py-2 rounded-xl border-2 border-slate-800 truncate">{bucket}</h4>
                        <div className="flex-1 flex flex-col gap-2">
                            {words.filter(w => w.placedBucket === bucket).map(w => (
                                <div 
                                  key={w.id} 
                                  draggable 
                                  onDragStart={e => e.dataTransfer.setData('text/plain', w.id)} 
                                  className={`font-bold px-2 py-2 rounded-lg border-2 cursor-grab text-center text-sm ${w.placedBucket === w.target ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800'}`}
                                >
                                    {w.word}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center font-black text-2xl text-slate-800 bg-slate-100 py-4 rounded-2xl border-4 border-slate-800 border-dashed">Điểm: {getScore()}/{total}</div>
        </div>
    );
};

export default DragDropTab;
