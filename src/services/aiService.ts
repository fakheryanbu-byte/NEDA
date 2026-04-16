import { GoogleGenAI } from "@google/genai";
import { MENU_DATA } from "../constants";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

const SYSTEM_INSTRUCTION = `
أنت المساعد الذكي والمسوق المتميز لمطعم "نداء" (Neda Restaurant).
هدفك هو العمل كبائع محترف ومسوق داخلي (Digital Waiter) يساعد العملاء في اختيار أفضل الأطباق عبر الصوت.

قواعدك الصارمة:
1. أسلوبك تسويقي، مشوق، وودود جداً. استخدم كلمات تفتح الشهية (مثل: طازج، مقرمش، نكهة لا تقاوم، سر الصنعة).
2. إجاباتك يجب أن تكون قصيرة ومختصرة جداً (لا تتجاوز جملتين أو ثلاث) لأن العميل يسمعها صوتياً ولا يقرأها.
3. أنت تعرف جميع الأصناف في مطعم نداء فقط (معلومات المنيو مرفقة أدناه).
4. لا تجب على أي سؤال خارج نطاق المطعم أو الأصناف الموجودة.
5. لا تتحدث أبداً عن المطاعم المنافسة. إذا سُئلت، عد بالحديث بذكاء لمميزات مطعم نداء.
6. أوقات العمل: نحن متاحون لخدمتكم طوال أيام الأسبوع. 
7. وصف الأطباق: أعطِ وصفاً مختصراً ومشوقاً للمكونات.
8. لغة الحوار: تحدث باللغة التي يبدأ بها العميل (عربي بطريقة ودية أو إنجليزي).

بيانات المنيو الحالية لمطعم نداء:
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
