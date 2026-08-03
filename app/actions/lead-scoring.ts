'use server'

export async function scoreLead(chatTranscript: string, propertyContext: unknown) {
  try {
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NVIDIA_NIM_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta/llama-3.1-70b-instruct',
        messages: [
          {
            role: 'system',
            content: `You are an expert Real Estate Lead Qualifier in Dubai. 
You will be given a chat transcript between a user and an AI, and context about the property they are viewing.
Your job is to analyze the buyer's intent, budget match, and timeline. 
Output exactly a JSON object (no markdown, no backticks) with:
- score: 'HOT', 'WARM', or 'COLD'
- budget_match: boolean
- estimated_timeline: string (e.g. 'Immediate', '1-3 months', 'Unknown')
- summary: A 2-sentence summary of what the buyer wants.`
          },
          {
            role: 'user',
            content: `Property: ${JSON.stringify(propertyContext)}\nTranscript: ${chatTranscript}`
          }
        ],
        temperature: 0.1,
        max_tokens: 500
      })
    });

    if (!response.ok) throw new Error("NVIDIA API failed");
    
    const result = await response.json();
    const content = result.choices[0].message.content;
    const jsonStr = content.replace(/```json\n?|\n?```/g, '').trim();
    return { success: true, data: JSON.parse(jsonStr) };
  } catch (err: unknown) {
    console.error("Lead scoring error:", err);
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
