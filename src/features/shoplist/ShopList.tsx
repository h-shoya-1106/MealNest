import { Check, Utensils } from "lucide-react";

export const ShoppingList = ({ materials, toggleCheck }: any) => {
  return (
    <div className="p-4 pb-20">
      <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Utensils className="w-4 h-4" />
        必要な材料
      </h2>
      <div className="space-y-2">
        {materials.map((material: any) => (
          <div
            key={material.id}
            className={`bg-white rounded-lg p-3 border-2 transition-all duration-200 ${
              material.checked
                ? "border-green-200 bg-green-50"
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleCheck(material.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  material.checked
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-gray-300 hover:border-green-400"
                }`}
              >
                {material.checked && <Check className="w-4 h-4" />}
              </button>

              <div className="flex-1">
                <div
                  className={`font-medium ${
                    material.checked ? "text-gray-500 line-through" : "text-gray-800"
                  }`}
                >
                  {material.name}
                </div>
                <div className="text-sm text-gray-500">
                  {material.totalAmount}
                  {material.unit}
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-400">
                  {(material.dishes?.length ?? 0)}品目で使用
                </div>
              </div>
            </div>

            {material.dishes?.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="flex flex-wrap gap-1">
                  {material.dishes.map((dish: string, index: number) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {dish}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
