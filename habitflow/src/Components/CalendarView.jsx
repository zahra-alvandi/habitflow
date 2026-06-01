import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function toEvent(task) {
  const start =
    task.date && task.time ? `${task.date}T${task.time}` : task.date;
  const isStudy = task.type === "study";

  return {
    id: task.id,
    title: task.title,
    start,
    allDay: !task.time,
    backgroundColor: isStudy ? "#EEF2FF" : "#FFF7ED",
    borderColor: isStudy ? "#6366F1" : "#F97316",
    textColor: "#0f172a",
    extendedProps: { task },
  };
}

export default function CalendarView({ tasks, onSelectDate, onSelectTask }) {
  const events = tasks.filter((t) => t.date).map(toEvent);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* استایل‌های اختصاصی FullCalendar برای مینیمال شدن */}
      <style>{`
        .fc { font-family: inherit; color: #0f172a; }
        .fc .fc-toolbar-title { font-size: 1.05rem; font-weight: 700; }
        .fc .fc-button { background: #0f172a !important; border: 1px solid #0f172a !important; border-radius: 12px !important; padding: 0.4rem 0.8rem !important; font-size: 0.8rem !important; font-weight: 600 !important; }
        .fc .fc-button:hover { background: #1e293b !important; }
        .fc .fc-button-primary:not(:disabled).fc-button-active { background: #2563eb !important; border-color: #2563eb !important; }
        .fc .fc-scrollgrid { border: 1px solid #e2e8f0; border-radius: 18px; overflow: hidden; }
        .fc th { background: #f8fafc; color: #475569; font-size: 0.8rem; padding: 10px 0; border-color: #e2e8f0; }
        .fc td, .fc th { border-color: #e2e8f0 !important; }
        .fc .fc-daygrid-day-frame { min-height: 100px; padding: 4px; }
        .fc .fc-daygrid-event { border: none !important; border-radius: 8px !important; padding: 2px 6px !important; }
        .hf-event { display: flex; align-items: center; gap: 4px; }
        .hf-event__icon { font-size: 10px; }
        .hf-event__title { font-size: 11px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      `}</style>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="auto"
        events={events}
        nowIndicator
        dayMaxEvents={3}
        dateClick={(info) => onSelectDate?.(info.dateStr)}
        eventClick={(info) => {
          const task = info.event.extendedProps?.task;
          if (task) onSelectTask?.(task);
        }}
        eventContent={(arg) => {
          const task = arg.event.extendedProps?.task;
          const isStudy = task?.type === "study";
          return (
            <div className="hf-event">
              <span
                className="hf-event__icon"
                style={{ color: isStudy ? "#4F46E5" : "#EA580C" }}
              >
                {isStudy ? "●" : "◆"}
              </span>
              <span className="hf-event__title">{arg.event.title}</span>
            </div>
          );
        }}
      />
    </div>
  );
}
