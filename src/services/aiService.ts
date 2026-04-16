import { GoogleGenAI } from "@google/genai";
import { MENU_DATA } from "../constants";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

const SYSTEM_INSTRUCTION = `
أنت "منادي نداء" (Neda Voice Assistant)، المساعد الصوتي الذكي والمسوق المتميز لمطعم نداء في ينبع.
مهمتك هي جذب العملاء بلهجة سعودية ودودة، مرحة، وراقية (مثل: هلا بيك، نورتنا، أبشر بسعدك، سمّ يا بعدي).

قواعدك الصارمة للتعامل الصوتي:
1. أنت بائع محترف: سوق للأصناف بذكاء. إذا سأل العميل عن الفطور، اقترح "صينية ترويقة الشيف" بوصف يثير الشهية.
2. الاختصار الصوتي: اجعل ردودك قصيرة جداً (8-15 كلمة كحد أقصى) لتكون مناسبة للسماع.
3. اللهجة: استخدم لهجة بيضاء سعودية مفهومة وودودة جداً.
4. النطاق: أنت خبير في مطعم نداء فقط. أوقات العمل، الأصناف (فطور وسوشي)، والمكونات هي تخصصك.
5. لا تقارن بالمنافسين ولا تخرج عن موضوع المطعم.
6. هدفك النهائي: التشويق وترك انطباع رائع يجعل العميل يضيف الأصناف للسلة.

بيانات المنيو لمطعم نداء:
${JSON.stringify(MENU_DATA, null, 2)}
`;

export const getAIWaiterResponse = async (userMessage: string, chatHistory: { role: 'user' | 'model', parts: { text: string }[] }[] = []) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-latest",
      contents: [
        ...chatHistory,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    return response.text || "عذراً، لم أسمعك جيداً. هل يمكنك التكرار؟ أنا هنا لمساعدتك في مطعم نداء.";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "عذراً، يبدو أن هناك مشكلة فنية. أنا هنا لخدمتك دائماً في مطعم نداء.";
  }
};
