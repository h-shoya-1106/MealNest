"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MenuFormPage() {
  const { date } = useParams();

  const [menuName, setMenuName] = useState("");
  const [calorie, setCalorie] = useState("");
  const [timeZoneId, setTimeZoneId] = useState("");

  const [dishes, setDishes] = useState([
    {
      name: "",
      dishStatusId: "",
      quantityId: "",
      amount: ""
    }
  ]);

  const handleDishChange = (index: number, field: string, value: string) => {
    const newDishes = [...dishes];
    newDishes[index][field] = value;
    setDishes(newDishes);
  };

  const addDish = () => {
    setDishes([
      ...dishes,
      { name: "", dishStatusId: "", quantityId: "", amount: "" }
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ date, menuName, calorie, timeZoneId, dishes });
    // 今後: API で保存
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-lg font-bold text-center mb-4">
        {format(new Date(date as string), "yyyy/MM/dd")} の献立登録
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
          <h2 className="font-semibold text-md">料理の登録</h2>
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

              <select
                value={dish.quantityId}
                onChange={(e) => handleDishChange(index, "quantityId", e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">分量区分を選択</option>
                <option value="1">大さじ</option>
                <option value="2">小さじ</option>
                <option value="3">g</option>
                <option value="4">枚</option>
              </select>

              <Input
                placeholder="量 (数字のみ)"
                type="number"
                value={dish.amount}
                onChange={(e) => handleDishChange(index, "amount", e.target.value)}
              />
            </div>
          ))}
          <Button type="button" onClick={addDish} variant="outline" className="w-full">
            料理を追加
          </Button>
        </div>

        <div className="text-center">
          <Button type="submit">保存</Button>
        </div>
      </form>
    </div>
  );
}
