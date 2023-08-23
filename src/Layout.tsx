import { ReactNode, useEffect, useState } from 'react';
import navbardata from './components/Navbar/navbardata';
import Navbar from './components/Navbar/Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); 
    };

    handleResize(); 

   
    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='w-full h-screen '>
      <Navbar elements={navbardata} />
      {/* Desktop Layout */}
      <div
        className={`grid sm:grid-cols-12 h-full mt-14 ${
          isMobile ? 'hidden sm:block' : ''
        }`}
      >
        <div className='col-span-2   h-screen  p-4 text-white'>
          Left Sidebar (Ads)
        </div>
        <div className='col-span-8  p-3'>{children}</div>
        <div className='col-span-2  h-screen p-4 text-white'>
          Right Sidebar (Ads)
        </div>
      </div>

      {/* Mobile Layout */}
      <div
        className={`sm:hidden h-full   flex flex-col mt-12 ${
          isMobile ? '' : 'hidden'
        }`}
      >
        <div className='p-4 text-white'>Top Mobile Sidebar (Ads) </div>
        <div className=' '>{children}</div>
        <div className=' p-4 fixed bottom-0 w-full  text-white'>
          Bottom Mobile Sidebar (Ads)
        </div>
      </div>

      <div>
     
      </div>
    </div>
  );
};

export default Layout;
