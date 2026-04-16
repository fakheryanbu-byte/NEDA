import { MenuCategory } from './types';

export const MENU_DATA: MenuCategory[] = [
  {
    id: 'breakfast',
    name: { ar: 'قائمة الفطور', en: 'Breakfast Menu' },
    sections: [
      {
        title: { ar: 'الصواني', en: 'Trays' },
        items: [
          { name: { ar: 'ترويقة شيف', en: 'Chef\'s Breakfast' }, price: 45 },
          { name: { ar: 'فطور نداء', en: 'Neda Breakfast' }, price: 75 },
          { name: { ar: 'صبوح صنعاني', en: 'Sana\'ani Breakfast' }, price: 85 },
        ],
      },
      {
        title: { ar: 'أطباق البيض', en: 'Egg Dishes' },
        items: [
          { name: { ar: 'اومليت اسبانيول', en: 'Spanish Omelette' }, price: 26 },
          { name: { ar: 'اومليت مشروم', en: 'Mushroom Omelette' }, price: 28 },
          { name: { ar: 'تشيز اومليت', en: 'Cheese Omelette' }, price: 26 },
          { name: { ar: 'تتريب', en: 'Tatreeb' }, price: 24 },
          { name: { ar: 'شكشوكة', en: 'Shakshuka' }, price: 15 },
          { name: { ar: 'لحسة بيض بالجبن', en: 'Lahsa Egg with Cheese' }, price: 17 },
        ],
      },
      {
        title: { ar: 'أوبن فيس ساندويتش', en: 'Open Face Sandwich' },
        items: [
          { name: { ar: 'بندكت مع الشمندر والافوكادو', en: 'Benedict with Beetroot & Avocado' }, price: 32 },
          { name: { ar: 'سكرمبل ايق مع سوردو', en: 'Scrambled Egg with Sourdough' }, price: 22 },
          { name: { ar: 'شكشوكة مع سوردو', en: 'Shakshuka with Sourdough' }, price: 25 },
        ],
      },
      {
        title: { ar: 'ساندويش الصباح', en: 'Morning Sandwiches' },
        items: [
          { name: { ar: 'كروك مدام', en: 'Croque Madame' }, price: 32 },
          { name: { ar: 'شبات بالجبن', en: 'Chapati with Cheese' }, price: 9 },
          { name: { ar: 'كلوب ساندوتش', en: 'Club Sandwich' }, price: 25 },
          { name: { ar: 'شباتي بالجبن والبيض', en: 'Chapati with Cheese & Egg' }, price: 11 },
          { name: { ar: 'كاساديا عربية', en: 'Arabic Quesadilla' }, price: 28 },
        ],
      },
      {
        title: { ar: 'تاكو ميكس', en: 'Taco Mix' },
        items: [
          { name: { ar: 'تاكو فلافل', en: 'Falafel Taco' }, price: 26 },
          { name: { ar: 'تاكو حلوم', en: 'Halloumi Taco' }, price: 28 },
          { name: { ar: 'تاكو كبدة', en: 'Liver Taco' }, price: 28 },
          { name: { ar: 'تاكو باذنجان', en: 'Eggplant Taco' }, price: 22 },
        ],
      },
      {
        title: { ar: 'أطباق فطور جانبية', en: 'Side Breakfast Dishes' },
        items: [
          { name: { ar: 'عدس مع شباتي', en: 'Lentils with Chapati' }, price: 15 },
          { name: { ar: 'فول مبخر', en: 'Smoked Foul' }, price: 15 },
          { name: { ar: 'فول صنعاني', en: 'Sana\'ani Foul' }, price: 15 },
          { name: { ar: 'حمسة باذنجان', en: 'Eggplant Hamsa' }, price: 17 },
          { name: { ar: 'طبق فلافل', en: 'Falafel Plate' }, price: 15 },
          { name: { ar: 'معصوب', en: 'Masoub' }, price: 15 },
          { name: { ar: 'عريكة', en: 'Areeka' }, price: 25 },
          { name: { ar: 'مسبحة', en: 'Musabbaha' }, price: 15 },
          { name: { ar: 'كبدة إسكندراني', en: 'Alexandrian Liver' }, price: 22 },
          { name: { ar: 'كبدة بالرمان', en: 'Liver with Pomegranate' }, price: 24 },
          { name: { ar: 'كبدة صنعاني', en: 'Sana\'ani Liver' }, price: 25 },
        ],
      },
      {
        title: { ar: 'من الفرن', en: 'From the Oven' },
        items: [
          { name: { ar: 'بيتزا بالخضار', en: 'Vegetable Pizza' }, price: 25 },
          { name: { ar: 'فطيرة جبن موتزاريلا', en: 'Mozzarella Cheese Pie' }, price: 15 },
          { name: { ar: 'فطيرة جبن بالزعتر', en: 'Cheese & Zaatar Pie' }, price: 16 },
          { name: { ar: 'فطيرة لبنه', en: 'Labneh Pie' }, price: 15 },
          { name: { ar: 'فطيرة لبنه وزعتر', en: 'Labneh & Zaatar Pie' }, price: 16 },
          { name: { ar: 'فطيرة زعتر', en: 'Zaatar Pie' }, price: 14 },
          { name: { ar: 'فطيرة جبنة كاسات', en: 'Cream Cheese Pie' }, price: 14 },
          { name: { ar: 'فطيرة لبنة بالعسل', en: 'Labneh & Honey Pie' }, price: 15 },
          { name: { ar: 'فطيرة لبنة وزيتون', en: 'Labneh & Olives Pie' }, price: 15 },
          { name: { ar: 'خاشتبوري', en: 'Khachapuri' }, price: 15 },
          { name: { ar: 'بيتزا الفلافل', en: 'Falafel Pizza' }, price: 22 },
        ],
      },
      {
        title: { ar: 'أجبان', en: 'Cheeses' },
        items: [
          { name: { ar: 'سحاوق جبن', en: 'Cheese Sahawiq' }, price: 15 },
          { name: { ar: 'حمسة حلوم', en: 'Halloumi Hamsa' }, price: 25 },
          { name: { ar: 'مش حجازي', en: 'Hijazi Mish' }, price: 25 },
          { name: { ar: 'جبة بخلطة خاصة', en: 'Special Mix Cheese' }, price: 25 },
          { name: { ar: 'لبنة بالرمان', en: 'Labneh with Pomegranate' }, price: 25 },
        ],
      },
      {
        title: { ar: 'إضافات', en: 'Add-ons' },
        items: [
          { name: { ar: 'هاش براون', en: 'Hash Brown' }, price: 12 },
          { name: { ar: 'خبز', en: 'Bread' }, price: 7 },
          { name: { ar: 'فتوت', en: 'Fatout' }, price: 6 },
          { name: { ar: 'بطاطس مقلية', en: 'French Fries' }, price: 10 },
        ],
      },
      {
        title: { ar: 'حلويات', en: 'Sweets' },
        items: [
          { name: { ar: 'بان كيك', en: 'Pancake' }, price: 25 },
          { name: { ar: 'فرينش توست بروليه', en: 'French Toast Brulee' }, price: 25 },
          { name: { ar: 'فرين توست ملفيه', en: 'French Toast Mille-feuille' }, price: 25 },
        ],
      },
      {
        title: { ar: 'مشروبات باردة', en: 'Cold Drinks' },
        items: [
          { name: { ar: 'عصير برتقال', en: 'Orange Juice' }, price: 18 },
          { name: { ar: 'مشروب غازي', en: 'Soft Drink' }, price: 5 },
          { name: { ar: 'مياه', en: 'Water' }, price: 2 },
        ],
      },
      {
        title: { ar: 'مشروبات ساخنة', en: 'Hot Drinks' },
        items: [
          { name: { ar: 'كوب عدني', en: 'Adani Cup' }, price: 7 },
          { name: { ar: 'كوب شاي احمر', en: 'Red Tea Cup' }, price: 5 },
          { name: { ar: 'براد شاي احمر', en: 'Red Tea Pot' }, price: 10 },
          { name: { ar: 'براد شاي عدني', en: 'Adani Tea Pot' }, price: 15 },
          { name: { ar: 'قهوة امريكي', en: 'American Coffee' }, price: 8 },
        ],
      },
    ],
  },
  {
    id: 'sushi',
    name: { ar: 'قائمة السوشي', en: 'Sushi Menu' },
    sections: [
      {
        title: { ar: 'المقبلات', en: 'Appetizers' },
        items: [
          { name: { ar: 'إدامامي حار', en: 'Spicy Edamame' }, price: 25 },
          { name: { ar: 'سلطة كابوريا', en: 'Crab Salad' }, price: 30 },
          { name: { ar: 'ديناميت روبيان', en: 'Dynamite Shrimp' }, price: 35 },
          { name: { ar: 'تمبورا روبيان', en: 'Shrimp Tempura' }, price: 38 },
          { name: { ar: 'جيوزا روبيان', en: 'Shrimp Gyoza' }, price: 45 },
          { name: { ar: 'جيوزا دجاج', en: 'Chicken Gyoza' }, price: 45 },
        ],
      },
      {
        title: { ar: 'سوشي وماكي رول', en: 'Sushi and Maki Roll' },
        items: [
          { name: { ar: 'جولدن كريزي رول', en: 'Golden Crazy Roll' }, price: 65 },
          { name: { ar: 'ديناميت روبيان رول', en: 'Dynamite Shrimp Roll' }, price: 65 },
          { name: { ar: 'ديناميت دجاج رول', en: 'Dynamite Chicken Roll' }, price: 65 },
          { name: { ar: 'دراجون رول أفوكادو', en: 'Dragon Roll Avocado' }, price: 52 },
          { name: { ar: 'كرسبي كابوريا مع مانجو', en: 'Crispy Crab with Mango' }, price: 48 },
          { name: { ar: 'كاليفورنيا رول', en: 'California Roll' }, price: 45 },
          { name: { ar: 'فيجي رول', en: 'Veggie Roll' }, price: 35 },
        ],
      },
      {
        title: { ar: 'سوشي مكس', en: 'Sushi Mix' },
        items: [
          { name: { ar: 'سوشي 16 قطعة (3 أنواع)', en: 'Sushi 16 Pieces (3 Types)' }, price: 99 },
          { name: { ar: 'سوشي 20 قطعة (5 أنواع)', en: 'Sushi 20 Pieces (5 Types)' }, price: 120 },
          { name: { ar: 'سوشي بول كبير', en: 'Large Sushi Bowl' }, price: 65 },
          { name: { ar: 'سوشي بول متوسط', en: 'Medium Sushi Bowl' }, price: 55 },
          { name: { ar: 'سوشي بول صغير', en: 'Mini Sushi Bowl' }, price: 30 },
        ],
      },
      {
        title: { ar: 'الطبق الرئيسي', en: 'Main Course' },
        items: [
          { name: { ar: 'دجاج كاتسو كاري', en: 'Chicken Katsu Curry' }, price: 45 },
          { name: { ar: 'باو لحم', en: 'Beef Bao' }, price: 48 },
          { name: { ar: 'باو دجاج', en: 'Chicken Bao' }, price: 45 },
          { name: { ar: 'باو مكس', en: 'Mixed Bao' }, price: 48 },
        ],
      },
    ],
  },
];
