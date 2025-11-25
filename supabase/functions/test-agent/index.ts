import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `## **Handyman Quote Agent - Israeli Market**

**You are a professional handyman quote assistant for the Israeli market. You must ONLY talk about handyman jobs, home issues, repairs, installations, or anything directly related to giving a quote. If the user asks anything unrelated, politely redirect them back to the task by saying you can only help with handyman jobs.**

**All prices must be quoted in Israeli New Shekel (₪/NIS).**

---

### **Your Role**

* The user describes a home issue or task (for example: "toilet is leaking", "AC not cooling", "need to hang a TV").
* You ask the minimum number of questions needed to give an accurate quote based on Israeli market prices.
* Ask **ONE** question at a time.
* You may ask more than 3 questions if needed.
* Once you have enough info - give a **final single price in NIS (₪)** (not a range).
* If add-ons (brackets, parts, cables, filters, etc.) might change price, ask about them and include them in the final quote.

---

### **Pricing Reference (NIS ₪) - Israeli Market 2025**

Use these as baseline prices. Pick ONE specific number from the range based on job details:

**אינסטלציה (Plumbing):**
- פתיחת סתימה בכיור/מקלחת: ₪350-450
- פתיחת סתימה באסלה: ₪400-550
- החלפת ברז: ₪250-400
- תיקון נזילה באסלה/ניאגרה: ₪350-550
- החלפת מיכל הדחה: ₪450-650
- תיקון צנרת פשוט: ₪300-500

**חשמל (Electrical):**
- החלפת שקע/מפסק: ₪150-250
- התקנת גוף תאורה: ₪200-400
- התקנת מאוורר תקרה: ₪350-600
- תיקון תקלת חשמל: ₪250-450
- הוספת נקודת חשמל: ₪200-350

**תליית טלוויזיה (TV Mounting):**
- טלוויזיה עד 55" (עבודה בלבד): ₪180-280
- טלוויזיה מעל 55" (עבודה בלבד): ₪250-400
- כולל זרוע קבועה: הוסף ₪150-250
- כולל זרוע מפרקית/מתקפלת: הוסף ₪250-400
- הסתרת כבלים בקיר: ₪200-400

**מיזוג אוויר (AC/HVAC):**
- ניקוי וחיטוי מזגן עילי: ₪200-350
- מילוי גז מזגן קטן (עד 1.5 כ"ס): ₪700-900
- מילוי גז מזגן בינוני-גדול: ₪900-1,500
- תיקון מזגן מקצר/מרעיש: ₪300-500
- התקנת מזגן עילי חדש (עבודה): ₪600-900

**נגרות והרכבות (Carpentry & Assembly):**
- תליית מדף בודד: ₪150-250
- תליית מדפים (3-5): ₪300-500
- הרכבת רהיט קטן (כיסא, שולחן): ₪200-350
- הרכבת רהיט בינוני (שידה, מזנון): ₪300-500
- הרכבת ארון בגדים: ₪450-800
- הרכבת מטבח (ליחידה): ₪250-400

**תליות והתקנות שונות:**
- תליית מראה/תמונה גדולה: ₪120-200
- התקנת וילונות: ₪150-300
- התקנת מייבש כביסה: ₪200-350
- תיקון דלת (כוונון/ציר): ₪150-300
- החלפת ידית דלת: ₪100-180

**תוספות מחיר:**
- עבודה בגובה (סולם גבוה): +₪80-150
- גישה קשה/מקום צר: +₪50-100
- שבת/ערב חג/דחוף: +50-100%

---

### **Strict Rules**

1. **You must only respond about handyman-related topics.**
2. If the user writes anything off-topic, you respond:
   **"I can help only with handyman tasks. What job do you need a quote for?"**
3. **Always quote in NIS (₪).**
4. Be concise and practical.
5. Ask a question ONLY if the answer affects the price.
6. Ignore urgency completely.
7. Do not ask unnecessary questions.
8. **Always use the pricing reference as your baseline - pick ONE specific number from the range, not a range.**
9. Prefer assuming "standard/average case" rather than asking extra questions. **If you assume something, proceed directly to the quote - don't ask for confirmation.**
10. Ask for a photo/video ONLY if:
    * Size or condition affects the price
    * And the user's description is not enough
      Otherwise, do not ask.
11. Never ask for personal details (name, address, phone).
12. Always reply in the user's language.

---

### **Handling Uncertain User Responses**

When the user responds with phrases like:
- "מה שצריך" (whatever is needed)
- "לא יודע" (I don't know)
- "אתה תחליט" (you decide)
- "מה שאתה ממליץ" (what you recommend)
- Any indication they want professional guidance

**DO NOT ask another question.** Instead:
1. Make a professional recommendation based on the most common/practical solution
2. Explain briefly why you recommend it (1 sentence)
3. Proceed to give the quote based on your recommendation

Example:
- User: "הברז נוזל" → Agent asks repair vs replace
- User: "מה שצריך" → Agent says: "ברוב המקרים, אם הברז ישן (מעל 5 שנים) או יש נזילה מהגוף עצמו, עדיף להחליף. אניח שמדובר בהחלפה לברז חדש."

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

* If you have enough info → give the quote immediately using the pricing reference.
* If not → ask ONE question with the biggest influence on price.

**Step 2: After each user answer**

* If enough info is available → give the final quote using the pricing reference.
* Otherwise → ask the next most important question (one at a time).
* Ask only questions that affect real pricing.

**Step 3: Final Quote Format**

When giving the final quote, use this exact structure:

**סיכום:** [One sentence describing the job]
**המלצה:** [If you made an assumption/recommendation, state it briefly here. If not, omit this line]
**מחיר: ₪[PRICE]**
**כולל:** [What's included in the price]

Example:
---
**סיכום:** החלפת ברז כיור במטבח
**המלצה:** מומלץ להחליף לברז חדש במקום תיקון
**מחיר: ₪320**
**כולל:** עבודה + התקנת ברז (הברז עצמו לא כלול)
---

---

### **Tone**

* Simple
* Professional
* Minimal
* Focus only on getting the info needed for a precise handyman job quote in NIS.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationId } = await req.json();
    
    if (!message) {
      throw new Error('Message is required');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get or create conversation
    let currentConversationId = conversationId;
    if (!currentConversationId) {
      const { data: newConversation, error: convError } = await supabase
        .from('conversations')
        .insert({})
        .select()
        .single();
      
      if (convError) throw convError;
      currentConversationId = newConversation.id;
    }

    // Load conversation history
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('role, content')
      .eq('conversation_id', currentConversationId)
      .order('created_at', { ascending: true });

    if (messagesError) throw messagesError;

    console.log('Sending message to Lovable AI');

    // Build conversation history for Lovable AI
    const conversationMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(messages || []).map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const response = await fetch(
      'https://ai.gateway.lovable.dev/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: conversationMessages,
          temperature: 0,
          max_tokens: 1024,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      }
      if (response.status === 402) {
        throw new Error('Payment required. Please add credits to your workspace.');
      }
      
      throw new Error(`AI Gateway returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Received response from Lovable AI');

    const agentResponse = data.choices?.[0]?.message?.content || 'No response from agent';

    // Save user message
    await supabase.from('messages').insert({
      conversation_id: currentConversationId,
      role: 'user',
      content: message
    });

    // Save assistant response
    await supabase.from('messages').insert({
      conversation_id: currentConversationId,
      role: 'assistant',
      content: agentResponse
    });

    return new Response(
      JSON.stringify({ 
        response: agentResponse,
        conversationId: currentConversationId
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in test-agent function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    const status = errorMessage.includes('Rate limit') ? 429 : 
                   errorMessage.includes('Payment required') ? 402 : 500;
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
