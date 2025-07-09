import { Trash2 } from "lucide-react";

type Props = {
  day: string;
  meal: {
    morning : Array<string>
    lunch : Array<string>
    dinner : Array<string>

  };
  onDelete: (day: string) => void;
};

export const WeeklyCard = ({ day, meal, onDelete }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 relative">
      <div className="absolute top-2 right-2 flex space-x-2">
      {(meal.morning || meal.lunch || meal.dinner) && (
        <button onClick={() => onDelete(day)} className="text-red-500 hover:text-red-700">
          <Trash2 size={16} />
        </button>
      )}
      </div>
      <h2 className="text-md font-bold mb-2">{day}</h2>
      <div className="pl-4 space-y-1 text-sm">
        {meal.morning && <p>Morning: {meal.morning}</p>}
        {meal.lunch && <p>Lunch: {meal.lunch}</p>}
        {meal.dinner && <p>Dinner: {meal.dinner}</p>}
      </div>
    </div>
  );
};