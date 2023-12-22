import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import getToken from '../utils/getToken'
import verifyToken from '../utils/verifyToken'
import "../styling/home.css"
import logOutUser from '../utils/logoutUser'

function Home() {
  const navigate = useNavigate()
  const [allDataset, setAllDataset] = useState()

  async function getAllDataSet() {
    try {
      console.log("getAllDataSet ");
      const token = getToken()
      const tokenValid = verifyToken(token)
      // Validating token so that we can save the user data usage as well as server resources.
      if (tokenValid) {
        const request = await axios.get('http://localhost:3000/api/v1/data/getall', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const response = request.data
        if (response.status) {
          setAllDataset(response.data)
        }
        // alert(response.message)
        console.log(response)
      }
      else {
        // Token Not valid
        navigate("/login")
      }
    } catch (error) {
      console.log("Error getting all the dataset ", error);
    }
  }

  useEffect(() => {
    getAllDataSet()
  }, [])
  return (
    <div className='home_page'>
      <div className='nav_upload'>
        <button onClick={() => { navigate("/upload") }}>Upload Dataset</button>
        <button onClick={() => { logOutUser(); navigate("/login") }}>Log Out</button>
      </div>
      <div className='home_page_heading'>All data set</div>
      <table className='dataset_table'>
        <thead>
          <tr className='table_heading_tr'>
            <th>Index</th>
            <th>Name</th>
            <th>Size (MB)</th>
            <th>Type</th>
            <th>Total document</th>
            <th>Delete</th>
            <th>View Dataset</th>
          </tr>
        </thead>
        <tbody>
          {
            allDataset?.length ?
              allDataset?.map((el, index) => (
                <SingleDataset key={el?._id} dataset={el} index={index} />
              ))
              :
              <>
                <tr >
                  <td colSpan="7" className='empty_dataset_td'>
                    <button onClick={() => { navigate("/upload") }} className='upload_dataset_btn'>Upload Some Data First</button>
                  </td>
                </tr>
              </>
          }
        </tbody>
      </table>
    </div>
  )
}

export default Home


function SingleDataset(props) {
  const navigate = useNavigate()
  const { dataset, index } = props;
  console.log("Props ", props);
  async function deleteDataset() {

    try {
      console.log("getAllDataSet ");
      const token = getToken()
      const tokenValid = verifyToken(token)
      // Validating token so that we can save the user data usage as well as server resources.
      if (tokenValid) {
        const request = await axios.delete(`http://localhost:3000/api/v1/data/delete?datasetID=${dataset?._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const response = request.data
        console.log("Deleted ", response);
        console.log(response)
      }
      else {
        // Token Not valid
        navigate("/login")
      }
    } catch (error) {
      console.log("Error getting all the dataset ", error);
    }
  }
  return (
    <tr>
      <td data-label="Index">{index + 1}</td>
      <td data-label="Name">{dataset?.name}</td>
      <td data-label="Size (MB)">{dataset?.size}</td>
      <td data-label="Type">{dataset?.type}</td>
      <td data-label="Total Document">{dataset?.total_count}</td>
      <td data-label="Delete Document"><button onClick={deleteDataset} className='delete_dataset'>Delete</button></td>
      <td data-label="View Document"><button onClick={() => { navigate("/view/dataset", { state: { id: dataset._id } }) }} className='view_dataset'>View Data</button></td>
    </tr>
  )
}