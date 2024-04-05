export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  if (date.toDateString() === today.toDateString()) {
    return formatTime(date);
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return formatDateToString(date);
  }
}

function formatTime(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  return `${formattedHours}:${formattedMinutes}${ampm}`;
}

function formatDateToString(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
