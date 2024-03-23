'use client';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
export default function ReporterCharts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true);
    } else {
      return null;
    }
  }, []);

  const series = [
    {
      name: '신고요청 수',
      data: [10, 41, 35, 51, 49],
    },
  ];

  const options = {
    chart: {
      height: 200,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: true,
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
      categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    },
  };

  return (
    <>
      <div>
        <div id='chart'>{mounted && <Chart type='line' options={options} series={series} height={200} />}</div>
        <div id='html-dist'></div>
      </div>
    </>
  );
}
