'use client';
import { BoardIcon, FillHomeIcon, FillStarIcon } from '../UI/Icons';
import { mapMenuState, placeBookmarkListState } from '@/atoms/mapState';
import { tokenState } from '@/atoms/tokenState';
import axios from 'axios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export default function MapHeader() {
  const [mapMenu, setMapMenu] = useRecoilState(mapMenuState);
  const setPlaceBookmarkList = useSetRecoilState(placeBookmarkListState);
  const token = useRecoilValue(tokenState);
  const menu = [
    {
      icon: <FillHomeIcon size={15} />,
      clickedIcon: '',
      content: '지도 홈',
    },
    {
      icon: <FillStarIcon size={15} />,
      clickedIcon: '',
      content: '즐겨찾기',
    },
    {
      icon: <BoardIcon size={15} />,
      clickedIcon: '',
      content: '게시판',
    },
  ];

  const defaultClass =
    'flex w-full justify-center py-2 px-4 text-sm rounded-xl font-semibold transition-all cursor-pointer';

  const onClickMapMenu = async (menu) => {
    if (menu === '즐겨찾기') {
      try {
        const res = await axios.get('/api/member/map/bookmark/list', {
          withCredentials: true,
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          // console.log(res.data);
          setPlaceBookmarkList(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    setMapMenu(menu);
  };
  return (
    <nav className='flex w-full justify-between gap-4'>
      {menu.map(({ content, icon }) => (
        <ul key={content}>
          <div
            className={`${defaultClass} ${mapMenu === content ? 'bg-pink-500 text-white' : 'text-pink-600  hover:bg-pink-500 hover:text-white'}`}
            onClick={() => onClickMapMenu(content)}
          >
            <li className='flex items-center gap-1 text-xs'>
              {icon} {content}
            </li>
          </div>
        </ul>
      ))}
    </nav>
  );
}
