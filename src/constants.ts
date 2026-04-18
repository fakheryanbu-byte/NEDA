import { MenuCategory } from './types';

export const MENU_DATA: MenuCategory[] = [
  {
    id: 'breakfast',
    name: { ar: 'قائمة الفطور', en: 'Breakfast Menu' },
    sections: [
      {
        title: { ar: 'الصواني', en: 'Trays' },
        items: [
          { 
            name: { ar: 'فطور نداء', en: 'Neda Breakfast' }, 
            price: 75,
            description: { ar: 'فول مبخر ,معصوب , حمسة باذنجان , فلافل , مسبحة , قلاية بندورة', en: 'Smoked foul, Masoub, Eggplant hamsa, Falafel, Musabbaha, Tomato fry' },
            calories: 100
          },
          { 
            name: { ar: 'ترويقة الشيف', en: 'Chef\'s Tarweeqa' }, 
            price: 62,
            description: { ar: 'لبنة بالرمان, جبنة بالخلطة , حمسة حلوم, مش حجازي', en: 'Labneh with pomegranate, Mixed cheese, Halloumi hamsa, Hijazi Mish' },
            calories: 291
          },
          { name: { ar: 'صبوح صنعاني', en: 'Sana\'ani Breakfast' }, price: 85 },
        ],
      },
      {
        title: { ar: 'أطباق البيض', en: 'Egg Dishes' },
        items: [
          { 
            name: { ar: 'أومليت اسبانيول', en: 'Spanish Omelette' }, 
            price: 28,
            description: { ar: 'بيض مقلي بالخضار', en: 'Fried eggs with vegetables' },
            calories: 330
          },
          { 
            name: { ar: 'أومليت ماشروم', en: 'Mushroom Omelette' }, 
            price: 28,
            description: { ar: 'بيض مقلي مع الفطر', en: 'Fried eggs with mushroom' },
            calories: 475
          },
          { 
            name: { ar: 'تشيز أومليت', en: 'Cheese Omelette' }, 
            price: 28,
            description: { ar: 'بيض مقلي مع جبنة البارميزان و الموزوريلا', en: 'Fried eggs with Parmesan and Mozzarella cheese' },
            calories: 540
          },
          { 
            name: { ar: 'شكشكوكة', en: 'Shakshuka' }, 
            price: 20,
            description: { ar: 'البيض المحضر مع الخضروات الطازجة', en: 'Eggs prepared with fresh vegetables' }
          },
          { 
            name: { ar: 'بيض بندكت بالشمندر', en: 'Beetroot Eggs Benedict' }, 
            price: 35,
            description: { ar: 'بيض بنديكت مع البنجر بلمسة فريدة ولمذاق غني', en: 'Eggs Benedict with beets for a unique and rich flavor' }
          },
          { 
            name: { ar: 'تتريب', en: 'Tatreeb' }, 
            price: 25,
            description: { ar: 'بيض تركي بخلطة اللبن على طريقتنا الخاصة', en: 'Turkish eggs with yogurt mix in our special way' }
          },
        ],
      },
      {
        title: { ar: 'ساندويتشات الصباح', en: 'Morning Sandwiches' },
        items: [
          { 
            name: { ar: 'كروك مدام', en: 'Croque Madame' }, 
            price: 32,
            description: { ar: 'كروك مادام بلمسة فرنسية بطعم لذيذ', en: 'Croque Madame with a French touch and delicious taste' },
            calories: 545
          },
          { 
            name: { ar: 'كلوب ساندويتش', en: 'Club Sandwich' }, 
            price: 28,
            description: { ar: 'ساندويش كلوب مع مكونات متنوعة مثل اللحم والخضروات والصلصات', en: 'Club sandwich with various ingredients like meat, vegetables, and sauces' },
            calories: 625
          },
          { 
            name: { ar: 'شباتي بالجبنة', en: 'Chapati with Cheese' }, 
            price: 11,
            description: { ar: 'خبز طازج محضر من الدقيق و السمن بطعم لذيذ وشهي', en: 'Fresh bread made from flour and ghee, delicious and tasty' },
            calories: 195
          },
          { 
            name: { ar: 'شباتي بالبيض و الجبن', en: 'Chapati with Egg & Cheese' }, 
            price: 13,
            description: { ar: 'خبز طازج محضر من الدقيق و السمن بطعم لذيذ وشهي', en: 'Fresh bread made from flour and ghee, delicious and tasty' },
            calories: 271
          },
          { 
            name: { ar: 'اربيان كاساديا', en: 'Arabian Quesadilla' }, 
            price: 32,
            description: { ar: 'سندويتش كاساديا إفطار غني بحشوة الجبن والدجاج', en: 'Breakfast quesadilla sandwich rich with cheese and chicken filling' }
          },
        ],
      },
      {
        title: { ar: 'البيتزا', en: 'Pizza' },
        items: [
          { 
            name: { ar: 'البيتزا', en: 'Pizza' }, 
            price: 25,
            description: { ar: 'عجينة بيتزا ساخنة', en: 'Hot pizza dough' },
            calories: 170
          },
        ],
      },
      {
        title: { ar: 'تاكو ميكس', en: 'Taco Mix' },
        items: [
          { 
            name: { ar: 'تاكو فلافل', en: 'Falafel Taco' }, 
            price: 28,
            description: { ar: '4 قطع من التاكو', en: '4 pieces of taco' },
            calories: 365
          },
          { 
            name: { ar: 'تاكو حلومي', en: 'Halloumi Taco' }, 
            price: 28,
            description: { ar: '4 قطع من التاكو', en: '4 pieces of taco' },
            calories: 270
          },
          { 
            name: { ar: 'تاكو كبدة', en: 'Liver Taco' }, 
            price: 28,
            description: { ar: '4 قطع من التاكو', en: '4 pieces of taco' },
            calories: 320
          },
          { 
            name: { ar: 'تاكو باذنجان', en: 'Eggplant Taco' }, 
            price: 28,
            description: { ar: '4 قطع من التاكو', en: '4 pieces of taco' },
            calories: 220
          },
        ],
      },
      {
        title: { ar: 'أطباق الفطور', en: 'Breakfast Dishes' },
        items: [
          { 
            name: { ar: 'فول مبخر', en: 'Smoked Foul' }, 
            price: 15,
            description: { ar: 'فول مطبوخ على الطريقة التقليدية', en: 'Foul cooked in the traditional way' },
            calories: 530
          },
          { 
            name: { ar: 'معصوب نداء', en: 'Neda Masoub' }, 
            price: 16,
            description: { ar: 'أكلة شعبية محضرة من الخبز المفروم مع السمن', en: 'Traditional dish made from minced bread with ghee' },
            calories: 730
          },
          { 
            name: { ar: 'حمسة باذنجان', en: 'Eggplant Hamsa' }, 
            price: 15,
            description: { ar: 'صحن الباذنجان المحموس', en: 'Roasted eggplant plate' },
            calories: 425
          },
          { 
            name: { ar: 'فلافل', en: 'Falafel' }, 
            price: 15,
            description: { ar: 'ساندوتش فلافل شهية بطريقتنا الخاصة', en: 'Delicious falafel sandwich in our special way' },
            calories: 550
          },
          { 
            name: { ar: 'كبدة سكندراني', en: 'Alexandrian Liver' }, 
            price: 24,
            description: { ar: 'قطع الكبدة المطبوخة مع التتبيلة الخاصة', en: 'Liver pieces cooked with special seasoning' },
            calories: 410
          },
          { 
            name: { ar: 'كبدة بالرمان', en: 'Liver with Pomegranate' }, 
            price: 24,
            description: { ar: 'كبدة مطبوخه مع الخضار الطازجة', en: 'Liver cooked with fresh vegetables' },
            calories: 435
          },
        ],
      },
      {
        title: { ar: 'أجبان', en: 'Cheeses' },
        items: [
          { 
            name: { ar: 'حمسة حلوم', en: 'Halloumi Hamsa' }, 
            price: 26,
            description: { ar: 'ساندوتش جبن الحلوم بطريقتنا الخاصة', en: 'Halloumi cheese sandwich in our special way' },
            calories: 398
          },
        ],
      },
      {
        title: { ar: 'فطائر', en: 'Pies' },
        items: [
          { 
            name: { ar: 'خاشتبوري', en: 'Khachapuri' }, 
            price: 17,
            description: { ar: 'خاشتبوري خبز جورجي بالجبنة طازج وشهي جداً', en: 'Khachapuri Georgian cheese bread, fresh and very delicious' }
          },
          { 
            name: { ar: 'منقوشة لبنة بالزيتون', en: 'Labneh & Olives Manakish' }, 
            price: 14,
            description: { ar: 'منقوشة مع لبنة وزيتون طازج وشهي', en: 'Manakish with fresh and delicious labneh and olives' },
            calories: 240
          },
        ],
      },
      {
        title: { ar: 'مشروبات ساخنة', en: 'Hot Drinks' },
        items: [
          { 
            name: { ar: 'شاي', en: 'Tea' }, 
            price: 6,
            description: { ar: 'شاي أحمر ساخن', en: 'Hot red tea' },
            calories: 3
          },
          { 
            name: { ar: 'عدني', en: 'Adani Tea' }, 
            price: 9,
            description: { ar: 'شاي مع اضافة الزعفران والهيل', en: 'Tea with saffron and cardamom' },
            calories: 38
          },
        ],
      },
      {
        title: { ar: 'مشروبات باردة', en: 'Cold Drinks' },
        items: [
          { 
            name: { ar: 'مياه معدنية', en: 'Mineral Water' }, 
            price: 2,
            description: { ar: 'مياة معدنية معبأة', en: 'Bottled mineral water' },
            calories: 1
          },
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
