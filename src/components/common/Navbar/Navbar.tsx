import {
  BsLinkedin,
  BsSearch,
  BsPeopleFill,
  BsFillChatDotsFill,
  BsFillBriefcaseFill,
  BsFillBellFill,
} from 'react-icons/bs'
import { IoMdHome, IoMdSearch, IoMdClose } from 'react-icons/io'
import { BiUserCircle } from 'react-icons/bi'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown, MenuProps } from 'antd'

import { logout } from '../../../api/AuthAPI'
import { useAppDispatch } from '../../../hooks/reduxHooks'
import { delUser } from '../../../redux/AuthSlice'

const Navbar = () => {
  const [searchBar, setSearchBar] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const goToRoute = (route: string) => {
    navigate(route)
  }
  const logoutHandle = async () => {
    let res = await logout()
    dispatch(delUser())
    res ? navigate('/') : ''
  }
  const items: MenuProps['items'] = [
    {
      label: (
        <Link
          to="/profile"
          className="border border-blue-500 p-1 px-2 hover:bg-blue-500 text-blue-500 hover:text-white font-medium rounded-full"
        >
          Profili Görüntüleyin
        </Link>
      ),
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: <p onClick={logoutHandle}>Oturmu Kapat</p>,
      key: '3',
    },
  ]
  return (
    <div className="md:h-[53px] h-[73px]   w-full md:justify-center justify-between lg:gap-20 md:gap-8 gap-4 items-center flex p-6 bg-white ">
      <div className="flex items-center md:h-[53px] h-[73px] gap-4 justify-center ">
        <Link to="/home">
          <BsLinkedin size={40} className="text-light-blue" />
        </Link>
        <div
          className={
            searchBar
              ? 'hidden md:block md:w-[384px] relative'
              : 'relative md:w-[384px] z-50 w-full '
          }
        >
          <BsSearch
            size={15}
            className="text-gray-500 absolute left-2 top-1/2 -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Arama yap"
            className="bg-blue-100 rounded-sm md:w-[280px] h-[34px] pl-8 md:focus:w-[384px] transition-all duration-700 "
          />
        </div>
        <button
          className={searchBar ? 'hidden' : 'block '}
          onClick={() => setSearchBar(!searchBar)}
        >
          <IoMdClose size={20} />
        </button>
      </div>
      <div className={searchBar ? '' : 'hidden'}>
        <ul className="flex gap-5 lg:gap-8">
          <li
            className="block md:hidden "
            onClick={() => setSearchBar(!searchBar)}
          >
            <IoMdSearch size={24} className="text-gray-500" />
          </li>
          <li
            className="text-gray-500 flex flex-col justify-center items-center  hover:text-black  cursor-pointer"
            onClick={() => goToRoute('/home')}
          >
            <IoMdHome size={22} />
            <p className="text-xs hidden lg:block">Ana Sayfa</p>
          </li>
          <li className="text-gray-500  flex flex-col justify-center items-center hover:text-black  cursor-pointer">
            <BsPeopleFill size={22} />
            <p className="text-xs hidden lg:block">Ağım</p>
          </li>
          <li className="text-gray-500 flex flex-col justify-center items-center  hover:text-black  cursor-pointer">
            <BsFillBriefcaseFill size={22} />
            <p className="text-xs hidden lg:block">İş İlanları</p>
          </li>
          <li className="text-gray-500 flex flex-col justify-center items-center  hover:text-black  cursor-pointer">
            <BsFillChatDotsFill size={22} />
            <p className="text-xs hidden lg:block">Mesajlaşma</p>
          </li>
          <li className="text-gray-500 flex flex-col justify-center items-center   hover:text-black  cursor-pointer">
            <BsFillBellFill size={22} />
            <p className="text-xs hidden lg:block">Bildirimler</p>
          </li>
          <li className="text-gray-500 flex flex-col justify-center items-center  hover:text-black  cursor-pointer">
            <Dropdown menu={{ items }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <BiUserCircle size={24} />
              </a>
            </Dropdown>
            <p className="text-xs hidden lg:block">Ben</p>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Navbar
