'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function TreemapCharts() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['monthUserCount'],
    queryFn: async () => {
      const res = await axios.get(`/api/admin/user/month/${year}`);
      return res.data;
    },
  });
  const [series] = useState([
    {
      data: [
        { x: '1월', y: 218 },
        { x: '2월', y: 149 },
        { x: '3월', y: 184 },
        { x: '4월', y: 55 },
        { x: '5월', y: 84 },
        { x: '6월', y: 31 },
        { x: '7월', y: 70 },
        { x: '8월', y: 30 },
        { x: '9월', y: 44 },
        { x: '10월', y: 68 },
        { x: '11월', y: 28 },
        { x: '12월', y: 19 },
      ],
    },
  ]);

  const [options] = useState({
    legend: { show: false },
    chart: { height: 350, type: 'treemap', toolbar: { show: false } },
    title: { text: '', align: 'center' },
    colors: [
      '#9ABCEB',
      '#F7B844',
      '#93BFDC',
      '#EC3C65',
      '#CDD7B6',
      '#A684A8',
      '#D43F97',
      '#1E5D8C',
      '#421243',
      '#7F94B0',
      '#EF6537',
      '#C0ADDB',
    ],
    plotOptions: { treemap: { distributed: true, enableShades: false } },
  });

  return (
    <div>
      <div id='chart'>
        <ReactApexChart options={options} series={series} type='treemap' height={350} />
      </div>
      <div id='html-dist'></div>
    </div>
  );
}
