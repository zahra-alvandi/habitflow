import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function toEvent(task, categories) {
  const start =
    task.date && task.time ? `${task.date}T${task.time}` : task.date;

  const category = categories?.find((c) => c.id === task.type);
  const color = category?.color || "#6366F1";

  const bg = `${color}20`;

  return {
    id: task.id,
    title: task.title,
    start,
    allDay: !task.time,
    backgroundColor: bg,
    borderColor: color,
    textColor: "#0f172a",
    extendedProps: { task, category },
  };
}

export default function CalendarView({
  tasks,
  categories,
  onSelectDate,
  onSelectTask,
}) {
  const events = tasks.filter((t) => t.date).map((t) => toEvent(t, categories));

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 p-4 shadow-sm transition-colors">
      <style>{`
        .fc { font-family: inherit; color: #0f172a; }
        .fc .fc-toolbar-title { font-size: 1.05rem; font-weight: 700; }
        .fc .fc-button {
          background: #0f172a !important;
          border: 1px solid #0f172a !important;
          border-radius: 12px !important;
          padding: 0.4rem 0.8rem !important;
          font-size: 0.8rem !important;
          font-weight: 600 !important;
        }
        .fc .fc-button:hover { background: #1e293b !important; }
        .fc .fc-button-primary:not(:disabled).fc-button-active {
          background: #2563eb !important;
          border-color: #2563eb !important;
        }
        .fc .fc-scrollgrid {
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          overflow: hidden;
        }
        .fc th {
          background: #f8fafc;
          color: #475569;
          font-size: 0.8rem;
          padding: 10px 0;
          border-color: #e2e8f0;
        }
        .fc td, .fc th { border-color: #e2e8f0 !important; }
        .fc .fc-daygrid-day-frame { min-height: 100px; padding: 4px; }
        .fc .fc-daygrid-event {
          border: none !important;
          border-radius: 8px !important;
          padding: 2px 6px !important;
        }
        .hf-event { display: flex; align-items: center; gap: 4px; }
        .hf-event__icon { font-size: 10px; }
        .hf-event__title {
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* 🌙 Dark Mode */
        .dark .fc { color: #e2e8f0; }
        .dark .fc .fc-toolbar-title { color: #f1f5f9; }
        .dark .fc .fc-button {
          background: #1e293b !important;
          border-color: #334155 !important;
          color: #e2e8f0 !important;
        }
        .dark .fc .fc-button:hover {
          background: #334155 !important;
          border-color: #475569 !important;
        }
        .dark .fc .fc-button-primary:not(:disabled).fc-button-active {
          background: #6366f1 !important;
          border-color: #6366f1 !important;
        }
        .dark .fc .fc-scrollgrid { border-color: #334155; }
        .dark .fc th {
          background: #1e293b;
          color: #94a3b8;
          border-color: #334155 !important;
        }
        .dark .fc td {
          border-color: #334155 !important;
          background: #0f172a;
        }
        .dark .fc .fc-daygrid-day-frame { background: #0f172a; }
        .dark .fc .fc-daygrid-day:hover .fc-daygrid-day-frame { background: #1e293b; }
        .dark .fc .fc-day-today { background: rgba(99, 102, 241, 0.12) !important; }
        .dark .fc .fc-daygrid-day-number { color: #cbd5e1; }
        .dark .fc .fc-daygrid-event { background: rgba(99, 102, 241, 0.2) !important; }
        .dark .hf-event__title { color: #f1f5f9 !important; }
        .dark .fc .fc-col-header-cell-cushion { color: #94a3b8; }
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
          const category = arg.event.extendedProps?.category;
          const color = category?.color || "#6366F1";
          return (
            <div className="hf-event">
              <span className="hf-event__icon" style={{ color }}>
                ●
              </span>
              <span className="hf-event__title">{arg.event.title}</span>
            </div>
          );
        }}
      />
    </div>
  );
}
