import { mapAddressState, mapModalState, mapPositionState } from '@/atoms/editorContentState';
import { useEffect, useState } from 'react';
import { FaSearch, FaTimesCircle } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import Pagination from 'react-js-pagination';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { useSetRecoilState } from 'recoil';

export default function MapWriteSearch() {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [query, setQuery] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [postsPerPage] = useState(5); // 페이지당 게시글 개수
  const [searchPagination, setSearchPagination] = useState(null);
  const [totalItemsCount, setTotalItemsCount] = useState(0); // 모든 목록 개수
  const setMapModal = useSetRecoilState(mapModalState);
  const setMapPosition = useSetRecoilState(mapPositionState);
  const setMapAddress = useSetRecoilState(mapAddressState);

  useEffect(() => {
    const options = {
      size: 5,
    };
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(
      query,
      (data, status, pagination) => {
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
        }
      },
      options,
    );
  }, [map, query]);

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
    setQuery(inputSearch);
  };

  const handleMarkerClick = (marker) => {
    setMapPosition({ lng: marker.position.lng, lat: marker.position.lat });
    setInfo(marker);
    const moveLatLng = new kakao.maps.LatLng(marker.position.lat, marker.position.lng);
    map.panTo(moveLatLng, {
      animate: {
        duration: 500,
      },
    });
  };

  const onclickMapPosition = ({ content, placeAddressName, position }) => {
    console.log('장소 선택');
    setMapPosition({ lng: position.lng, lat: position.lat });
    setMapAddress(content);
    setMapModal(false);
  };
  return (
    <>
      <div className='relative flex h-[700px]'>
        <button className='absolute right-2 top-2 z-50' onClick={() => setMapModal(false)}>
          <FaTimesCircle size={28} color='hotpink' />
        </button>
        <div className='flex w-[300px] flex-col overflow-y-auto'>
          <div className='p-4'>
            <form onSubmit={handleSearch} className='relative flex h-[45px] w-full gap-4'>
              <input
                className='w-full rounded-lg border-2 border-pink-400 pl-2 outline-none'
                type='text'
                placeholder='장소, 주소, 검색'
                onChange={handleInputChange}
              />
              <div className='absolute bottom-0 right-2 top-0 flex items-center'>
                <button type='submit'>
                  <FaSearch color='hotpink' size={25} />
                </button>
              </div>
            </form>
          </div>
          {/* 지도 검색 결과 */}
          <section className='overflow-auto'>
            <ul className=''>
              {markers.length === 0 && null}
              <h2 className='text-sm font-semibold'>검색 결과 ({totalItemsCount}개)</h2>
              {markers.map((marker) => (
                <li key={marker.content.placeUrl}>
                  <div className={`flex h-[110px] flex-col p-2 hover:bg-pink-100`}>
                    <span className='text-md cursor-pointer font-bold' onClick={() => handleMarkerClick(marker)}>
                      {marker.content}
                    </span>
                    <span className='text-sm opacity-80'>{marker.placeCategory}</span>
                    <span className='text-sm opacity-80'>{marker.placeAddressName}</span>
                    <span className='text-xs opacity-60'>
                      {marker.placeCategory.length === 0 ? '카테고리 없음' : marker.placeCategory}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={postsPerPage}
            totalItemsCount={totalItemsCount}
            onChange={handlePageChange}
            itemClass='px-2 py-1 rounded-md mr-2 cursor-pointer'
            activeClass='bg-pink-400 text-white'
            itemClassFirst='py-1 rounded-md mr-2 cursor-pointer'
            itemClassPrev='py-1 rounded-md mr-2 cursor-pointer'
            itemClassNext='py-1 rounded-md mr-2 cursor-pointer'
            itemClassLast='py-1 rounded-md mr-2 cursor-pointer'
            innerClass='flex'
          />
        </div>

        <div className='h-full w-[500px]'>
          <Map // 지도를 표시할 Container
            className='h-[inherit] w-[inherit] rounded-br-lg rounded-tr-lg'
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
                    src: '/favorite.png',
                    size: {
                      width: 48,
                      height: 48,
                    },
                  }}
                />
                <CustomOverlayMap position={marker.position} yAnchor={0.5} xAnchor={0.5} zIndex={999}>
                  {info && info.content === marker.content && (
                    <>
                      <div className='flex w-48 flex-col items-center justify-center bg-white text-sm transition [&>div]:p-2'>
                        <div
                          className='flex w-full overflow-hidden text-ellipsis whitespace-nowrap bg-pink-300 text-base font-semibold transition-all hover:bg-pink-400'
                          onClick={() => onclickMapPosition(marker)}
                        >
                          <span className='mx-auto'>{marker.content}</span>
                          <span className='flex items-center'>
                            <IoIosArrowForward />
                          </span>
                        </div>
                        <div className='cursor-text whitespace-pre-wrap text-sm'>{marker.placeAddressName}</div>
                      </div>
                    </>
                  )}
                </CustomOverlayMap>
              </>
            ))}
          </Map>
        </div>
      </div>
    </>
  );
}
