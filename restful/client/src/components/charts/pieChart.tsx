import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

interface PieChartProps {
   labels: string[];
   series: number[];
   title: string;
}

const PieChart: React.FC<PieChartProps> = ({ labels, series, title }) => {
   const [chartWidth, setChartWidth] = useState<number>(380); // Initial width

   // Function to update chart width based on window size
   const updateChartWidth = () => {
      const windowWidth = window.innerWidth;
      const newWidth = windowWidth * 0.24; // 50% of the window width
      setChartWidth(newWidth);
   };

   // Update chart width when the window is resized
   useEffect(() => {
      updateChartWidth();
      window.addEventListener('resize', updateChartWidth);
      return () => {
         window.removeEventListener('resize', updateChartWidth);
      };
   }, []); // Empty dependency array ensures it only runs once on mount and cleanup

   const chartOptions: ApexCharts.ApexOptions = {
      labels,
      series: series.map((value) => Number(value)),
      chart: {
         type: 'pie',
      },
      legend: {
         position: 'bottom',
      },
      responsive: [
         {
            breakpoint: 768,
            options: {
               chart: {
                  width: 300,
               },
               legend: {
                  position: 'bottom',
               },
            },
         },
      ],
   };

   return (
      <div className="w-full rounded-lg bg-white shadow-md shadow-gray-200 pb-6">
         <div className="w-full flex justify-between">
            <h1 className="text-left font-bold text-2xl pl-10 pt-6">{title}</h1>
            <div className="h-10 mr-8 mt-6">
               <select className="h-10 w-28 pl-4  items-center border-[1px] border-gray-100 rounded-lg">
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
               </select>
            </div>
         </div>

         <div className="mt-6 flex justify-center">
            <Chart options={chartOptions} series={series} type="pie" width={chartWidth} />
         </div>
      </div>
   );
};

export default PieChart;
