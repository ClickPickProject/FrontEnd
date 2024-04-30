'use client';
import { tokenState } from '@/atoms/tokenState';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
export default function ReporterCharts({ title, year }) {
  const token = useRecoilValue(tokenState);
  const { data, isPending, isError } = useQuery({
    queryKey: ['monthUserCount'],
    queryFn: async () => {
      const res = await axios.get(`/api/admin/user/month/${year}`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    },
  });

  const series = [
    {
      name: '가입자 수',
      data: [2, 2],
    },
  ];

  const options = {
    chart: {
      height: 200,
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: title,
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [year],
    },
  };

  return (
    <>
      <div>
        <div id='chart'>
          <Chart type='line' options={options} series={series} height={200} />
        </div>
        <div id='html-dist'></div>
      </div>
    </>
  );
}
