const Note = (title, desc, priority, date = "", time = "") => {
  return {
    title,
    desc,
    date,
    time,
    priority,
  }
}

export { Note };
