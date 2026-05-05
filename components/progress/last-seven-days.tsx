export function LastSevenDays({ days }: { days: Array<{ date: string; count: number }> }) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => {
        const label = new Date(day.date).toLocaleDateString(undefined, { weekday: "short" }).slice(0, 2);
        return (
          <div key={day.date} className="rounded-2xl bg-white p-2 text-center shadow-soft">
            <p className="text-xs font-semibold text-text-soft">{label}</p>
            <div className={`mx-auto mt-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${day.count > 0 ? "bg-good-greenSoft text-good-greenDeep" : "bg-app-surface text-text-soft"}`}>{day.count > 0 ? "✓" : "–"}</div>
          </div>
        );
      })}
    </div>
  );
}
