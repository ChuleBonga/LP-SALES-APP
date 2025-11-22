import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { getSuccessQuote } from '../data/quotes';
import { Trophy } from 'lucide-react';

export const CelebrationOverlay: React.FC = () => {
    const quote = getSuccessQuote();

    useEffect(() => {
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#0088BB', '#003B5C', '#FCD34D']
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#0088BB', '#003B5C', '#FCD34D']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center relative animate-fade-in-up border-4 border-brand-light transform scale-110">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-brand-light rounded-full p-4 shadow-lg">
                    <Trophy className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-3xl font-extrabold text-brand-dark mt-4 mb-2">Deal Closed!</h2>
                <p className="text-gray-500 mb-6 font-medium">Outstanding work.</p>
                
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                    <p className="text-lg font-serif text-gray-800 italic">"{quote.text}"</p>
                    <p className="text-sm text-gray-400 mt-2 font-bold uppercase tracking-wide">— {quote.author}</p>
                </div>
            </div>
        </div>
    );
};