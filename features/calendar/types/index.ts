// ここはTypeScriptの型を定義する
export  type Meal = {
  morning?: string;
  lunch?: string;
  dinner?: string;
};

export type Menu = {
  id: number;
  name: string;
  date: string;
  timeZone: {
    displayName: string;
  };
  menuDishes: any[];
};


