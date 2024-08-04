const addBtn = document.querySelector(".add");
const cancelBtn = document.querySelector(".cancel");
const saveBtn = document.querySelector(".save");
const deleteAllBtn = document.querySelector(".delete-all");

const noteArea = document.querySelector(".note-area");
const notePanel = document.querySelector(".note-panel");
const category = document.querySelector("#category");
const textArea = document.querySelector("#text");
const error = document.querySelector(".error");

let selectedVal;
let cardID = 0;

const openPanel = () => {
  notePanel.style.display = "flex";
};

const closePanel = () => {
  notePanel.style.display = "none";
  error.style.visibility = "hidden";
  textArea.value = "";
  category.selectedIndex = 0;
};

const addNote = () => {
  if (
    textArea.value !== "" &&
    category.options[category.selectedIndex].value !== "0"
  ) {
    createNote();
    error.style.visibility = "hidden";
  } else {
    error.style.visibility = "visible";
  }
};

const createNote = () => {
  const newNote = document.createElement("div");
  newNote.classList.add("note");
  newNote.setAttribute("id", cardID);

  newNote.innerHTML = `
    <div class="note-header">
      <h3 class="note-title">${selectedVal}</h3>
      <button class="delete-note" onClick="deleteNote(${cardID})">
        <i class="fas fa-times icon"></i>
      </button>
    </div>
    <div class="note-body">
      ${textArea.value}
    </div>`;

  noteArea.appendChild(newNote);
  checkColor(newNote);

  saveNoteToLocalStorage(cardID, selectedVal, textArea.value, newNote.style.backgroundColor);

  cardID++;
  textArea.value = "";
  category.selectedIndex = 0;
  notePanel.style.display = "none";
};

const selectValue = () => {
  selectedVal = category.options[category.selectedIndex].text;
};

const checkColor = (note) => {
  switch (selectedVal) {
    case "Zakupy":
      note.style.backgroundColor = "rgb(41, 170, 225)";
      break;
    case "Praca":
      note.style.backgroundColor = "rgb(149, 49, 50)";
      break;
    case "Hobby":
      note.style.backgroundColor = "rgb(218, 134, 25)";
      break;
    case "Dom":
      note.style.backgroundColor = "rgb(198, 173, 104)";
      break;
    case "Inne":
      note.style.backgroundColor = "rgb(255, 243, 0)";
  }
};

const deleteNote = id => {
  const noteToDelete = document.getElementById(id);
  noteArea.removeChild(noteToDelete);
  deleteNoteFromLocalStorage(id);
};

const deleteAllNotes = () => {
  noteArea.textContent = '';
  localStorage.clear();
};

const saveNoteToLocalStorage = (id, title, text, color) => {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push({ id, title, text, color });
  localStorage.setItem('notes', JSON.stringify(notes));
};

const deleteNoteFromLocalStorage = id => {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes = notes.filter(note => note.id !== id);
  localStorage.setItem('notes', JSON.stringify(notes));
};

const loadNotesFromLocalStorage = () => {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach(note => {
    const newNote = document.createElement("div");
    newNote.classList.add("note");
    newNote.setAttribute("id", note.id);

    newNote.innerHTML = `
      <div class="note-header">
        <h3 class="note-title">${note.title}</h3>
        <button class="delete-note" onClick="deleteNote(${note.id})">
          <i class="fas fa-times icon"></i>
        </button>
      </div>
      <div class="note-body">
        ${note.text}
      </div>`;

    newNote.style.backgroundColor = note.color;
    noteArea.appendChild(newNote);
    cardID = Math.max(cardID, note.id + 1);
  });
};

addBtn.addEventListener("click", openPanel);
cancelBtn.addEventListener("click", closePanel);
saveBtn.addEventListener("click", addNote);
deleteAllBtn.addEventListener('click', deleteAllNotes);
document.addEventListener('DOMContentLoaded', loadNotesFromLocalStorage);
