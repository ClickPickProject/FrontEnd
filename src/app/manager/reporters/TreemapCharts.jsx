'use client';
import { tokenState } from '@/atoms/tokenState';
import Loading from '@/components/Loading';
import { axiosInstance } from '@/components/utils/Axios';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';

export default function TreemapCharts() {
  const token = useRecoilValue(tokenState);
  const { data, isPending, isError } = useQuery({
    queryKey: ['monthUserCount3'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/admin/user/month/${2024}`, { headers: { Authorization: token } });
      return res.data;
    },
  });

  const [series] = useState([
    {
      data: Object.entries(data || {}).map(([month, count]) => ({ x: `${month}월`, y: count })),
    },
  ]);

  const [options] = useState({
    legend: { show: false },
    chart: { height: 350, type: 'treemap', color: 'red', toolbar: { show: false } },
    title: { text: '', align: 'center' },
    colors: [
      '#FFA07A',
      '#E6E6FA',
      '#90EE90',
      '#87CEEB',
      '#00CED1',
      '#FFC0CB',
      '#D2B48C',
      '#FFDAB9',
      '#FFD700',
      '#D3D3D3',
      '#ADD8E6',
      '#87CEFA',
    ],
    plotOptions: { treemap: { distributed: true, enableShades: false } },
  });

  if (isPending) return <Loading isPending={isPending} />;
  if (isError) return <div>불러오는 중 에러가 발생하였습니다.</div>;

  return (
    <div>
      <div id='chart'>
        <ReactApexChart options={options} series={series} type='treemap' height={350} />
      </div>
      <div id='html-dist'></div>
    </div>
  );
}
