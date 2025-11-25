import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

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
          temperature: 0.7,
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
