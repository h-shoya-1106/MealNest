"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Input } from "../../../../src/components/ui/input";
import { Button } from "../../../../src/components/ui/button";

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
  initialData?: any; // DB取得結果
};

export default function MenuForm({ date, isEdit = false, initialData }: MenuFormProps) {
  const [menuName, setMenuName] = useState("");
  const [calorie, setCalorie] = useState("");
  const [timeZoneId, setTimeZoneId] = useState("");
  const [menuId, setMenuId] = useState<number | null>(null);

  const [dishes, setDishes] = useState<Dish[]>([
    {
      name: "",
      dishStatusId: "",
      materials: [{ materialName: "", quantityId: "", amount: "" }],
    },
  ]);

  // 初期値をセット（編集モードのみ）
  useEffect(() => {
    if (isEdit && initialData) {
      setMenuId(initialData.id);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    const url = isEdit ? `/api/menu/${menuId}/update` : "/api/menu/create";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, date }),
      });

      const result = await res.json();
      console.log(isEdit ? "更新成功" : "登録成功", result);
    } catch (err) {
      console.error("送信エラー:", err);
    }
  };

  // フォーム操作ロジック（新規追加・編集）
  const handleDishChange = (index: number, field: keyof Dish, value: string) => {
    const newDishes = [...dishes];
    newDishes[index][field] = value;
    setDishes(newDishes);
  };

  const handleMaterialChange = (
    dishIndex: number,
    materialIndex: number,
    field: keyof Material,
    value: string
  ) => {
    const updated = [...dishes];
    updated[dishIndex].materials[materialIndex][field] = value;
    setDishes(updated);
  };

  const addMaterial = (dishIndex: number) => {
    const updated = [...dishes];
    updated[dishIndex].materials.push({ materialName: "", quantityId: "", amount: "" });
    setDishes(updated);
  };

  const addDish = () => {
    setDishes([
      ...dishes,
      {
        name: "",
        dishStatusId: "",
        materials: [{ materialName: "", quantityId: "", amount: "" }],
      },
    ]);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-lg font-bold text-center mb-4">
        {format(new Date(date), "yyyy/MM/dd")} の献立{isEdit ? "編集" : "登録"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">献立名</label>
          <Input
            type="text"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            placeholder="例: 和風定食"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">カロリー (kcal)</label>
          <Input
            type="number"
            value={calorie}
            onChange={(e) => setCalorie(e.target.value)}
            placeholder="例: 600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">時間帯</label>
          <select
            value={timeZoneId}
            onChange={(e) => setTimeZoneId(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value="">選択してください</option>
            <option value="1">朝</option>
            <option value="2">昼</option>
            <option value="3">夜</option>
          </select>
        </div>

        <div className="space-y-2">
          <h2 className="font-semibold text-md">料理の{isEdit ? "編集" : "登録"}</h2>
          {dishes.map((dish, index) => (
            <div key={index} className="border rounded p-3 space-y-2">
              <Input
                placeholder="料理名"
                value={dish.name}
                onChange={(e) => handleDishChange(index, "name", e.target.value)}
              />
              <select
                value={dish.dishStatusId}
                onChange={(e) => handleDishChange(index, "dishStatusId", e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">料理区分を選択</option>
                <option value="1">主菜</option>
                <option value="2">副菜</option>
                <option value="3">主食</option>
                <option value="4">メイン</option>
              </select>

              <div className="pl-2 border-l border-gray-300 space-y-2">
                <h3 className="text-sm font-semibold">食材の{isEdit ? "編集" : "登録"}</h3>
                {dish.materials.map((material, matIndex) => (
                  <div key={matIndex} className="space-y-1">
                    <Input
                      placeholder="食材名"
                      value={material.materialName}
                      onChange={(e) =>
                        handleMaterialChange(index, matIndex, "materialName", e.target.value)
                      }
                    />
                    <Input
                      placeholder="量"
                      type="number"
                      value={material.amount}
                      onChange={(e) =>
                        handleMaterialChange(index, matIndex, "amount", e.target.value)
                      }
                    />
                    <select
                      value={material.quantityId}
                      onChange={(e) =>
                        handleMaterialChange(index, matIndex, "quantityId", e.target.value)
                      }
                      className="w-full border rounded px-3 py-2 text-sm"
                    >
                      <option value="">分量区分を選択</option>
                      <option value="1">大さじ</option>
                      <option value="2">小さじ</option>
                      <option value="3">g</option>
                      <option value="4">枚</option>
                    </select>
                  </div>
                ))}
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => addMaterial(index)}
                >
                  食材を追加
                </Button>
              </div>
            </div>
          ))}
          <Button type="button" onClick={addDish} variant="outline" className="w-full">
            料理を追加
          </Button>
        </div>

        <div className="text-center">
          <Button type="submit">{isEdit ? "更新" : "保存"}</Button>
        </div>
      </form>
    </div>
  );
}
