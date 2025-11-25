import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { getRandomQuote, SalesQuote } from '../data/quotes';

interface QuoteWidgetProps {
    transparent?: boolean;
}

export const QuoteWidget: React.FC<QuoteWidgetProps> = ({ transparent }) => {
    const [quote, setQuote] = useState<SalesQuote | null>(null);

    useEffect(() => {
        setQuote(getRandomQuote());
    }, []);

    if (!quote) return null;

    return (
        <div className={`${transparent ? '' : 'bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg mb-6'} p-6 text-white relative overflow-hidden`}>
            <div className="absolute top-0 right-0 -mt-4 -mr-4 text-white opacity-10">
                <Quote size={100} />
            </div>
            <div className="relative z-10">
                <h3 className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Quote of the Day</h3>
                <p className="text-xl md:text-2xl font-medium italic leading-relaxed mb-3">"{quote.text}"</p>
                <p className="text-sm font-bold opacity-90">— {quote.author}</p>
            </div>
        </div>
    );
};