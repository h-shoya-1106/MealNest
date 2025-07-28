"use client";

import { API } from "@/constants/api";
import * as Dialog from "@radix-ui/react-dialog";
import { ChefHat, Pencil, X, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

type MenuWithRelations = {
  id: number;
  name: string;
  timeZone: { id: number, displayName: string };
  menuDishes: {
    id: number;
    dish: {
      id: number;
      name: string;
      dishMaterials: {
        material: { displayName: string };
        quantity: { displayName: string };
        amount: number;
      }[];
    };
  }[];
};

type FavoriteState = {
  [dishId: number]: boolean;
};

type Props = {
  menu: MenuWithRelations;
  day: string;
  date: string;
  onClose: () => void;
  onEdit?: (day: string, timeZone: string) => void;
};

export default function MenuDetail({ menu, day, date, onClose, onEdit }: Props) {
  const [favoriteState, setFavoriteState] = useState<FavoriteState>({});

  useEffect(() => {
    const fetchFavorites = async () => {
      const results = await Promise.all(
        menu.menuDishes.map(async (menuDish) => {
          const res = await axios.post(API.FAVORITE.CHECK, {
            dishId: menuDish.dish.id,
          });
          return { dishId: menuDish.dish.id, isFavorite: res.data.isFavorite };
        })
      );

      const newState: FavoriteState = {};
      results.forEach(({ dishId, isFavorite }) => {
        newState[dishId] = isFavorite;
      });

      setFavoriteState(newState);
    };

    fetchFavorites();
  }, [menu]);

  const toggleFavorite = async (dishId: number) => {
    try {
      const res = await axios.post(API.FAVORITE.TOGGLE, { dishId });

      setFavoriteState((prevState) => ({
        ...prevState,
        [dishId]: res.data.status === "added",
      }));
    } catch (err) {
      console.error("お気に入り登録/解除失敗:", err);
    }
  };

  return (
    <Dialog.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <div className="fixed top-1/2 left-1/2 w-[90%] max-w-md h-[70vh] bg-white rounded-md shadow-lg transform -translate-x-1/2 -translate-y-1/2 flex flex-col">
          {/* ヘッダー */}
          <div className="bg-orange-500 text-white p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <ChefHat size={20} />
                <span className="font-semibold">{menu.name}</span>
              </div>
              <span className="text-sm text-gray-200">{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  onEdit?.(day, menu.timeZone.displayName)
                }
                className="cursor-pointer"
              >
                <Pencil />
              </button>
              <Dialog.Close asChild>
                <button aria-label="閉じる">
                  <X className="w-5 h-5" />
                </button>
              </Dialog.Close>
            </div>
          </div>

          {/* 内容 */}
          <div className="p-4 space-y-4 overflow-y-auto flex-1">
            <div>
              {menu.menuDishes.map((menuDish, i) => (
                <div key={menuDish.id} className="border rounded p-3 mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-orange-100 text-orange-700 rounded-full w-5 h-5 flex items-center justify-center text-sm">
                      {i + 1}
                    </span>
                    <span className="font-semibold">{menuDish.dish.name}</span>
                    <button onClick={() => toggleFavorite(menuDish.dish.id)}>
                      <Heart
                        className={favoriteState[menuDish.dish.id] ? "text-red-500" : "text-gray-300"}
                        fill={favoriteState[menuDish.dish.id] ? "currentColor" : "none"}
                      />
                    </button>
                  </div>
                  <div className="text-xs font-medium text-gray-600">材料・分量</div>
                    {menuDish.dish.dishMaterials.map((material, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between py-1 px-2 bg-gray-50 rounded text-sm my-2"
                    >
                        <span>{material.material.displayName}</span>
                        <span className="text-gray-600">
                        {material.amount} {material.quantity.displayName}
                        </span>
                    </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
