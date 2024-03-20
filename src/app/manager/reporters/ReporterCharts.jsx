'use client';
import dynamic from 'next/dynamic';
// import Chart from 'react-apexcharts';
export default function ReporterCharts() {
  const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
  const series = [
    {
      name: 'Desktops',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: '신고자 추이',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
  };

  return (
    <>
      <div>
        <div id='chart'>
          {typeof window !== 'undefined' && <Chart type='line' options={options} series={series} height={350} />}
        </div>
        <div id='html-dist'></div>
      </div>
    </>
  );
}
