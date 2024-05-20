'use client';
import { tokenState } from '@/atoms/tokenState';
import Loading from '@/components/Loading';
import { axiosInstance } from '@/components/utils/Axios';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Chart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
export default function ReporterCharts3({ title, year }) {
  const token = useRecoilValue(tokenState);
  const [seriesData, setSeriesData] = useState([]);
  const { data, isPending, isError } = useQuery({
    queryKey: ['monthCommentUserCount'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/admin/report/comment/${2024}`, {
        headers: {
          Authorization: token,
        },
      });
      setSeriesData(res.data);
      return res.data;
    },
  });

  const series = [
    {
      name: '댓글 신고자 수',
      data: Object.values(data || {}),
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
      categories: Object.keys(data || {}).map((month) => `${month}`),
    },
  };

  if (isPending || isError) return <Loading isPending={isPending} isError={isError} />;

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
