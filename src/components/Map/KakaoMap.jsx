'use client';
import { EmptyStarIcon, FillStarIcon, LeftArrowIcon, LinkIcon, RightArrowIcon } from '../UI/Icons';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import { mapAreaState, mapMenuState, placeDetailState, placeListState } from '@/atoms/mapState';
import { useRecoilState, useSetRecoilState } from 'recoil';
import axios from 'axios';
import MapSideMenu from '@/components/Map/MapSideMenu';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

export default function KakaoMap() {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [query, setQuery] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [postsPerPage] = useState(15); // 페이지당 게시글 개수
  const [searchPagination, setSearchPagination] = useState(null);
  const [totalItemsCount, setTotalItemsCount] = useState(0); // 모든 목록 개수
  const [area, setArea] = useRecoilState(mapAreaState);
  const [clickToggle, setClickToggle] = useState(true);
  const [mapPost, setMapPost] = useState([]);
  const [mapDetailLength, setMapDetailLength] = useState(0);
  const setMapMenu = useSetRecoilState(mapMenuState);
  const setPlaceDetail = useSetRecoilState(placeDetailState);
  const setPlaceList = useSetRecoilState(placeListState);
  const [bookmark, setBookmark] = useState(false);

  const SPRITE_MARKER_URL = '/Images/sprite.png'; // 스프라이트 마커 이미지 URL
  const SPRITE_WIDTH = 48; // 스프라이트 이미지 너비
  const SPRITE_HEIGHT = 250; // 스프라이트 이미지 높이
  const SPRITE_GAP = 60; // 스프라이트 이미지에서 마커간 간격
  const SPRITE_COORDINATES = [
    { x: 0, y: 10 }, // 0개
    { x: 0, y: 70 }, // 1개
    { x: 0, y: 130 }, // 3개
    { x: 0, y: 190 }, // 5개 이상
  ];

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(query, (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (let i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
            placeCategory: data[i].category_name,
            placeAddressName: data[i].address_name,
            placeUrl: data[i].place_url,
            placeCategoryGroupName: data[i].category_group_name,
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);
        setSearchPagination(pagination);
        setTotalItemsCount(pagination.totalCount);
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds);
        const swLatLng = bounds.getSouthWest();
        const neLatLng = bounds.getNorthEast();
        setArea({
          s: swLatLng.getLat(),
          w: swLatLng.getLng(),
          n: neLatLng.getLat(),
          e: neLatLng.getLng(),
        });
      }
    });
  }, [map, query]);

  useEffect(() => {
    const fetchArea = async () => {
      const body = {
        south: area.s,
        west: area.w,
        north: area.n,
        east: area.e,
      };
      try {
        const res = await axios.post('/api/map/marker', body, {
          withCredentials: true,
        });
        setMapPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchArea();
  }, [query]);

  const handleInputChange = (e) => {
    setInputSearch(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber === currentPage) return;
    setCurrentPage(pageNumber);
    setSearchPagination(searchPagination.gotoPage(pageNumber));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setMapMenu('지도 홈');
    setQuery(inputSearch);
  };

  const handleMarkerClick = (marker) => {
    setInfo(marker);
    const places = mapPost.filter((post) => post.position === marker.content);
    setPlaceDetail(places);
    setMapDetailLength(places.length);

    const moveLatLng = new kakao.maps.LatLng(marker.position.lat, marker.position.lng);
    map.panTo(moveLatLng, {
      animate: {
        duration: 500,
      },
    });
  };

  const onClickPlaceDetail = async (marker) => {
    setMapMenu('게시판');
    const xPosition = marker.position.lng;
    const yPosition = marker.position.lat;
    try {
      const res = await axios.get(`/api/map/post/${xPosition}/${yPosition}`);
      if (res.status === 200) {
        setPlaceList(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const spriteCalculation = (marker) => {
    const places = mapPost.filter((post) => post.position === marker.content);
    const placeCount = places.length;
    let coordinates = {};
    // 게시글 수에 따라 좌표 계산
    if (placeCount >= 5) {
      coordinates = SPRITE_COORDINATES[3];
    } else if (placeCount >= 3) {
      coordinates = SPRITE_COORDINATES[2];
    } else if (placeCount >= 1) {
      coordinates = SPRITE_COORDINATES[1];
    } else {
      coordinates = SPRITE_COORDINATES[0];
    }

    return coordinates;
  };

  const placeBookmark = async (info) => {
    const body = {
      xposition: 1,
      yposition: 1,
      status: 'LIKE',
    };
    try {
      const res = await axios.post('/api/member/map/bookmark', body, {
        withCredentials: true,
      });
      if (res.status === 200) {
        console.log('placebookmark', res.data);
        setBookmark(!bookmark);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <AnimatePresence>
        {clickToggle && (
          <MapSideMenu
            markers={markers}
            handleSearch={handleSearch}
            handleMarkerClick={handleMarkerClick}
            handleInputChange={handleInputChange}
            totalItemsCount={totalItemsCount}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            handlePageChange={handlePageChange}
          />
        )}
      </AnimatePresence>

      <div className=''>
        <motion.button
          initial={{ x: '-100%' }}
          animate={{ x: clickToggle ? 400 : 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.3 }}
          className='absolute top-1/2 z-50 items-center rounded-br-sm rounded-tr-sm bg-white px-1 py-4 font-bold text-pink-500 outline-none hover:bg-pink-50 hover:text-pink-600'
          onClick={() => setClickToggle(!clickToggle)}
        >
          <LeftArrowIcon size={18} />
        </motion.button>
      </div>

      <div className='h-screen w-full'>
        <Map // 지도를 표시할 Container
          className='h-[inherit] w-[inherit]'
          center={{ lat: 33.450701, lng: 126.570667 }}
          level={3} // 지도의 확대 레벨
          onCreate={setMap}
        >
          {markers.map((marker, idx) => (
            <>
              <MapMarker
                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
                onClick={() => handleMarkerClick(marker)}
                image={{
                  src: SPRITE_MARKER_URL,
                  size: { width: 48, height: 48 },
                  options: {
                    offset: {
                      x: 25,
                      y: 40,
                    },
                    spriteSize: {
                      width: SPRITE_WIDTH,
                      height: SPRITE_HEIGHT,
                    },
                    spriteOrigin: spriteCalculation(marker),
                  },
                }}
              />
              <CustomOverlayMap position={marker.position} yAnchor={0} xAnchor={1} zIndex={999}>
                {info && info.content === marker.content && (
                  <>
                    <div className='flex w-64 cursor-text flex-col items-center justify-center bg-white text-sm transition [&>div]:p-2'>
                      <div
                        className='flex w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap bg-pink-300 text-base font-semibold transition-all hover:bg-pink-400'
                        onClick={() => onClickPlaceDetail(marker)}
                      >
                        <span className='mx-auto text-sm'>
                          {marker.content} ({mapDetailLength})
                        </span>
                        <span className='flex items-center'>
                          <RightArrowIcon />
                        </span>
                      </div>
                      <div className='cursor-text whitespace-pre-wrap text-sm'>{marker.placeAddressName}</div>
                      <div className='flex w-full cursor-text items-center gap-1 whitespace-pre-wrap text-sm '>
                        <button
                          className='flex flex-1 justify-center border border-pink-200 text-pink-500 transition-all hover:opacity-50'
                          onClick={() => placeBookmark(marker)}
                        >
                          {bookmark ? <FillStarIcon size={20} /> : <EmptyStarIcon size={20} />}
                        </button>
                        <Link
                          href={marker.placeUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex flex-1 items-center justify-center gap-1 border border-pink-200 text-pink-500 transition-all hover:opacity-50'
                        >
                          <LinkIcon size={20} />
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </CustomOverlayMap>
            </>
          ))}
        </Map>
      </div>
    </>
  );
}
