import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import getToken from '../utils/getToken'
import verifyToken from '../utils/verifyToken'
import axios from 'axios'
import "../styling/viewdataset.css"
import logOutUser from '../utils/logoutUser'
import TopSalespersonChart from '../components/TopSalespersonChart'
import TopCustomersChart from '../components/TopCustomersChart'
import MonthlyRevenueChart from '../components/MonthlyRevenueChart'


function ViewDataset() {
     const navigate = useNavigate()
     const { state } = useLocation()
     const [dataset, setDataset] = useState();
     const [saleBySalesPerson, setsaleBySalesPerson] = useState();
     const [saleByRegion, setsaleByRegion] = useState();
     const [topFiveCustomers, setTopFiveCustomers] = useState();
     const [saleTrend, setSaleTrend] = useState();


     useEffect(() => {
          console.log("location ", state.id)
          if (state?.id > 0) {
               navigate("/")
          }
          getDataset(state?.id)
     }, [])

     function applyAllFilter(data) {
          const SaleBySalesPerson = [];
          const SaleByRegion = [];
          const TopFiveCustomers = [];

          const SaleTrend = getRevenueByMonth(data)
          console.log("SaleTrend ", SaleTrend);
          setSaleTrend(SaleTrend)
     }

     async function getDataset(id) {
          try {
               console.log("getAllDataSet ");
               const token = getToken()
               const tokenValid = verifyToken(token)
               // Validating token so that we can save the user data usage as well as server resources.
               if (tokenValid) {
                    const request = await axios.get(`http://localhost:3000/api/v1/data/orders?datasetID=${id}`, {
                         headers: {
                              'Authorization': `Bearer ${token}`
                         }
                    })
                    const response = request.data
                    console.log("View specific dataset ", response);
                    console.log(response)
                    if (response.status) {


                         setDataset(response.data)
                         // calling filter 
                         applyAllFilter(response.data)
                    }

                    else {
                         console.log(response.message);
                    }
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
          // <div>ViewDataset {location?.state?.id}</div>
          <div className='dataset_view'>
               <div className='home_nav'>
                    <button onClick={() => { navigate("/") }}>Home </button>
                    <button onClick={() => { logOutUser(); navigate("/login") }}>Log Out</button>
               </div>
               <div className='visual_parent'>
                    <div className='visual_child'>
                         <MonthlyRevenueChart dataSet={dataset} />
                    </div>
                    <div className='visual_child'>
                         <div className='visual_sub_child'>
                              <TopSalespersonChart dataSet={dataset} />
                         </div>
                         <div className='visual_sub_child'>
                              <TopCustomersChart dataSet={dataset} />
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default ViewDataset


function getRevenueByMonth(data) {
     const monthlyRevenue = {};

     data?.forEach(item => {
          const orderDate = new Date(item.Order_Date);
          const month = orderDate.getMonth() + 1;
          const revenue = parseFloat(item.Revenue.replace(',', ''));
          monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenue;
     });

     for (let month = 1; month <= 12; month++) {
          monthlyRevenue[month] = (monthlyRevenue[month] || 0).toFixed(2);
     }

     return monthlyRevenue;
}
