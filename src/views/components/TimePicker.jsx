import { useEffect, useState } from 'react';

export default function TimePicker({
  selectedDate,
  durationMinutes = 60,
  value,
  onChange,
  disabled = false,
}) {
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    if (!selectedDate) {
      setAvailableTimes([]);
      return;
    }

    const dateObj = new Date(selectedDate);
    const dayOfWeek = dateObj.getDay();

    if (dayOfWeek === 0) {
      // Domingo, no hay horarios disponibles
      setAvailableTimes([]);
      return;
    }

    // horario laboral, de 9:00 a 18:00
    const workStartHour = 9;
    const workEndHour = 18;

    //la duración del servicio como intervalo
    const intervalMinutes = durationMinutes;

    const slots = [];

    //iteramos desde la hora inicial hasta la última hora en la que el servicio puede empezar

    const totalWorkMinutes = (workEndHour - workStartHour) * 60;

    const lastStartMinute = totalWorkMinutes - durationMinutes;

    for (let minutesFromStart = 0; minutesFromStart <= lastStartMinute; minutesFromStart += intervalMinutes) {
      const hour = Math.floor(minutesFromStart / 60) + workStartHour;
      const minute = minutesFromStart % 60;

      // Formatear hora en 12h con AM/PM
      let displayHour = hour % 12 || 12;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const mm = minute.toString().padStart(2, '0');

      slots.push(`${displayHour}:${mm} ${ampm}`);
    }

    setAvailableTimes(slots);
  }, [selectedDate, durationMinutes]);

  return (
    <select
      id="preferredTime"
      name="preferredTime"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled || availableTimes.length === 0}
      required
    >
      <option value="">Seleccione una hora</option>
      {availableTimes.length === 0 && (
        <option disabled>
          {selectedDate ? 'No hay horarios disponibles' : 'Seleccione una fecha primero'}
        </option>
      )}
      {availableTimes.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
}
