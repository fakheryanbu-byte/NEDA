import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Coffee, Info, MapPin, Phone, Instagram, ChevronRight, Menu as MenuIcon, X, ShoppingCart, Plus, Minus, Trash2, Send, Languages } from 'lucide-react';
import { MENU_DATA } from './constants';
import { MenuCategory, CartItem, MenuItem } from './types';
import { supabase } from './supabase';
import { AIWaiter } from './components/AIWaiter';

const RESTAURANT_PHONE = '966567107510';

type Language = 'ar' | 'en';

const translations = {
  ar: {
    restaurantName: 'نداء',
    heroTitle: 'مطعم نداء',
    heroSubtitle: 'فطور أصيل & سوشي طازج',
    menu: 'القائمة',
    about: 'عن المطعم',
    contact: 'اتصل بنا',
    cart: 'سلة الطلبات',
    emptyCart: 'السلة فارغة حالياً',
    startAdding: 'ابدأ بإضافة الأصناف',
    total: 'الإجمالي',
    sendWhatsApp: 'إرسال الطلب عبر واتساب',
    clearCart: 'مسح السلة',
    orderTitle: 'طلب جديد من مطعم نداء',
    currency: 'ريال',
    footerDesc: 'نقدم لكم تجربة فريدة تجمع بين أصالة الفطور الشعبي وحداثة السوشي الياباني، في أجواء مستوحاة من الجمال اليوناني.',
    location: 'المملكة العربية السعودية، مدينة ينبع',
    rights: 'جميع الحقوق محفوظة.',
  },
  en: {
    restaurantName: 'Neda',
    heroTitle: 'Neda Restaurant',
    heroSubtitle: 'Authentic Breakfast & Fresh Sushi',
    menu: 'Menu',
    about: 'About Us',
    contact: 'Contact Us',
    cart: 'Shopping Cart',
    emptyCart: 'Your cart is currently empty',
    startAdding: 'Start adding items',
    total: 'Total',
    sendWhatsApp: 'Send Order via WhatsApp',
    clearCart: 'Clear Cart',
    orderTitle: 'New Order from Neda Restaurant',
    currency: 'SAR',
    footerDesc: 'We offer a unique experience combining authentic traditional breakfast with modern Japanese sushi, in an atmosphere inspired by Greek beauty.',
    location: 'Saudi Arabia, Yanbu City',
    rights: 'All rights reserved.',
  }
};

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/Kg8S4oPE3GLDMGPSA';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [activeCategory, setActiveCategory] = useState<string>('breakfast');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentCategory = MENU_DATA.find(cat => cat.id === activeCategory) || MENU_DATA[0];

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.name.ar === item.name.ar);
      if (existing) {
        return prev.map(i => i.name.ar === item.name.ar ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (nameAr: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.name.ar === nameAr);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.name.ar === nameAr ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.name.ar !== nameAr);
    });
  };

  const clearCart = () => setCart([]);

  const sendToWhatsApp = async () => {
    if (cart.length === 0) return;

    // 1. Construct the WhatsApp message
    let message = `*${t.orderTitle}*\n\n`;
    cart.forEach(item => {
      message += `• ${item.name[lang]} (${item.quantity}) - ${item.price * item.quantity}${t.currency}\n`;
    });
    message += `\n*${t.total}: ${cartTotal}${t.currency}*`;
    message += `\n\nThank you for your order!`;

    const encodedMessage = encodeURIComponent(message);

    // 2. Save the order to Supabase (Optional/Background)
    try {
      const { error } = await supabase
        .from('orders')
        .insert([
          { 
            items: cart, 
            total_price: cartTotal, 
            status: 'pending',
            language: lang
          }
        ]);
      
      if (error) {
        console.error('Error saving order to Supabase:', error.message);
      } else {
        console.log('Order saved successfully to Supabase');
      }
    } catch (err) {
      console.error('Unexpected error saving to Supabase:', err);
    }

    // 3. Open WhatsApp
    window.open(`https://wa.me/${RESTAURANT_PHONE}?text=${encodedMessage}`, '_blank');
  };

  const toggleLang = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <div className={`min-h-screen bg-greek-white flex flex-col font-sans ${lang === 'ar' ? 'font-arabic' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-greek-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-md mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-greek-blue rounded-full flex items-center justify-center text-white font-serif text-xl font-bold">
              {lang === 'ar' ? 'ن' : 'N'}
            </div>
            <span className={`font-serif text-xl font-bold text-greek-blue`}>
              {t.restaurantName}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={toggleLang}
              className="p-2 text-greek-blue flex items-center gap-1 text-sm font-bold"
            >
              <Languages size={20} />
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-greek-blue"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-greek-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-greek-blue"
            >
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: lang === 'ar' ? 100 : -100 }}
            className="fixed inset-0 z-40 bg-greek-white pt-20 px-6"
          >
            <div className="flex flex-col gap-6 text-2xl font-serif text-greek-blue">
              <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between border-b border-greek-light-blue pb-4">
                <span>{t.menu}</span>
                <ChevronRight size={24} className={lang === 'ar' ? '' : 'rotate-180'} />
              </a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between border-b border-greek-light-blue pb-4">
                <span>{t.about}</span>
                <ChevronRight size={24} className={lang === 'ar' ? '' : 'rotate-180'} />
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between border-b border-greek-light-blue pb-4">
                <span>{t.contact}</span>
                <ChevronRight size={24} className={lang === 'ar' ? '' : 'rotate-180'} />
              </a>
            </div>
            
            <div className="mt-auto pb-10 flex justify-center gap-6 text-greek-blue">
              <Instagram size={32} />
              <Phone size={32} />
              <MapPin size={32} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60]"
            />
            <motion.div
              initial={{ x: lang === 'ar' ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: lang === 'ar' ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 ${lang === 'ar' ? 'right-0' : 'left-0'} bottom-0 w-[85%] max-w-sm bg-greek-white z-[70] shadow-2xl flex flex-col`}
            >
              <div className="p-4 border-b border-greek-light-blue flex justify-between items-center bg-greek-blue text-white">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={20} />
                  <h2 className="text-xl font-serif font-bold">{t.cart}</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-1">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                    <ShoppingCart size={64} strokeWidth={1} />
                    <p className="text-lg">{t.emptyCart}</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-greek-blue font-bold underline"
                    >
                      {t.startAdding}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.name.ar} className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-greek-light-blue/30">
                        <div className="flex-grow">
                          <h3 className="font-bold text-slate-800">{item.name[lang]}</h3>
                          <p className="text-greek-blue font-bold text-sm">{item.price * item.quantity}{t.currency}</p>
                        </div>
                        <div className="flex items-center gap-3 bg-greek-light-blue/30 rounded-full px-2 py-1">
                          <button onClick={() => removeFromCart(item.name.ar)} className="text-greek-blue p-1">
                            <Minus size={16} />
                          </button>
                          <span className="font-bold text-greek-blue min-w-[20px] text-center">{item.quantity}</span>
                          <button onClick={() => addToCart(item)} className="text-greek-blue p-1">
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-greek-light-blue bg-white">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-500">{t.total}:</span>
                    <span className="text-2xl font-bold text-greek-blue">{cartTotal}{t.currency}</span>
                  </div>
                  <button 
                    onClick={sendToWhatsApp}
                    className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-green-200 active:scale-95 transition-transform"
                  >
                    <Send size={20} />
                    {t.sendWhatsApp}
                  </button>
                  <button 
                    onClick={clearCart}
                    className="w-full mt-4 text-slate-400 text-sm flex items-center justify-center gap-2"
                  >
                    <Trash2 size={14} />
                    {t.clearCart}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative min-h-[50vh] py-20 flex items-center justify-center overflow-hidden bg-greek-blue">
        <div className="absolute inset-0 greek-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-greek-blue/30"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            {t.heroTitle}
          </h1>
          <p className="text-greek-light-blue text-lg font-light tracking-wide mb-4">
            {t.heroSubtitle}
          </p>

          <AIWaiter />
        </motion.div>
      </header>

      {/* Category Tabs */}
      <div className="sticky top-[56px] z-30 bg-greek-white/90 backdrop-blur-sm border-b border-greek-light-blue">
        <div className="max-w-md mx-auto flex">
          {MENU_DATA.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-1 py-4 text-center font-serif text-lg transition-all relative ${activeCategory === cat.id ? 'text-greek-blue font-bold' : 'text-slate-400'}`}
            >
              {cat.name[lang]}
              {activeCategory === cat.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-greek-blue"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Content */}
      <main className="flex-grow max-w-md mx-auto w-full px-4 py-8" id="menu">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${lang}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentCategory.sections.map((section, sIdx) => (
              <section key={sIdx} className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-grow bg-greek-light-blue"></div>
                  <h2 className="text-2xl font-bold text-greek-blue px-2">
                    {section.title[lang]}
                  </h2>
                  <div className="h-px flex-grow bg-greek-light-blue"></div>
                </div>

                <div className="space-y-6">
                  {section.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex flex-col group">
                      <div className="flex justify-between items-baseline gap-4 mb-1">
                        <h3 className="text-lg font-medium text-slate-800">
                          {item.name[lang]}
                        </h3>
                        <div className="flex-grow border-b border-dotted border-slate-300 mx-2"></div>
                        <div className="flex items-center gap-3">
                          <span className="text-greek-blue font-bold whitespace-nowrap">
                            {item.price}{t.currency}
                          </span>
                          <button 
                            onClick={() => addToCart(item)}
                            className="bg-greek-blue text-white p-1.5 rounded-lg active:scale-90 transition-transform shadow-sm"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      </div>
                      {item.description && (
                        <p className="text-sm text-slate-500 leading-relaxed">
                          {item.description[lang]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer / About */}
      <footer className="bg-greek-blue text-white py-12 px-6" id="contact">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-greek-blue font-serif text-3xl font-bold mx-auto mb-6">
            {lang === 'ar' ? 'ن' : 'N'}
          </div>
          <h2 className="text-2xl font-serif font-bold mb-4">{t.heroTitle}</h2>
          <p className="text-greek-light-blue/80 mb-8 leading-relaxed">
            {t.footerDesc}
          </p>
          
          <div className="space-y-4 mb-10">
            <a 
              href={GOOGLE_MAPS_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 hover:text-greek-light-blue transition-colors"
            >
              <MapPin size={20} className="text-greek-light-blue" />
              <span>{t.location}</span>
            </a>
            <div className="flex items-center justify-center gap-3">
              <Phone size={20} className="text-greek-light-blue" />
              <span>0567107510</span>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <a 
              href={GOOGLE_MAPS_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-greek-light-blue/30 flex items-center justify-center hover:bg-white hover:text-greek-blue transition-colors"
            >
              <MapPin size={24} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-greek-light-blue/30 flex items-center justify-center hover:bg-white hover:text-greek-blue transition-colors">
              <Instagram size={24} />
            </a>
            <a href="tel:0567107510" className="w-12 h-12 rounded-full border border-greek-light-blue/30 flex items-center justify-center hover:bg-white hover:text-greek-blue transition-colors">
              <Phone size={24} />
            </a>
          </div>
          
          <div className="mt-12 pt-8 border-t border-greek-light-blue/10 text-greek-light-blue/50 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <span>&copy; {new Date().getFullYear()} {t.heroTitle}. {t.rights}</span>
            <div className="flex items-center gap-2 text-greek-light-blue/40 text-xs">
              <span>تصميم وتنفيذ QUI</span>
              <span className="opacity-50">|</span>
              <a href="tel:0540334697" className="hover:text-greek-light-blue transition-colors">0540334697</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button for Cart */}
      {cartCount > 0 && !isCartOpen && (
        <motion.div 
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className={`fixed bottom-6 ${lang === 'ar' ? 'left-6' : 'right-6'} z-40`}
        >
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform relative"
          >
            <ShoppingCart size={28} />
            <span className={`absolute -top-1 ${lang === 'ar' ? '-right-1' : '-left-1'} bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white`}>
              {cartCount}
            </span>
          </button>
        </motion.div>
      )}

      {/* AI Marketing Assistant - Removed from fixed bottom */}
    </div>
  );
}
