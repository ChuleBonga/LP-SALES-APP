
// This service now handles local template generation to avoid API costs

export const generateFollowUpEmail = async (
  firstName: string, 
  lastName: string, 
  company: string, 
  notes: string
): Promise<string> => {
  // Simulate a short delay for "processing" feel, though not strictly necessary
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return buildFallbackEmail(firstName, company, notes);
};

function buildFallbackEmail(firstName: string, company: string, callNotes: string) {
  const notesSentence = callNotes?.trim()
    ? `As discussed, ${callNotes.trim()}\n\n`
    : "";

  return `Hi ${firstName},

Thank you for taking the time to speak with me about language services for ${company}.

${notesSentence}If you have any questions or would like to explore next steps, simply reply to this email and our team will be happy to help.

Best regards,
The Language People Team`;
}
