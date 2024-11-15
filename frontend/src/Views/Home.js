import { AiFillAccountBook } from "react-icons/ai";
import { IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import React from "react";
import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';
import { useNavigate } from "react-router-dom";
import { SlSocialLinkedin, SlSocialYoutube } from "react-icons/sl";
import { RiInstagramLine } from "react-icons/ri";
import { GrLinkedin } from "react-icons/gr";
import { ImLinkedin } from "react-icons/im";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function Home() {
  const nav = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const logout = () => {
    localStorage.removeItem("token-info");
    nav('/login');
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Nếu click xảy ra ngoài vùng dropdown hoặc button, đóng dropdown
      if (!event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <nav className="w-auto flex bg-cyan-50 justify-center sticky top-0 z-50">
        <div className="containe w-5/6 flex flex-col md:flex-row justify-between items-center py-4">
          <div className="flex items-center mb-4 md:mb-0 relative dropdown-container">
            <IoMenu
              fontSize={40}
              color="gray"
              className="cursor-pointer"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                <ul className="text-gray-700">
                  <li
                    className="px-6 py-3 hover:bg-blue-100 hover:text-blue-600 transition duration-200 ease-in-out cursor-pointer rounded-b-lg"
                    onClick={logout}
                  >
                    Đăng Xuất
                  </li>
                </ul>
              </div>
            )}
            <AiFillAccountBook fontSize={50} color="cyan" />
            <h1 className="text-xl text-yellow-300 font-bold ml-2">BookingCare</h1>
          </div>
          <div className="md:flex space-x-9">
            <div className="hover:bg-yellow-300 hover:text-white text-xl font-sans rounded-xl w-24 h-8 cursor-pointer flex items-center justify-center">Tất cả</div>
            <div className="hover:bg-yellow-300 hover:text-white text-xl font-sans rounded-xl w-24 h-8 cursor-pointer flex items-center justify-center">Tại nhà</div>
            <div className="hover:bg-yellow-300 hover:text-white text-xl font-sans rounded-xl w-24 h-8 cursor-pointer flex items-center justify-center">Tại viện</div>
            <div className="hover:bg-yellow-300 hover:text-white text-xl font-sans rounded-xl w-28 h-8 cursor-pointer flex items-center justify-center">Sống khỏe</div>
            <div onClick={() => { nav('/login') }} className="hover:bg-yellow-300 hover:text-white bg-cyan-400 text-xl font-medium font-sans rounded-xl w-32 h-10 cursor-pointer flex items-center justify-center">Đăng Nhập</div>
          </div>
          <div className="flex items-center">
            <input type="text" placeholder="Tìm dịch vụ/bác sĩ" className="border border-gray-700 rounded-md px-3 py-2 mr-2" />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Tìm kiếm
            </button>
            <div className="ml-4 hidden md:flex items-center">
              <i className="fas fa-dollar-sign"></i>
              <i className="fas fa-phone ml-2"></i>
            </div>
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <i className="fas fa-dollar-sign mr-2"></i>
          <i className="fas fa-phone"></i>
        </div>
      </nav>
      <div className="bg-white flex flex-col items-center ">
        <img src="http://surl.li/psivqm" className="w-5/6 h-96 rounded-3xl object-cover" alt="banner" />
      </div>
      <div className="flex w-full justify-center">
        <div className="w-5/6 mt-9">
          <div className="flex w-full py-2 px-6 items-center justify-between mb-5">
            <p class="font-manrope text-3xl font-medium text-gray-900 text-center">Chuyên Khoa </p>
            <p class="bg-green-200 font-manrope text-md px-5 py-2 font-semibold text-green-600 cursor-pointer hover:text-white text-center border border-black rounded-xl">Xem tất cả</p>
          </div>
          <Slide duration={700} autoplay={true}>
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div class="flex justify-center mb-14 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
                <div class="group cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600">
                  <div class="flex items-center mb-6">
                    <img src="https://picsum.photos/seed/pisum/344/198" alt="Harsh image" class="rounded-lg w-full object-cover" />
                  </div>
                  <div class="block">
                    <h4 class="text-gray-900 font-medium leading-8 mb-9">Fintech 101: Exploring the Basics of Electronic Payments</h4>
                    <div class="flex items-center justify-between  font-medium">
                      <h6 class="text-sm text-gray-500">By Harsh C.</h6>
                      <span class="text-sm text-indigo-600">2 year ago</span>
                    </div>
                  </div>
                </div>
                <div class="group cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600">
                  <div class="flex items-center mb-6">
                    <img src="https://picsum.photos/seed/picsum/344/198" alt="John image" class="rounded-lg w-full object-cover" />
                  </div>
                  <div class="block">
                    <h4 class="text-gray-900 font-medium leading-8 mb-9">From Classroom to Cyberspace: The Growing Influence of EdTech in Fintech</h4>
                    <div class="flex items-center justify-between  font-medium">
                      <h6 class="text-sm text-gray-500">By John D.</h6>
                      <span class="text-sm text-indigo-600">2 year ago</span>
                    </div>
                  </div>
                </div>
                <div class="group cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600">
                  <div class="flex items-center mb-6">
                    <img src="https://picsum.photos/seed/pisuma/344/198" alt="Alexa image" class="rounded-lg w-full object-cover" />
                  </div>
                  <div class="block">
                    <h4 class="text-gray-900 font-medium leading-8 mb-9">Fintech Solutions for Student Loans: Easing the Burden of Education Debt</h4>
                    <div class="flex items-center justify-between  font-medium">
                      <h6 class="text-sm text-gray-500">By Alexa H.</h6>
                      <span class="text-sm text-indigo-600">2 year ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slide>

        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="w-5/6 mt-9">
          <div className="flex w-full py-2 px-6 items-center justify-between mb-5">
            <p class="font-manrope text-3xl font-medium text-gray-900 text-center">Bác Sĩ</p>
            <p class="bg-green-200 font-manrope text-md px-5 py-2 font-semibold text-green-600 cursor-pointer hover:text-white text-center border border-black rounded-xl">Xem tất cả</p>
          </div>
          <Slide duration={700} autoplay={true}>
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div class="flex justify-center mb-14 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
                <div class="group cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600">
                  <div class="flex items-center mb-6">
                    <img src="https://picsum.photos/seed/a/344/198" alt="Harsh image" class="rounded-lg w-full object-cover" />
                  </div>
                  <div class="block">
                    <h4 class="text-gray-900 font-medium leading-8 mb-9">Fintech 101: Exploring the Basics of Electronic Payments</h4>
                    <div class="flex items-center justify-between  font-medium">
                      <h6 class="text-sm text-gray-500">By Harsh C.</h6>
                      <span class="text-sm text-indigo-600">2 year ago</span>
                    </div>
                  </div>
                </div>
                <div class="group cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600">
                  <div class="flex items-center mb-6">
                    <img src="https://picsum.photos/seed/v/344/198" alt="John image" class="rounded-lg w-full object-cover" />
                  </div>
                  <div class="block">
                    <h4 class="text-gray-900 font-medium leading-8 mb-9">From Classroom to Cyberspace: The Growing Influence of EdTech in Fintech</h4>
                    <div class="flex items-center justify-between  font-medium">
                      <h6 class="text-sm text-gray-500">By John D.</h6>
                      <span class="text-sm text-indigo-600">2 year ago</span>
                    </div>
                  </div>
                </div>
                <div class="group cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600">
                  <div class="flex items-center mb-6">
                    <img src="https://picsum.photos/seed/b/344/198" alt="Alexa image" class="rounded-lg w-full object-cover" />
                  </div>
                  <div class="block">
                    <h4 class="text-gray-900 font-medium leading-8 mb-9">Fintech Solutions for Student Loans: Easing the Burden of Education Debt</h4>
                    <div class="flex items-center justify-between  font-medium">
                      <h6 class="text-sm text-gray-500">By Alexa H.</h6>
                      <span class="text-sm text-indigo-600">2 year ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slide>

        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="w-5/6 mt-9">
          <div className="flex w-full py-2 px-6 items-center justify-between mb-5">
            <p class="font-manrope text-3xl font-medium text-gray-900 text-center">Chuyên Khoa </p>
            <p class="bg-green-200 font-manrope text-md px-5 py-2 font-semibold text-green-600 cursor-pointer hover:text-white text-center border border-black rounded-xl">Xem tất cả</p>
          </div>
          <Slide duration={700} autoplay={true}>
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div class="flex justify-center mb-14 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
                <div class="group cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600">
                  <div class="flex items-center mb-6">
                    <img src="https://picsum.photos/seed/bga1/344/198" alt="Harsh image" class="rounded-lg w-full object-cover" />
                  </div>
                  <div class="block">
                    <h4 class="text-gray-900 font-medium leading-8 mb-9">Fintech 101: Exploring the Basics of Electronic Payments</h4>
                    <div class="flex items-center justify-between  font-medium">
                      <h6 class="text-sm text-gray-500">By Harsh C.</h6>
                      <span class="text-sm text-indigo-600">2 year ago</span>
                    </div>
                  </div>
                </div>
                <div class="group cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600">
                  <div class="flex items-center mb-6">
                    <img src="https://picsum.photos/seed/15acb/344/198" alt="John image" class="rounded-lg w-full object-cover" />
                  </div>
                  <div class="block">
                    <h4 class="text-gray-900 font-medium leading-8 mb-9">From Classroom to Cyberspace: The Growing Influence of EdTech in Fintech</h4>
                    <div class="flex items-center justify-between  font-medium">
                      <h6 class="text-sm text-gray-500">By John D.</h6>
                      <span class="text-sm text-indigo-600">2 year ago</span>
                    </div>
                  </div>
                </div>
                <div class="group cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600">
                  <div class="flex items-center mb-6">
                    <img src="https://picsum.photos/seed/pmc/344/198" alt="Alexa image" class="rounded-lg w-full object-cover" />
                  </div>
                  <div class="block">
                    <h4 class="text-gray-900 font-medium leading-8 mb-9">Fintech Solutions for Student Loans: Easing the Burden of Education Debt</h4>
                    <div class="flex items-center justify-between  font-medium">
                      <h6 class="text-sm text-gray-500">By Alexa H.</h6>
                      <span class="text-sm text-indigo-600">2 year ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slide>

        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-300 text-white w-full">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
            <div class="col-span-full mb-10 lg:col-span-2 lg:mb-0">
              <a href="https://pagedone.io/" class="flex justify-center lg:justify-start">
                <svg class="w-40 h-8" viewBox="0 0 164 33" fill="none" xmlns="http://www.w3.org/2000/svg">

                  <defs>
                    <linearGradient id="paint0_linear_9129_4680" x1="35" y1="1.89063" x2="1.11152" y2="33.4573" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#7C3AED" />
                      <stop offset="0.993738" stop-color="#4F46E5" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_9129_4680" x1="35" y1="1.89063" x2="1.11152" y2="33.4573" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#7C3AED" />
                      <stop offset="0.993738" stop-color="#4F46E5" />
                    </linearGradient>
                  </defs>
                </svg>
              </a>
              <p class="py-8 text-sm text-gray-500 lg:max-w-xs text-center lg:text-left">Trusted in more than 100 countries & 5 million customers. Have any query ?</p>
              <a href="#" class="py-2.5 px-5 h-9 block w-fit bg-indigo-600 rounded-full shadow-sm text-xs text-white mx-auto transition-all  duration-500 hover:bg-indigo-700 lg:mx-0">
                Contact us
              </a>
            </div>

            <div class="lg:mx-auto text-left ">
              <h4 class="text-lg text-gray-900 font-medium mb-7">Pagedone</h4>
              <ul class="text-sm  transition-all duration-500">
                <li class="mb-6"><a href="#" class="text-gray-600 hover:text-gray-900">Home</a></li>
                <li class="mb-6"><a href="#" class=" text-gray-600 hover:text-gray-900">About</a></li>
                <li class="mb-6"><a href="#" class=" text-gray-600 hover:text-gray-900">Pricing</a></li>
                <li><a href="#" class=" text-gray-600 hover:text-gray-900">Features</a></li>
              </ul>
            </div>

            <div class="lg:mx-auto text-left ">
              <h4 class="text-lg text-gray-900 font-medium mb-7">Products</h4>
              <ul class="text-sm  transition-all duration-500">
                <li class="mb-6"><a href="#" class="text-gray-600 hover:text-gray-900">Figma UI System</a></li>
                <li class="mb-6"><a href="#" class=" text-gray-600 hover:text-gray-900">Icons Assets</a></li>
                <li class="mb-6"><a href="#" class=" text-gray-600 hover:text-gray-900">Responsive Blocks</a></li>
                <li><a href="#" class=" text-gray-600 hover:text-gray-900">Components Library</a></li>
              </ul>
            </div>

            <div class="lg:mx-auto text-left">
              <h4 class="text-lg text-gray-900 font-medium mb-7">Resources</h4>
              <ul class="text-sm  transition-all duration-500">
                <li class="mb-6"><a href="#" class="text-gray-600 hover:text-gray-900">FAQs</a></li>
                <li class="mb-6"><a href="#" class=" text-gray-600 hover:text-gray-900">Quick Start</a></li>
                <li class="mb-6"><a href="" class=" text-gray-600 hover:text-gray-900">Documentation</a></li>
                <li><a href="#" class=" text-gray-600 hover:text-gray-900">User Guide</a></li>
              </ul>
            </div>

            <div class="lg:mx-auto text-left">
              <h4 class="text-lg text-gray-900 font-medium mb-7">Blogs</h4>
              <ul class="text-sm  transition-all duration-500">
                <li class="mb-6"><a href="#" class="text-gray-600 hover:text-gray-900">News</a></li>
                <li class="mb-6"><a href="#" class=" text-gray-600 hover:text-gray-900">Tips & Tricks</a></li>
                <li class="mb-6"><a href="#" class=" text-gray-600 hover:text-gray-900">New Updates</a></li>
                <li><a href="#" class=" text-gray-600 hover:text-gray-900">Events</a></li>
              </ul>
            </div>
          </div>

          <div class="py-7 border-t border-gray-200">
            <div class="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
              <span class="text-sm text-gray-500 ">©<a href="https://pagedone.io/">pagedone</a> 2024, All rights reserved.</span>
              <div class="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
                <a href="#" class="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-indigo-600">
                  <FaSquareXTwitter size={20} />
                </a>
                <a href="#" class="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-indigo-600">
                  <RiInstagramLine size={20} />
                </a>
                <a href="#" class="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-indigo-600">
                  <FaLinkedin size={20} />
                </a>
                <a href="#" class="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-indigo-600">
                  <SlSocialYoutube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
