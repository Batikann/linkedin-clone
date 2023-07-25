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
import { User } from '../type'
import { getCurrentUser, getUsersBySearch } from '../../../api/FirestoreAPI'
import { useEffect } from 'react'

const Navbar = () => {
  const [searchBar, setSearchBar] = useState<boolean>(true)
  const [currentUser, setCurrentUser] = useState()
  const [searchValue, setSearchValue] = useState<string>('')
  const [users, setUsers] = useState<User[]>([])
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

  useEffect(() => {
    getCurrentUser(setCurrentUser)
  }, [currentUser])

  const searchUserHandle = (searchValue) => {
    getUsersBySearch(searchValue, setUsers)
  }

  const openUser = (user: User) => {
    navigate('/profile', {
      state: { id: user.userID, email: user.email },
    })
  }

  useEffect(() => {
    searchUserHandle(searchValue)
  }, [searchValue])

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
      <div className="flex items-center md:h-[53px] h-[73px] gap-4 justify-center relative ">
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
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder="Arama yap"
            className="bg-blue-100 rounded-sm md:w-[280px] h-[34px] pl-8 md:focus:w-[384px] transition-all duration-700 "
          />
          {searchValue.length > 0 ? (
            <div className="bg-white w-[384px]  absolute left-0 flex flex-col gap-1 p-2  ">
              {users.map((user) => {
                return (
                  <div
                    className="mt-4 flex items-center gap-4 hover:bg-slate-300 cursor-pointer p-2 rounded-md "
                    onClick={() => openUser(user)}
                  >
                    <img
                      src={user.imageLink!}
                      alt=""
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-base">
                        {user.firstName + ' ' + user.lastName}
                      </h4>
                      <h5 className=" text-xs">{user.headline}</h5>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            ''
          )}
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
          <Link to={'/connection'}>
            <li className="text-gray-500  flex flex-col justify-center items-center hover:text-black  cursor-pointer">
              <BsPeopleFill size={22} />
              <p className="text-xs hidden lg:block">Ağım</p>
            </li>
          </Link>
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
                <img
                  className="w-6 h-6 rounded-full"
                  src={currentUser?.imageLink}
                />
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
