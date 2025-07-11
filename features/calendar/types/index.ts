// ここはTypeScriptの型を定義する
export type Menu = {
  id: number;
  name: string;
  date: string;
    timeZone: {
    id: number;
    displayName: string;
  };
  menuDishes: any[];
};


