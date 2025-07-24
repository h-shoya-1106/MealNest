"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, ChefHat, Utensils } from "lucide-react";
import toast from "react-hot-toast";
import { API } from '@/constants/api';
import { PATHS } from "@/constants/paths";

type Material = {
  materialName: string;
  quantityId: string;
  amount: string;
};

type Dish = {
  name: string;
  dishStatusId: string;
  materials: Material[];
};

type MenuFormProps = {
  date: string;
  isEdit?: boolean;
  initialData?: any;
};

export default function MenuForm({ date, isEdit = false, initialData }: MenuFormProps) {
  const router = useRouter();
  const [menuName, setMenuName] = useState("");
  const [calorie, setCalorie] = useState("");
  const [timeZoneId, setTimeZoneId] = useState("");
  const [dishes, setDishes] = useState<Dish[]>([
    { name: "", dishStatusId: "", materials: [{ materialName: "", quantityId: "", amount: "" }] },
  ]);
  const [timeZones, setTimeZones] = useState<{ id: number; displayName: string }[]>([]);
  const [dishStatuses, setDishStatuses] = useState<{ id: number; displayName: string }[]>([]);
  const [quantities, setQuantities] = useState<{ id: number; displayName: string }[]>([]);

  useEffect(() => {
    if (isEdit && initialData) {
      setMenuName(initialData.name);
      setCalorie(initialData.calorie?.toString() || "");
      setTimeZoneId(initialData.timeZoneId?.toString() || "");
      setDishes(
        initialData.menuDishes.map((md: any) => ({
          name: md.dish.name,
          dishStatusId: md.dish.dishStatusId?.toString() || "",
          materials: md.dish.dishMaterials.map((m: any) => ({
            materialName: m.material.displayName,
            quantityId: m.quantity.id.toString(),
            amount: m.amount?.toString() || "",
          })),
        }))
      );
    }
  }, [initialData, isEdit]);

  useEffect(() => {
    const fetchMasters = async () => {
      const [tzRes, dsRes, qRes] = await Promise.all([
        fetch(API.MST_TIME_ZONE),
        fetch(API.MST_DISH_STATUS),
        fetch(API.MST_QUANTITY),
      ]);
      setTimeZones(await tzRes.json());
      setDishStatuses(await dsRes.json());
      setQuantities(await qRes.json());
    };
    fetchMasters();
  }, []);

  type DishStringKeys = Extract<keyof Dish, "name" | "dishStatusId">;

  const handleDishChange = (index: number, field: DishStringKeys, value: string) => {
    const updated = [...dishes];
    updated[index][field] = value;
    setDishes(updated);
  };

  const handleMaterialChange = (
    dishIndex: number,
    matIndex: number,
    field: keyof Material,
    value: string
  ) => {
    const updated = [...dishes];
    updated[dishIndex].materials[matIndex][field] = value;
    setDishes(updated);
  };

  const addMaterial = (dishIndex: number) => {
    const updated = [...dishes];
    updated[dishIndex].materials.push({ materialName: "", quantityId: "", amount: "" });
    setDishes(updated);
  };

  const removeMaterial = (dishIndex: number, matIndex: number) => {
    const updated = [...dishes];
    updated[dishIndex].materials.splice(matIndex, 1);
    setDishes(updated);
  };

  const addDish = () => {
    setDishes([
      ...dishes,
      { name: "", dishStatusId: "", materials: [{ materialName: "", quantityId: "", amount: "" }] },
    ]);
  };

  const removeDish = (index: number) => {
    setDishes(dishes.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const payload = {
      menuName,
      calorie: Number(calorie),
      timeZoneId: Number(timeZoneId),
      dishes: dishes.map((dish) => ({
        name: dish.name,
        dishStatusId: Number(dish.dishStatusId),
        materials: dish.materials.map((m) => ({
          materialName: m.materialName,
          quantityId: Number(m.quantityId),
          amount: m.amount ? Number(m.amount) : null,
        })),
      })),
    };

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? API.MENU.UPDATE(initialData.id) : API.MENU.CREATE;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, date }),
      });

      if (res.ok) {
        toast.success(isEdit ? "更新しました" : "保存しました");
        router.push("/calendar");
      } else {
        const errData = await res.json();
        toast.error(errData.message || "保存に失敗しました");
      }
    } catch (err) {
      console.error("送信エラー:", err);
      toast.error("通信エラーが発生しました");
    }
  };

  const handleCancel = () => {
    router.push(PATHS.CALENDAR);
  };

  const getDishStatusIcon = (statusId: string) => {
    switch (statusId) {
      case "1":
        return "🍖";
      case "2":
        return "🥗";
      case "3":
        return "🍚";
      case "4":
        return "🍽️";
      default:
        return "🍴";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <ChefHat className="w-5 h-5 text-orange-500" />
            <h1 className="text-xl font-bold text-gray-900">メニュー作成</h1>
          </div>
          <div className="space-y-3">
            <Input
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              placeholder="献立名を入力してください"
              className="text-base h-11 border-2 border-gray-200 focus:border-orange-400 rounded-lg"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                value={calorie}
                onChange={(e) => setCalorie(e.target.value)}
                placeholder="カロリー"
                className="text-base h-11 border-2 border-gray-200 focus:border-orange-400 rounded-lg"
              />
              <select value={timeZoneId} onChange={(e) => setTimeZoneId(e.target.value)} className="...">
                <option value="">時間帯を選択</option>
                {timeZones.map((tz) => (
                  <option key={tz.id} value={tz.id}>{tz.displayName}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            {dishes.map((dish, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-3 border-b border-gray-100">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-sm">{getDishStatusIcon(dish.dishStatusId)}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">料理 {index + 1}</span>
                      </div>
                      {dishes.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeDish(index)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200 h-8 w-8 p-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                    <Input
                      placeholder="料理名を入力"
                      value={dish.name}
                      onChange={(e) => handleDishChange(index, "name", e.target.value)}
                      className="border-2 border-gray-200 focus:border-orange-400 rounded-lg h-10"
                    />
                    <select
                      value={dish.dishStatusId}
                      onChange={(e) => handleDishChange(index, "dishStatusId", e.target.value)}
                      className="..."
                    >
                      <option value="">料理区分を選択</option>
                      {dishStatuses.map((ds) => (
                        <option key={ds.id} value={ds.id}>{ds.displayName}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-3">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-700 flex items-center gap-2 text-sm">
                      <Utensils className="w-4 h-4" />
                      材料・分量
                    </h3>
                    <Button
                      type="button"
                      onClick={() => addMaterial(index)}
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg h-8 px-3 text-xs"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      追加
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {dish.materials.map((mat, matIndex) => (
                      <div key={matIndex} className="bg-gray-50 rounded-lg p-2">
                        <div className="space-y-2">
                          <Input
                            placeholder="材料名"
                            value={mat.materialName}
                            onChange={(e) =>
                              handleMaterialChange(index, matIndex, "materialName", e.target.value)
                            }
                            className="border-0 bg-white h-9 text-sm"
                          />
                          <div className="flex items-center gap-2">
                            <Input
                              placeholder="分量"
                              value={mat.amount}
                              onChange={(e) =>
                                handleMaterialChange(index, matIndex, "amount", e.target.value)
                              }
                              className="flex-1 border-0 bg-white h-9 text-sm"
                            />
                            <select
                              value={mat.quantityId}
                              onChange={(e) =>
                                handleMaterialChange(index, matIndex, "quantityId", e.target.value)
                              }
                              className="w-20 bg-white border border-gray-200 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
                            >
                              <option value="">料理区分を選択</option>
                              {quantities.map((qu) => (
                                <option key={qu.id} value={qu.id}>{qu.displayName}</option>
                              ))}
                            </select>
                            {dish.materials.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeMaterial(index, matIndex)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200 h-8 w-8 p-0"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center py-2">
            <Button
              type="button"
              onClick={addDish}
              variant="outline"
              className="bg-white hover:bg-orange-50 border-2 border-dashed border-orange-300 text-orange-600 hover:text-orange-700 py-3 px-6 rounded-lg w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              料理を追加
            </Button>
          </div>

          <div className="flex gap-3 pt-4 pb-2">
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-lg font-semibold shadow-lg flex-1"
            >
              保存する
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="py-3 rounded-lg border-2 border-gray-300 hover:bg-gray-50 px-6"
            >
              キャンセル
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
