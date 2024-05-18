// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import 'bootstrap/dist/css/bootstrap.min.css';
// const ChartComponent = () => {
//     const data = {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//         datasets: [
//             {
//                 label: 'Sales',
//                 backgroundColor: 'rgba(75,192,192,1)',
//                 borderColor: 'rgba(0,0,0,1)',
//                 borderWidth: 2,
//                 data: [65, 59, 80, 81, 56, 55, 40],
//             },
//         ],
//     };

//     const options = {
//         scales: {
//             x: {
//                 type: 'category', // Use 'category' for x-axis
//                 position: 'bottom', // Position of x-axis
//             },
//             y: {
//                 beginAtZero: true, // Start y-axis from zero
//             },
//         },
//         plugins: {
//             title: {
//                 display: true,
//                 text: 'Sales Report',
//                 fontSize: 20,
//             },
//             legend: {
//                 display: true,
//                 position: 'right',
//             },
//         },
//     };


//     return (
//         <div className="container">
//             <Bar data={data} options={options} />
//         </div>
//     );
// };

// export default ChartComponent;
