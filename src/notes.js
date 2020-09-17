const Note = (title, desc, priority, date = "", time = "", id) => {
  return {
    title,
    desc,
    date,
    time,
    priority,
    id,
  }
}

export { Note };
