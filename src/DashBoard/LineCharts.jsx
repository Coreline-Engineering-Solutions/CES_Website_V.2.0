import React from 'react';
import Chart from 'react-apexcharts';

const LineChartCard = () => {
  const chartConfig = {
    series: [
      {
        name: 'Sales',
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
      },
    ],
    chart: {
      type: 'line',
      height: 240,
      toolbar: {
        show: false,
      },
    },
    title: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#FFFFFF'],
    stroke: {
      lineCap: 'round',
      curve: 'smooth',
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: '#FFFFFF',
          fontSize: '12px',
          fontFamily: 'inherit',
          fontWeight: 400,
        },
      },
      categories: [
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: '#FFFFFF',
          fontSize: '12px',
          fontFamily: 'inherit',
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: '#dddddd',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: 'dark',
    },
  };

  return (
    <div className="relative flex flex-col rounded-xl bg-blue-700 bg-clip-border text-gray-700 shadow-md">
      <div className="relative mx-4 mt-4 flex flex-col gap-4 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none md:flex-row md:items-center">
        <div>
          <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal  text-white text-blue-gray-900 antialiased">
            Line Chart
          </h6>
          <p className="block max-w-sm font-sans text-sm font-normal leading-normal text-white antialiased">
            Visualize your data in a simple way using the @material-tailwind/html
            chart plugin.
          </p>
        </div>
      </div>
      <div className="pt-6 px-2 pb-0">
        <Chart options={chartConfig} series={chartConfig.series} type="line" height={240} />
      </div>
    </div>
  );
};

export default LineChartCard;