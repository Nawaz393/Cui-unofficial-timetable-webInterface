import { ReactElement, useState } from 'react';
import { BsList } from 'react-icons/bs';
import icon from '../../assets/icon.png';
import NavbarProps from './navbartypes';
import { Link } from 'react-router-dom';

interface Props {
  elements: NavbarProps[];
}
export default function Navbar({ elements }: Props): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavBarElements: ReactElement[] = elements?.map((item: NavbarProps) => (
    <li
      className=' hover:scale-110 transition-all  cursor-pointer sm:p-0 p-1 mr-5'
      key={item.name}
      onClick={toggleMenu}
    >
      <Link to={item.link} rel='canonical'>
        {' '}
        {item.name}
      </Link>
    </li>
  ));

  return (
    <nav
      className={`flex  fixed top-0 flex-col z-10  bcolor md:h-16 h-12 md:flex-row justify-between items-center shadow-md w-full`}
    >
      <div className='flex items-center justify-between w-full  '>
        <button className='md:hidden ml-4 p-2   ' onClick={toggleMenu}>
          <BsList
            size='2em'
            title='menu'
            alt='menu'
            className='text-white'
            role='button'
          />
        </button>
        <div>
          <Link to='/' rel='canonical'>
            <img src={icon} alt='icon' className='w-14 h-12 ml-4' />
          </Link>
        </div>
      </div>
      <ul
        className={`${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }  md:flex fixed md:left-0 md:top-0 top-12 w-1/2 md:w-auto sm:pt-0 pt-5  right-0 md:bcolor text-white  px-2  font-roboto bottom-0 flex-col  items-center justify-center bcolor z-10 md:relative md:translate-x-0 md:flex-row md:items-center md:justify-between md:bg-transparent mx-0 md:mx-10 text-xl font-bold font-script transition-transform duration-300 ease-in-out`}
      >
        {NavBarElements}
      </ul>
    </nav>
  );
}
