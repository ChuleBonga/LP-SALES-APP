export interface SalesQuote {
    category: string;
    text: string;
    author: string;
}

export const QUOTES: SalesQuote[] = [
    { category: "Resilience & Handling Rejection", text: "Every sale has five obstacles: no need, no money, no hurry, no desire, no trust.", author: "Zig Ziglar" },
    { category: "Resilience & Handling Rejection", text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
    { category: "The Hustle & Discipline", text: "Success is rented, not owned. And the rent is due every day.", author: "Rory Vaden" },
    { category: "Customer Focus", text: "Stop selling. Start helping.", author: "Zig Ziglar" },
    { category: "Closing & Results", text: "Coffee is for closers.", author: "Alec Baldwin" },
    { category: "Mindset & Vision", text: "Your attitude, not your aptitude, will determine your altitude.", author: "Zig Ziglar" },
    { category: "Closing & Results", text: "Always Be Closing.", author: "David Mamet" },
    { category: "Resilience & Handling Rejection", text: "I have not failed. I’ve just found 10,000 ways that won’t work.", author: "Thomas Edison" },
    { category: "Resilience & Handling Rejection", text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
    { category: "The Hustle & Discipline", text: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
    { category: "Customer Focus", text: "People don’t buy what you do; they buy why you do it.", author: "Simon Sinek" },
    { category: "Closing & Results", text: "Winning isn’t everything, but wanting to win is.", author: "Vince Lombardi" },
    { category: "Mindset & Vision", text: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
    // Add more from the list as needed...
    { category: "Short Mantras", text: "Execution eats strategy for breakfast.", author: "Unknown" },
    { category: "Short Mantras", text: "One more call.", author: "Unknown" },
    { category: "Short Mantras", text: "Results, not excuses.", author: "Unknown" }
];

export const getRandomQuote = (): SalesQuote => {
    return QUOTES[Math.floor(Math.random() * QUOTES.length)];
};

export const getSuccessQuote = (): SalesQuote => {
    const successQuotes = QUOTES.filter(q => q.category === "Closing & Results" || q.category === "Short Mantras");
    if (successQuotes.length > 0) {
        return successQuotes[Math.floor(Math.random() * successQuotes.length)];
    }
    return getRandomQuote();
};