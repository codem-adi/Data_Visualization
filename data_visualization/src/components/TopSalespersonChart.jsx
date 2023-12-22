import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TopSalespersonChart = ({ dataSet }) => {
     const [topSalespersons, setTopSalespersons] = useState([]);

     useEffect(() => {
          const getTopSalespersons = (data) => {
               const salespersons = {};

               data?.forEach(item => {
                    const salespersonName = item.Salesperson;
                    const revenue = parseFloat(item.Revenue.replace(',', ''));

                    if (salespersons[salespersonName]) {
                         salespersons[salespersonName] += revenue;
                    } else {
                         salespersons[salespersonName] = revenue;
                    }
               });

               const sortedSalespersons = Object.entries(salespersons)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([name, revenue]) => ({ name, revenue }));

               return sortedSalespersons;
          };

          setTopSalespersons(getTopSalespersons(dataSet));
     }, [dataSet]);

     return (
          <div>
               <h2>Top Salespersons Chart</h2>
               <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                         data={topSalespersons}
                         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                         <XAxis dataKey="name" />
                         <YAxis />
                         <Tooltip />
                         <Legend />
                         <Bar dataKey="revenue" fill="#ffc658" />
                    </BarChart>
               </ResponsiveContainer>
          </div>
     );
};

export default TopSalespersonChart;
