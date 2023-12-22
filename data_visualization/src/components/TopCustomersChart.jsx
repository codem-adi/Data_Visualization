import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TopCustomersChart = ({ dataSet }) => {
     const [topCustomers, setTopCustomers] = useState([]);

     useEffect(() => {
          const getTopCustomers = (data) => {
               const customers = {};

               data?.forEach(item => {
                    const customerName = item.Customer_Name;
                    const revenue = parseFloat(item.Revenue.replace(',', ''));

                    if (customers[customerName]) {
                         customers[customerName] += revenue;
                    } else {
                         customers[customerName] = revenue;
                    }
               });

               const sortedCustomers = Object.entries(customers)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([name, revenue]) => ({ name, revenue }));

               return sortedCustomers;
          };

          setTopCustomers(getTopCustomers(dataSet));
     }, [dataSet]);

     return (
          <div>
               <h2>Top 5 Customers Chart</h2>
               <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                         data={topCustomers}
                         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                         <XAxis dataKey="name" />
                         <YAxis />
                         <Tooltip />
                         <Legend />
                         <Bar dataKey="revenue" fill="#82ca9d" />
                    </BarChart>
               </ResponsiveContainer>
          </div>
     );
};

export default TopCustomersChart;
