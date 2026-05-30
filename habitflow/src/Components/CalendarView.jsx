import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function toEvent(task) {
  const start = task.date && task.time ? `${task.date}T${task.time}` : task.date;

  const isStudy = task.type === "study";

  return {
    id: task.id,
    title: task.title,
    start,
    allDay: !task.time,

    // رنگ‌بندی مینیمال و خوانا
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

        // تجربه بهتر
        nowIndicator
        dayMaxEvents={3}
        displayEventTime={true}

        dateClick={(info) => {
          onSelectDate?.(info.dateStr);
        }}
        eventClick={(info) => {
          const task = info.event.extendedProps?.task;
          if (task) onSelectTask?.(task);
        }}

        // آیکون مینیمال داخل رویدادها (بدون دست‌کاری دیتای task)
        eventContent={(arg) => {
          const task = arg.event.extendedProps?.task;
          const isStudy = task?.type === "study";

          // می‌خوای کاملاً مینیمال باشه: از این دو تا استفاده کن
          const icon = isStudy ? "📘" : "🏋️";

          return (
            <div className="hf-event">
              <span className="hf-event__icon" aria-hidden="true">
                {icon}
              </span>
              <span className="hf-event__title">{arg.event.title}</span>
            </div>
          );
        }}
      />
    </div>
  );
}
