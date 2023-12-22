import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MonthlyRevenueChart = ({ dataSet }) => {
     const [monthlyRevenue, setMonthlyRevenue] = useState([]);

     useEffect(() => {
          const getRevenueByMonth = (data) => {
               const revenueByMonth = Array.from({ length: 12 }, (_, index) => ({
                    month: index + 1,
                    name: new Date(2000, index, 1).toLocaleDateString('en-US', { month: 'long' }),
                    revenue: 0,
               }));

               data?.forEach(item => {
                    const orderDate = new Date(item.Order_Date);
                    const month = orderDate.getMonth();
                    const revenue = parseFloat(item.Revenue.replace(',', ''));
                    revenueByMonth[month].revenue += revenue;
               });

               return revenueByMonth;
          };

          setMonthlyRevenue(getRevenueByMonth(dataSet));
     }, [dataSet]);

     return (
          <div style={{ width: "100%" }}>
               <h2>Monthly Revenue Chart</h2>
               <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                         data={monthlyRevenue}
                         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                         <XAxis dataKey="name" />
                         <YAxis />
                         <Tooltip />
                         <Legend />
                         <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                    </LineChart>
               </ResponsiveContainer>
          </div>
     );
};

export default MonthlyRevenueChart;
