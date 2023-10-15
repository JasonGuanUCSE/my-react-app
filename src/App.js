import './App.css';
import { useState, } from "react";

function App() {
  // show or hide the prescheduled flights form
  const [showHide, setShowHide] = useState(true);
  // file to send to lambda function
  const [file, setFile] = useState(null);

  // send file to lambda function when submit button is clicked
  const UploadFile = async (e) => {
    e.preventDefault();
    console.log(file);
    //pass the file to the backend python file
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });
      //get the response from the backend
      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <div id="header">
      <h1>Airport Flight Scheduling System</h1>
    </div>

    <div className= "MainPage">

      <div className="center">
        <div id="inputContainer">
          {showHide &&(
            <form id="prescheduled">
              <h3>Prescheduled flights</h3>
              <p>Upload a text file of prescheduled flights.</p>

              <label for="submitFile" className="customSubmit">Choose File</label>
              <input id="submitFile" type="file" onChange={(e) => setFile(e.target.files[0])} /><br></br>

              {file && (
                <p id="fileName">{file.name}</p>
              )}

              <button type="submit" onClick={(e) => UploadFile(e)}>Submit file</button><br></br>

              <div id="manual">
                <span id="hidePrescheduled" onClick={() => setShowHide(!showHide)}>Enter new flight info manually.</span>
              </div>
            </form>
          )}

          {!showHide &&(
            <form id="inputFlight">
            <h3>Schedule a new flight</h3>
            
            <div id="flightDetails">
              <input type="text" placeholder="Departure city"/>
              <input type="text" placeholder="Arrival city"/>
              <input type="text" placeholder="Departure time in min"/>
              <input type="text" placeholder="Arrival time in min"/>
            </div>

            <button id="submitButton" type="submit">Submit flight</button>

            <div id="backToPrescheduled">
              <span id="hideManual" onClick={() => setShowHide(!showHide)}>Upload file of prescheduled flights.</span>
            </div>
          </form>
          )}

        </div>

      </div>
    </div>
    </>
  );
}

export default App;

