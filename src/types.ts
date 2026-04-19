export interface Addon {
  name: { ar: string; en: string };
  price: number;
}

export interface MenuItem {
  name: { ar: string; en: string };
  price: number;
  description?: { ar: string; en: string };
  calories?: number;
}

export interface MenuSection {
  title: { ar: string; en: string };
  items: MenuItem[];
}

export interface MenuCategory {
  id: string;
  name: { ar: string; en: string };
  sections: MenuSection[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedAddons?: Addon[];
}
