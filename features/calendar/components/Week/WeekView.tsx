import { WeeklyCard } from "./weeklyCard";

export const WeekView = ({ data, onDelete }) => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <>
      <h1 className="text-lg font-semibold text-center mb-4">Weekly Menu</h1>
      <div className="space-y-4">
        {daysOfWeek.map((day) => (
          <WeeklyCard key={day} day={day} meal={data[day] || {}} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
};