const addbtn = document.querySelector("#addbtn")
const main = document.querySelector("#main")

//create an empty array and store the text in localStorage using setItem method 

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea")
    console.log(notes)
    const data = []

    notes.forEach((note) => {
        data.push(note.value)
        console.log(data)
    })

    if(data.length == 0)
    {
        localStorage.removeItem("notes")
    }
    else
    {
        localStorage.setItem("notes", JSON.stringify(data))

    }
}

//addbtn call the addnote function

addbtn.addEventListener("click", () => {

    addNote()
})

// this whole function crate a note body in main div with all save and delete functionality

const addNote = (text = "") => {
    const note = document.createElement("div")
    note.classList.add("note")
    note.innerHTML += `
    <div class="tool">
      <i class="save fa-solid fa-floppy-disk"></i>
      <i class="trash fa-solid fa-trash"></i>
    </div>
    <textarea placeholder="Text-Here">${text}</textarea>
`;
    note.querySelector(".save").addEventListener("click",
        () => {
            saveNotes()
        })
    note.querySelector(".trash").addEventListener("click", () => {
        note.remove()
        saveNotes()
    })
    note.querySelector("textarea").addEventListener("focusout",
        () => {
            saveNotes()
        })
    main.appendChild(note);
    saveNotes();
}


// this function get localStorage notesvalue put in a note on screen
(
    function () {
        const lsnotes = JSON.parse(localStorage.getItem("notes"));
        if (lsnotes == null) {
            addNote()
        }
        else {
            lsnotes.forEach((lsnote) => {
                addNote(lsnote)
            })
        }

    })
    ()