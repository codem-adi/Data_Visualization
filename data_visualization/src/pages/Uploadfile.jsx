import { useState } from 'react'
import Papa from "papaparse"
import axios from 'axios'
import verifyToken from '../utils/verifyToken'
import { useNavigate } from 'react-router-dom'
import getToken from '../utils/getToken'
import "../styling/uploadfile.css"
import logOutUser from '../utils/logoutUser'

function Uploadfile() {
     const navigate = useNavigate()
     return (
          <div className='upload_section'>
               <div className='home_navigate'>
                    <button onClick={() => { navigate("/") }}>Home</button>
                    <button onClick={() => { logOutUser(); navigate("/login") }}>Log Out</button>

               </div>
               <div className='upload_section_heading'>Uploadfile</div>
               <FileUploadComponent />
          </div>
     )
}

export default Uploadfile

const FileUploadComponent = () => {

     const navigate = useNavigate()
     const [fileContent, setFileContent] = useState(null);
     const [fileDetails, setFileDetails] = useState({ size: "", name: "", type: "" });



     const handleFileUpload = (event) => {

          const file = event.target.files[0];
          if (file.type != "text/csv") {
               alert("File type not allowed only accept CSV files with header.")
               event.target.value = ""
               return
          }
          setFileDetails(el => ({
               ...el,
               size: (file.size / (1024 * 1024)).toFixed(2),
               name: file.name,
               type: file.type,
          }))
          console.log("Size ", (file.size / (1024 * 1024)).toFixed(2));
          console.log("Type ", file);
          console.log("Name", file.name);
          Papa.parse(file, {
               header: true,
               complete: (results) => {
                    setFileContent(results.data);
               },
          });
     };

     async function uploadDataset() {
          const errors = verify()
          const token = getToken()
          const tokenValid = verifyToken(token)
          // Validating token so that we can save the user data usage as well as server resources.
          if (tokenValid) {
               if (!errors.length) {
                    const request = await axios.post('http://localhost:3000/api/v1/data/upload', { info: fileDetails, data: fileContent }, {
                         headers: {
                              'Authorization': `Bearer ${token}`
                         }
                    })
                    const response = request.data
                    // alert(response.message)
                    console.log(response)
               }
          }
          else {
               // Token Not valid
               navigate("/login")
          }
     }

     function verify() {
          const error = []

          if (!fileDetails.name.length) {
               error.push("Dataset name can't be blank")
          }
          if (fileDetails.size > 10) {
               error.push("File greater then 10 MB not allowed")
          }

          return error
     }

     return (
          <>
               <div className='upload_container'>
                    <div>
                         <div className="dropZoneContainer">
                              <input type="file" id="drop_zone" className="FileUpload" accept=".csv" onChange={handleFileUpload} />
                              <div className="dropZoneOverlay">Drag and drop your File <br />or<br />Click to add</div>
                         </div>
                         <button onClick={uploadDataset} className='upload_dataset'>Upload Data</button>
                    </div>
                    <DataDisplay dataset={fileContent} />
               </div>
          </>
     );
};



const DataDisplay = ({ dataset }) => {
     return (
          <div className='dataset_cards'>
               {dataset?.map((dataItem, index) => (
                    <div key={index} style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}>
                         <h3>Item {index + 1}</h3>
                         <ul>
                              {Object.entries(dataItem).map(([key, value]) => (
                                   <li key={key}>
                                        <strong>{key}:</strong> {value}
                                   </li>
                              ))}
                         </ul>
                    </div>
               ))}
          </div>
     );
};


