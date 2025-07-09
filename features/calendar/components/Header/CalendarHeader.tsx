import { format } from "date-fns";

type Props = {
  currentMonth: Date;
  viewMode: "month" | "week";
  onPrev: () => void;
  onNext: () => void;
  onChangeView: (mode: "month" | "week") => void;
};

export const CalendarHeader = ({ currentMonth, viewMode, onPrev, onNext, onChangeView }: Props) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <button onClick={onPrev} className="text-xl font-bold">{"<"}</button>
      <div className="text-center">
        <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
        <div className="flex justify-center mb-4 gap-2 text-sm text-gray-500 font-light">
          {["month", "week"].map((mode) => (
            <button
              key={mode}
              onClick={() => onChangeView(mode as "month" | "week")}
              className={`px-3 py-1 rounded-full transition ${
                viewMode === mode ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <button onClick={onNext} className="text-xl font-bold">{">"}</button>
    </div>
  );
};
