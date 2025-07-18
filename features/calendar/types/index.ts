// ここはTypeScriptの型を定義する
import NextAuth from "next-auth";

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

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
}
