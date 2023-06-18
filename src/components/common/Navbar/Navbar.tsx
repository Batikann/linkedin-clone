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

const Navbar = () => {
  const [searchBar, setSearchBar] = useState<boolean>(true)
  return (
    <div className="md:h-[53px] h-[73px]   w-full md:justify-center justify-between lg:gap-20 md:gap-8 gap-4 items-center flex p-6 ">
      <div className="flex items-center md:h-[53px] h-[73px] gap-4 justify-center ">
        <BsLinkedin size={40} className="text-light-blue" />
        <div
          className={
            searchBar
              ? 'hidden md:block md:w-[384px]'
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
          <li className="text-gray-500 flex flex-col justify-center items-center  hover:text-black  cursor-pointer">
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
          <li className="text-gray-500 flex flex-col justify-center items-center    hover:text-black  cursor-pointer">
            <BiUserCircle size={22} />
            <p className="text-xs hidden lg:block">Ben</p>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Navbar
