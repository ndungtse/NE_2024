import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

interface LineChartProps {
   labels: string[];
   series: { name: string; data: number[] }[];
   title: string;
}

const LineChart: React.FC<LineChartProps> = ({ labels, series, title }) => {
   const [chartWidth, setChartWidth] = useState<number>(700); // Initial width
   const [chartHeight, setChartHeight] = useState<number>(313); // Initial height

   // Function to update chart dimensions based on window size
   const updateChartDimensions = () => {
      const windowWidth = window.innerWidth;
      const newWidth = windowWidth * 0.42;
      const newHeight = newWidth * 0.446;
      setChartWidth(newWidth);
      setChartHeight(newHeight);
   };

   // Update chart dimensions when the window is resized
   useEffect(() => {
      updateChartDimensions();
      window.addEventListener('resize', updateChartDimensions);
      return () => {
         window.removeEventListener('resize', updateChartDimensions);
      };
   }, []); // Empty dependency array ensures it only runs once on mount and cleanup

   const chartOptions: ApexCharts.ApexOptions = {
      series: series.map((data) => ({
         name: data.name,
         data: data.data,
      })),
      chart: {
         type: 'line',
         zoom: {
            enabled: false,
         },
      },
      dataLabels: {
         enabled: false,
      },
      stroke: {
         curve: 'smooth',
      },
      legend: {
         position: 'top',
      },
      colors: ['#1B60AC', '#FFE351', '#02E083'],
      grid: {
         row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5,
         },
      },
      xaxis: {
         categories: labels,
      },
   };

   return (
      <div className="rounded-lg bg-white w-full">
         <div className="flex justify-between w-full">
            <h1 className="text-left font-bold text-2xl pl-10 pt-6">{title}</h1>
            <div className="h-10 mr-8 mt-6">
               <select className="h-10 w-28 pl-4 items-center border-[1px] border-gray-100 rounded-lg">
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
               </select>
            </div>
         </div>
         <div className="mt-6 flex justify-center ">
            <Chart options={chartOptions} series={chartOptions.series} type="line" width={chartWidth} height={chartHeight} />
         </div>
      </div>
   );
};

export default LineChart;
