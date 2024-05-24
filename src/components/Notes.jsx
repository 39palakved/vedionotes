// import React from 'react';
// import {useNavigate,useLocation} from 'react-router-dom'
// function Notes({videoId}) {
//   const nevigate = useNavigate();
//   const location = useLocation();
//   const path = `/video/${videoId}`;
//   function submitNote() {
//     var noteInput = document.getElementById("noteInput").value;
//     var noteDisplay = document.getElementById("noteDisplay");
    
//     // Check if input is not empty
//     if (noteInput.trim() !== "") {
//       noteDisplay.textContent = "Your Note: " + noteInput;
//     } else {
//       noteDisplay.textContent = "Please enter a note.";
//     }
//   }
//  /* const handleChange =(e)=>{
//     e.preventDefault();
//     //localStorage.setItem('prevpath',location.path)
//     window.location.href='/Loggin';
//    // nevigate("/Loggin")
//   }*/
//   return (
//    <div>
//       <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
//     <h2 className="text-lg font-semibold mb-4">Notepad</h2>
//     <textarea id="noteInput" className="w-full h-32 border border-gray-300 rounded-md p-2 mb-4"  placeholder="Write your note here..."></textarea>
//     <button onclick="submitNote()" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit Note</button>
//     <p id="noteDisplay" className="mt-4"></p>
//   </div>  
//     </div>
//   );
// }

// export default Notes;
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Notes({ videoId }) {
    const navigate = useNavigate();
    const location = useLocation();

    async function submitNote() {
        const noteInput = document.getElementById("noteInput").value;
        const noteDisplay = document.getElementById("noteDisplay");

        // Check if input is not empty
        if (noteInput.trim() !== "") {
            noteDisplay.textContent = "Your Note: " + noteInput;
            console.log("Video ID:", videoId); // Print videoId to console

            // Send POST request to the backend to save the note
            try {
                const response = await fetch('api/note/notes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        videoId,
                        notes: noteInput,
                        // You can add user ID here if you have it
                    })
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Note saved:', result);
                } else {
                    console.error('Failed to save note');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            noteDisplay.textContent = "Please enter a note.";
        }
    }

    return (
        <div>
            <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-4">Notepad</h2>
                <textarea id="noteInput" className="w-full h-32 border border-gray-300 rounded-md p-2 mb-4"  placeholder="Write your note here..."></textarea>
                <button onClick={submitNote} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit Note</button>
                <p id="noteDisplay" className="mt-4"></p>
            </div>  
        </div>
    );
}

export default Notes;