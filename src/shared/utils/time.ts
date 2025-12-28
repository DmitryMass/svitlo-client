/**
 * Конвертирует минуты от начала дня в строку времени HH:MM
 * @param minutes - минуты от начала дня (0-1440)
 * @returns строка формата "HH:MM" (например, "02:00", "17:30")
 */
export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const hoursStr = hours.toString().padStart(2, '0');
  const minsStr = mins.toString().padStart(2, '0');

  return `${hoursStr}:${minsStr}`;
};

/**
 * Форматирует диапазон времени
 * @param start - начало в минутах
 * @param end - конец в минутах
 * @returns строка формата "HH:MM - HH:MM"
 */
export const formatTimeRange = (start: number, end: number): string => {
  return `${minutesToTime(start)} - ${minutesToTime(end)}`;
};

/**
 * Генерирует массив часов для таблицы (00:00 - 23:00)
 * @returns массив строк времени
 */
export const generateHoursArray = (): string[] => {
  return Array.from({ length: 24 }, (_, i) => minutesToTime(i * 60));
};

/**
 * Проверяет, попадает ли минута в диапазон
 * @param minute - минута для проверки
 * @param start - начало диапазона
 * @param end - конец диапазона
 * @returns true если попадает в диапазон
 */
export const isInRange = (
  minute: number,
  start: number,
  end: number,
): boolean => {
  return minute >= start && minute < end;
};
