document.addEventListener('DOMContentLoaded', function () {
  const noteTitleElement = document.getElementById('noteTitle');
  const noteElement = document.getElementById('note');
  const charCount = document.getElementById('charCount');
  const noteColorPicker = document.getElementById('noteColor'); // Background color picker
  const textColorPicker = document.getElementById('textColor'); // Text color picker
  const saveButton = document.getElementById('saveBtn'); // Save button
  const clearButton = document.getElementById('clearBtn');
  const deleteButton = document.getElementById('deleteNoteBtn'); // Delete button
  const deleteAllButton = document.getElementById('deleteAllNotesBtn'); // Delete All Notes button
  const exportButton = document.getElementById('exportBtn');
  const copyButton = document.getElementById('copyNoteBtn'); // Copy button
  const notesList = document.getElementById('notesList');
  const addNoteButton = document.getElementById('addNoteBtn');
  const saveConfirmation = document.getElementById('saveConfirmation'); // Save confirmation popup
  const darkModeToggle = document.getElementById('darkModeToggle');
  const searchInput = document.getElementById('searchInput'); // Search input field

  let currentNoteId = null;

  // Load all notes from storage and display them
  function loadNotes() {
    chrome.storage.sync.get(['miniNotes'], function (result) {
      const notes = result.miniNotes || [];
      displayNotes(notes);
    });
  }

  // Display the list of notes in the sidebar
  function displayNotes(notes) {
    notesList.innerHTML = ''; // Clear the list
    notes.forEach(note => {
      const li = document.createElement('li');
      li.textContent = note.title || 'Untitled Note';
      li.setAttribute('data-id', note.id);
      li.addEventListener('click', () => loadNoteToEditor(note.id));
      notesList.appendChild(li);
    });
  }

  // Load a specific note into the editor
  function loadNoteToEditor(noteId) {
    chrome.storage.sync.get(['miniNotes'], function (result) {
      const notes = result.miniNotes || [];
      const note = notes.find(n => n.id === noteId);
      if (note) {
        currentNoteId = note.id; // Set the current note ID
        noteTitleElement.value = note.title;
        noteElement.value = note.content;
        noteElement.style.backgroundColor = note.color || '#ffffff'; // Apply saved background color
        noteElement.style.color = note.textColor || '#000000'; // Apply saved text color
        noteColorPicker.value = note.color || '#ffffff'; // Update background color picker value
        textColorPicker.value = note.textColor || '#000000'; // Update text color picker value
        charCount.textContent = `${note.content.length} characters`;
      }
    });
  }

  // Save the current note (either create new or update existing)
  function saveNote() {
    const title = noteTitleElement.value;
    const content = noteElement.value;
    const color = noteColorPicker.value; // Get selected background color
    const textColor = textColorPicker.value; // Get selected text color

    // If there's nothing to save, exit early
    if (content.trim() === '') {
      alert('Cannot save an empty note!');
      return;
    }

    chrome.storage.sync.get(['miniNotes'], function (result) {
      let notes = result.miniNotes || [];

      // If the note already exists, update it; otherwise, create a new one
      if (currentNoteId) {
        const noteIndex = notes.findIndex(n => n.id === currentNoteId);
        if (noteIndex > -1) {
          notes[noteIndex] = { id: currentNoteId, title, content, color, textColor }; // Save with both background and text color
        }
      } else {
        currentNoteId = new Date().getTime().toString(); // New note with unique ID
        notes.push({ id: currentNoteId, title, content, color, textColor }); // Save new note with both colors
      }

      // Save the updated notes array back to storage
      chrome.storage.sync.set({ miniNotes: notes }, function () {
        loadNotes(); // Refresh the sidebar with updated notes
        showSaveConfirmation(); // Show "Note Saved" confirmation
      });
    });
  }

  // Show save confirmation popup
  function showSaveConfirmation() {
    saveConfirmation.style.display = 'block';
    setTimeout(() => {
      saveConfirmation.style.display = 'none';
    }, 1500); // Show for 1.5 seconds
  }

  // Clear the editor
  clearButton.addEventListener('click', function () {
    noteTitleElement.value = '';
    noteElement.value = '';
    noteColorPicker.value = '#ffffff'; // Reset background color picker
    textColorPicker.value = '#000000'; // Reset text color picker
    noteElement.style.backgroundColor = '#ffffff'; // Reset background color
    noteElement.style.color = '#000000'; // Reset text color
    charCount.textContent = '0 characters';
    currentNoteId = null; // Clear current note ID to create a new note
  });

  // Delete the current note
  deleteButton.addEventListener('click', function () {
    if (currentNoteId) {
      chrome.storage.sync.get(['miniNotes'], function (result) {
        let notes = result.miniNotes || [];
        notes = notes.filter(note => note.id !== currentNoteId); // Remove the current note
        chrome.storage.sync.set({ miniNotes: notes }, function () {
          loadNotes(); // Refresh the notes list
          clearButton.click(); // Clear the editor
          currentNoteId = null; // Reset note ID
        });
      });
    } else {
      alert('No note selected to delete');
    }
  });

  // Delete all notes
  deleteAllButton.addEventListener('click', function () {
    if (confirm('Are you sure you want to delete all notes?')) {
      chrome.storage.sync.remove('miniNotes', function () {
        loadNotes(); // Refresh the notes list
        clearButton.click(); // Clear the editor
        currentNoteId = null; // Reset note ID
        alert('All notes have been deleted.');
      });
    }
  });

  // Export the note to a .txt file
  exportButton.addEventListener('click', function () {
    const noteContent = noteElement.value;
    const blob = new Blob([noteContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mini-note.txt';
    a.click();
    URL.revokeObjectURL(url); // Clean up the URL object
  });

  // Add a new note
  addNoteButton.addEventListener('click', function () {
    currentNoteId = null; // Clear current note ID to indicate new note
    clearButton.click(); // Clear the editor for a new note
  });

  // Update the character count when typing in the note content
  noteElement.addEventListener('input', function () {
    charCount.textContent = `${noteElement.value.length} characters`;
  });

  // When the background color picker value changes, update the background color of the note
  noteColorPicker.addEventListener('input', function () {
    noteElement.style.backgroundColor = noteColorPicker.value; // Change background color in real-time
  });

  // When the text color picker value changes, update the text color of the note
  textColorPicker.addEventListener('input', function () {
    noteElement.style.color = textColorPicker.value; // Change text color in real-time
  });

  // Dark mode toggle
  const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

  // Check if dark mode is enabled and apply it on page load
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.classList.replace('fa-moon', 'fa-sun');
  } else {
    document.body.classList.remove('dark-mode');
    darkModeToggle.classList.replace('fa-sun', 'fa-moon');
  }

  darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      darkModeToggle.classList.replace('fa-moon', 'fa-sun');
    } else {
      localStorage.setItem('darkMode', 'disabled');
      darkModeToggle.classList.replace('fa-sun', 'fa-moon');
    }
  });

  // Add search functionality
  searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();

    // Load the notes from storage
    chrome.storage.sync.get(['miniNotes'], function (result) {
      const notes = result.miniNotes || [];

      // Filter notes by title or content based on search term
      const filteredNotes = notes.filter(note =>
        (note.title && note.title.toLowerCase().includes(searchTerm)) ||
        (note.content && note.content.toLowerCase().includes(searchTerm))
      );

      // Display filtered notes in the sidebar
      displayNotes(filteredNotes);
    });
  });

  // Copy the current note
  copyButton.addEventListener('click', function () {
    if (currentNoteId) {
      const title = noteTitleElement.value;
      const content = noteElement.value;

      // Copy title and content to the clipboard
      navigator.clipboard.writeText(`${title}\n\n${content}`).then(() => {
        alert('Note copied to clipboard!');
      }, (err) => {
        console.error('Failed to copy note: ', err);
      });
    } else {
      alert('No note selected to copy');
    }
  });

  // Load notes initially
  loadNotes();

  // Add event listener to the save button
  saveButton.addEventListener('click', saveNote); // Add save functionality to the save button
});
