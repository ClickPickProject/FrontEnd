'use client';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import MapHeader from './MapHeader';
import Pagination from 'react-js-pagination';
import { useRecoilValue } from 'recoil';
import { mapMarkerState, mapMenuState, placeBookmarkListState, placeListState } from '@/atoms/mapState';
import Link from 'next/link';
import { motion } from 'framer-motion';
import WriterView from '../Community/BestPost/WriterView';
import StatusView from '../Community/BestPost/StatusView';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
export default function MapSideMenu({
  handleMarkerClick,
  handleSearch,
  handleInputChange,
  totalItemsCount,
  currentPage,
  postsPerPage,
  handlePageChange,
}) {
  dayjs.locale('ko');
  const mapMenu = useRecoilValue(mapMenuState);
  const placeList = useRecoilValue(placeListState);
  const placeBookmarkList = useRecoilValue(placeBookmarkListState);
  const categoryEmojiMap = {
    편의점: '🏪',
    카페: '☕️',
    음식점: '🍽',
    병원: '🏥',
    학교: '🏫',
    문화시설: '🏛',
    숙박: '🏨',
    관광명소: '🏞',
    지하철역: '🚇',
    은행: '💳',
    '주유소,충전소': '⛽️',
    백화점: '🛍',
    약국: '💊',
    주차장: '🅿️',
  };
  const [temperature, setTemperature] = useState(0);
  const [todayDust10, setTodayDust10] = useState(null);
  const [tomorrowDust10, setTomorrowDust10] = useState(null);
  const [todayDust25, setTodayDust25] = useState(null);
  const [tomorrowDust25, setTomorrowDust25] = useState(null);
  const [dustRegion, setDustRegion] = useState([]);
  const [dustStatus, setDustStatus] = useState('미세먼지');
  const markers = useRecoilValue(mapMarkerState);

  function getCategoryEmoji(category) {
    return categoryEmojiMap[category] || '';
  }

  useEffect(() => {
    const weatherFetch = async () => {
      const res = await axios.get(
        'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=t4HyzXokF2%2BegQjKxQ6Csf4oKnkGlP7SWlX7kTFIhMfM%2B%2FpYGSzqbONCgN9uxTRz9YgEUXZvFJwBSGufRkYrBw%3D%3D&pageNo=1&numOfRows=10&dataType=JSON&base_date=20240416&base_time=1200&nx=60&ny=127',
      );
      setTemperature(res.data.response.body);
    };

    const dustFetch = async () => {
      const res = await axios.get(`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth`, {
        params: {
          serviceKey: process.env.NEXT_PUBLIC_WEATHER_SECRET_KEY,
          returnType: 'json',
          numOfRows: 10,
          pageNo: 1,
          searchDate: '2024-04-18',
          // searchDate: dayjs().format('YYYY-MM-DD'),
          InformCode: 'PM10',
        },
      });
      dayjs().format('YYYY-MM-DD HH:mm');
      console.log(dayjs().add(6, 'h').format('YYYY-MM-DD HH:mm'));
      setTodayDust10(res.data.response.body.items[0]);
      setTomorrowDust10(res.data.response.body.items[1]);
      setTodayDust25(res.data.response.body.items[2]);
      setTomorrowDust25(res.data.response.body.items[3]);
      console.log(res.data.response.body.items[2]);
    };
    weatherFetch();
    dustFetch();
  }, []);

  const dustStyle = (item) => {
    switch (item) {
      case '좋음':
        return 'text-blue-500';
      case '보통':
        return 'text-green-600 font-bold';
      case '나쁨':
        return 'text-orange-600 font-bold';
      case '매우나쁨':
        return 'text-red-600 font-bold';
      default:
        return '';
    }
  };
  return (
    <motion.div
      className='absolute left-0 z-50 flex h-screen w-[400px] flex-col bg-white shadow-lg'
      initial={{ opacity: 0, x: '-100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 1, x: '-100%' }}
      transition={{ duration: 0.3 }}
    >
      <div className='flex flex-col items-center gap-4 bg-pink-200 px-8 py-2'>
        <Link href='/' className='mr-auto flex items-center'>
          <figure className='p-2'>
            <Image src='/Images/clickpick_icon.png' width={32} height={32} alt='logo' />
          </figure>
          <span className='text-2xl font-bold'>ClickPick</span>
        </Link>
        {/* 검색창 */}
        <form onSubmit={handleSearch} className='relative flex h-[auto] w-full'>
          <input
            className='w-full rounded-[4px] py-3 pl-3 outline-none'
            type='text'
            placeholder='장소, 주소, 검색'
            onChange={handleInputChange}
          />
          <div className='absolute bottom-0 right-4 top-0 flex items-center'>
            <button type='submit'>
              <FaSearch color='hotpink' size={20} />
            </button>
          </div>
        </form>
        <MapHeader />
      </div>

      {mapMenu === '지도 홈' && (
        <>
          {/* 지도 검색 결과 */}
          <section className='overflow-y-auto'>
            <ul>
              {markers.length === 0 ? (
                <>
                  {temperature && (
                    <div className='flex flex-col items-center gap-2 border-2 p-4'>
                      <span className='text-lg font-bold'>오늘의 날씨</span>
                      <div className='flex items-center gap-2'>
                        <span className='text-lg font-bold'>{temperature.fcstValue}℃</span>
                      </div>
                    </div>
                  )}
                  <div className='flex items-center justify-between pl-4'>
                    <div className='mt-4 text-2xl font-bold'>금일의 날씨</div>
                    <div className='[&>*]:text-md mt-4 flex gap-4 p-2 [&>*]:rounded-md [&>*]:p-2 [&>*]:transition-all'>
                      <button
                        className='bg-orange-300 transition-all hover:bg-orange-400'
                        onClick={() => setDustStatus('초미세먼지')}
                      >
                        초미세먼지
                      </button>
                      <button
                        className='bg-green-300 transition-all hover:bg-green-400'
                        onClick={() => setDustStatus('미세먼지')}
                      >
                        미세먼지
                      </button>
                    </div>
                  </div>

                  {dustStatus === '미세먼지' && (
                    <>
                      {todayDust10?.informGrade.split(',').map((item, idx) => (
                        <div className='flex p-4'>
                          <div className='w-full rounded-lg bg-sky-200 p-4 shadow-lg'>
                            <div className='flex justify-between'>
                              <h2 className='mb-2 text-2xl font-bold'>{item.split(':')[0]}</h2>
                              <h2 className='text-lg font-semibold text-green-600'>
                                {todayDust10?.informCode === 'PM10' && '미세먼지'}
                              </h2>
                            </div>

                            <div className='flex justify-between'>
                              <div>
                                <p className='text-lg font-semibold'>현재 온도:</p>
                                <p className='text-xl'>1 °C</p>
                              </div>
                              <div className='flex items-center justify-center'>
                                <p className={`text-md ${dustStyle(item.split(':')[1].trim())}`}>
                                  {item.split(':')[1].trim()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  {dustStatus === '초미세먼지' && (
                    <>
                      {todayDust25?.informGrade.split(',').map((item, idx) => (
                        <div className='flex p-4'>
                          <div className='w-full rounded-lg bg-sky-200 p-4 shadow-lg'>
                            <div className='flex justify-between'>
                              <h2 className='mb-2 text-2xl font-bold'>{item.split(':')[0]}</h2>
                              <h2 className='text-lg font-semibold text-orange-600'>
                                {todayDust25?.informCode === 'PM25' && '초미세먼지'}
                              </h2>
                            </div>
                            <div className='flex justify-between'>
                              <div>
                                <p className='text-lg font-semibold'>현재 온도:</p>
                                <p className='text-xl'>1 °C</p>
                              </div>
                              <div className='flex items-center justify-center'>
                                <p className={`text-md ${dustStyle(item.split(':')[1].trim())}`}>
                                  {item.split(':')[1].trim()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </>
              ) : (
                <>
                  <h2 className='pl-4 text-lg font-semibold'>검색 결과 ({totalItemsCount}개)</h2>
                </>
              )}

              {markers.map((marker) => (
                <li key={marker.content.placeUrl}>
                  <div
                    className={`flex h-[100px] w-full flex-col gap-1 border-b py-2 pl-4 transition-all hover:bg-pink-100`}
                  >
                    <div className='flex items-center gap-1'>
                      <span className='cursor-pointer text-lg font-bold' onClick={() => handleMarkerClick(marker)}>
                        {marker.content}
                      </span>
                      <span className='text-md font-normal opacity-80'>
                        {getCategoryEmoji(marker.placeCategoryGroupName)} {marker.placeCategoryGroupName}
                      </span>
                    </div>
                    <span className='text-sm opacity-80'>{marker.placeAddressName}</span>
                    <span className='mr-auto text-sm opacity-60 hover:opacity-100'>
                      <Link href={marker.placeUrl} target='_blank' rel='noopener noreferrer'>
                        홈페이지
                      </Link>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className='flex justify-center'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={postsPerPage}
                totalItemsCount={totalItemsCount}
                onChange={handlePageChange}
                itemClass='px-3 py-1 rounded-md mr-2 cursor-pointer'
                activeClass='bg-pink-400 text-white'
                itemClassFirst='px-3 py-1 rounded-md mr-2 cursor-pointer'
                itemClassPrev='px-3 py-1 rounded-md mr-2 cursor-pointer'
                itemClassNext='px-3 py-1 rounded-md mr-2 cursor-pointer'
                itemClassLast='px-3 py-1 rounded-md mr-2 cursor-pointer'
                innerClass='flex'
              />
            </div>
          </section>
        </>
      )}

      {mapMenu === '즐겨찾기' && (
        <>
          <div className='mx-auto w-full overflow-y-auto py-8'>
            <h1 className='mb-4 pl-4 text-xl font-bold'>즐겨찾기 목록</h1>
            {placeBookmarkList?.map((post) => (
              <div
                className={`flex h-[100px] w-full flex-col gap-1 border-b py-2 pl-4 transition-all hover:bg-pink-100`}
              >
                <div className='flex items-center gap-1'>
                  <span
                    className='cursor-pointer text-lg font-bold'
                    onClick={() => {
                      handleMarkerClick({
                        content: post.name,
                        placeUrl: post.homepage,
                        placeCategoryGroupName: post.category,
                        placeAddressName: post.address,
                        position: { lat: post.yposition, lng: post.xposition },
                      });
                    }}
                  >
                    {post.name}
                  </span>
                  <span className='text-md font-normal opacity-80'>
                    {getCategoryEmoji(post.category)} {post.category}
                  </span>
                </div>
                <span className='text-sm opacity-80'>{post.address}</span>
                <span className='mr-auto text-sm opacity-60 hover:opacity-100'>
                  <Link href={post.homepage} target='_blank' rel='noopener noreferrer'>
                    홈페이지
                  </Link>
                </span>
              </div>
            ))}
          </div>
        </>
      )}
      {mapMenu === '게시판' && (
        <>
          {placeList.content?.length === 0 ? (
            <h1 className='mb-4 text-lg font-bold'>게시글이 존재하지 않습니다.</h1>
          ) : (
            <div className='mx-auto w-full overflow-y-auto py-8'>
              <h1 className='mb-4 pl-4 text-xl font-bold'>게시글 목록</h1>
              {placeList.content?.map((post) => (
                <div className='rounded-lg bg-white p-4 shadow-md transition-all hover:bg-pink-100'>
                  <div className='flex justify-between'>
                    <WriterView writer={post.nickname} date={post.createAt} profile={post.profileUrl} />
                    <StatusView viewCount={post.viewCount} likeCount={post.likeCount} />
                  </div>
                  <h2 className='my-4 text-xl font-semibold'>{post.title}</h2>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-500'>
                      댓글 수: {post.CommentCount === 0 ? '0' : post.CommentCount}
                    </span>
                    <Link
                      href={`/content/community/${post.postId}`}
                      target='_blank'
                      className='rounded-xl bg-pink-500 px-4 py-2 text-white transition-all hover:bg-pink-600'
                    >
                      자세히 보기
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
