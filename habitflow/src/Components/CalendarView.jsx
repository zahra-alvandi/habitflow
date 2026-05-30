import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function toEvent(task) {
  // task.date: "YYYY-MM-DD"
  // task.time: "HH:mm" (optional)
  const start =
    task.date && task.time ? `${task.date}T${task.time}` : task.date;

  return {
    id: task.id,
    title: task.title,
    start,
    allDay: !task.time,
    extendedProps: { task },
  };
}

export default function CalendarView({ tasks, onSelectDate, onSelectTask }) {
  const events = tasks
    .filter((t) => t.date) // فقط آن‌هایی که تاریخ واقعی دارند
    .map(toEvent);

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
        dateClick={(info) => {
          // info.dateStr => "YYYY-MM-DD"
          onSelectDate?.(info.dateStr);
        }}
        eventClick={(info) => {
          const task = info.event.extendedProps?.task;
          if (task) onSelectTask?.(task);
        }}
      />
    </div>
  );
}
