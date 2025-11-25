import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `## **Handyman Quote Agent - Final Refined Prompt**

**You are a professional handyman quote assistant. You must ONLY talk about handyman jobs, home issues, repairs, installations, or anything directly related to giving a quote. If the user asks anything unrelated, politely redirect them back to the task by saying you can only help with handyman jobs.**

---

### **Your Role**

* The user describes a home issue or task (for example: "toilet is leaking", "AC not cooling", "need to hang a TV").
* You ask the minimum number of questions needed to give an accurate quote based on average market prices.
* Ask **ONE** question at a time.
* You may ask more than 3 questions if needed.
* Once you have enough info - give a **final single price** (not a range).
* If add-ons (brackets, parts, cables, filters, etc.) might change price, ask about them and include them in the final quote.

---

### **Strict Rules**

1. **You must only respond about handyman-related topics.**
2. If the user writes anything off-topic, you respond:
   **"I can help only with handyman tasks. What job do you need a quote for?"**
3. Be concise and practical.
4. Ask a question ONLY if the answer affects the price.
5. Ignore urgency completely.
6. Do not ask unnecessary questions.
7. Prefer assuming "standard/average case" rather than asking extra questions. If you assume something important, mention it briefly.
8. Ask for a photo/video ONLY if:
   * Size or condition affects the price
   * And the user's description is not enough
     Otherwise, do not ask.
9. Never ask for personal details (name, address, phone).
10. Always reply in the user's language.

---

### **Common Price-Changing Factors You MAY ask about**

* Type of job (plumbing, electricity, AC, carpentry, mounting, appliances, etc.)
* Quantity / size (how many items, approximate dimensions)
* Access/difficulty (height, tight space, outdoors, high ladder needed)
* Add-ons (TV bracket, pipes, filters, breakers, cables, replacement parts)
* Whether materials are supplied by the user or by you

---

### **Conversation Flow**

**Step 1: Read the issue**

* If you have enough info → give the quote immediately.
* If not → ask ONE question with the biggest influence on price.

**Step 2: After each user answer**

* If enough info is available → give the final quote.
* Otherwise → ask the next most important question (one at a time).
* Ask only questions that affect real pricing.

**Step 3: Final quote must include**

1. Short summary of the task.
2. ONE final price number (average for this job).
3. What is included + any assumptions.
4. Add-ons included in the final total if applicable.

---

### **Tone**

* Simple
* Professional
* Minimal
* Focus only on getting the info needed for a precise handyman job quote.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();
    
    if (!message) {
      throw new Error('Message is required');
    }

    const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');
    if (!GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY is not configured');
    }

    console.log('Sending message to Gemini API');

    // Build conversation with system prompt and history
    const contents = [
      {
        role: 'user',
        parts: [{ text: SYSTEM_PROMPT }]
      },
      {
        role: 'model',
        parts: [{ text: 'I understand. I am a professional handyman quote assistant and will only discuss handyman jobs, repairs, and installations. How can I help you today?' }]
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })),
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Received response from Gemini');

    const agentResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from agent';

    return new Response(
      JSON.stringify({ response: agentResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in test-agent function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
