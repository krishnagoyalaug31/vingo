import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import { categories } from '../category.js'
import CategoryCard from './CategoryCard'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useSelector } from 'react-redux'
import FoodCard from './FoodCard.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App.jsx'

function UserDashboard() {

  const sliderRef = useRef(null)
  const {currentCity,shopInMyCity,itemsInMyCity,searchItems} =useSelector(state=>state.user)
  const navigate = useNavigate()
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)
  const shopSliderRef = useRef(null)
const [showShopLeft, setShowShopLeft] = useState(false)
const [showShopRight, setShowShopRight] = useState(true)
const [updatedItemsList , setUpdatedItemsList] = useState([])

const handleFilterByCategory =(category)=>{
  if(category=="All"){
    setUpdatedItemsList(itemsInMyCity)
  }else{
    const filteredList = itemsInMyCity?.filter(i=>i.category ===category)
    setUpdatedItemsList(filteredList)
  }
}

useEffect(()=>{
  setUpdatedItemsList(itemsInMyCity)
},[itemsInMyCity])

  const checkScroll = () => {
    const slider = sliderRef.current

    if (!slider) return

    setShowLeft(slider.scrollLeft > 0)

    setShowRight(
      slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 1
    )
  }
  const scrollShopLeft = () => {
  shopSliderRef.current?.scrollBy({
    left: -300,
    behavior: "smooth"
  })
}

const scrollShopRight = () => {
  shopSliderRef.current?.scrollBy({
    left: 300,
    behavior: "smooth"
  })
}

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -300,
      behavior: "smooth"
    })
  }

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 300,
      behavior: "smooth"
    })
  }

  useEffect(() => {
    const slider = sliderRef.current

    if (!slider) return

    checkScroll()

    slider.addEventListener("scroll", checkScroll)
    window.addEventListener("resize", checkScroll)

    return () => {
      slider.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">

      <Nav />
      {searchItems && searchItems.length>0 && 
      <div className=" w-full max-w-6xl flex flex-col gap-5 items-start p-5 bg-white shadow-md rounded-2xl mt-4">
        <h1 className=" text-gray-900 text-2xl sm:text-3xl font-semibold border-b border-gray-200 pb-2">
          Search Result
        </h1>
        <div className=" w-full h-auto flex flex-wrap gap-6 justify-center" >
          {searchItems.map((item)=>(
            <FoodCard data={item} key={item._id} />
          ))}
        </div>
      </div>  }
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[25px]">
        <h1 className="text-gray-800 text-2xl">  Inspiration for First order </h1>
        <div className="w-full relative">
          {showLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                         w-[40px] h-[40px] rounded-full bg-white shadow-lg
                         flex items-center justify-center
                         text-[#ff4d2d] cursor-pointer
                         hover:bg-[#ff4d2d] hover:text-white transition">
              <FaChevronLeft />
            </button>
          )}
          <div
            ref={sliderRef}
            className="w-full flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-[#ff4d2d]scrollbar-track-transparent scroll-smooth">
            {categories.map((cate, index) => (
              <CategoryCard onClick={()=>handleFilterByCategory(cate.category)} name={cate.category} image={cate.image} key={index} />))}
          </div>
          {showRight && (<button   onClick={scrollRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10  w-[40px] h-[40px] rounded-full bg-white shadow-l  flex items-center justify-center text-[#ff4d2d] cursor-pointer
                         hover:bg-[#ff4d2d] hover:text-white transition">
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>
       <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[25px]">
        <h1 className="text-gray-800 text-2xl">  Best Shop in {currentCity} </h1>
        
        <div className="w-full relative">
          {showShopLeft && (
            <button
              onClick={scrollShopLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                         w-[40px] h-[40px] rounded-full bg-white shadow-lg
                         flex items-center justify-center
                         text-[#ff4d2d] cursor-pointer
                         hover:bg-[#ff4d2d] hover:text-white transition">
              <FaChevronLeft />
            </button>
          )}
          <div
            ref={shopSliderRef}
            className="w-full flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-[#ff4d2d]scrollbar-track-transparent scroll-smooth">
            {shopInMyCity?.map((shop, index) => (
              <CategoryCard onClick={()=>navigate(`/shop/${shop._id}`)} name={shop.name} image={shop.image} key={index} />))}
          </div>
          {showShopRight && (<button   onClick={scrollShopRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10  w-[40px] h-[40px] rounded-full bg-white shadow-l  flex items-center justify-center text-[#ff4d2d] cursor-pointer
                         hover:bg-[#ff4d2d] hover:text-white transition">
              <FaChevronRight />
            </button>
          )}
        </div>
        
       </div>

       <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[25px]">
        <h1 className="text-gray-800 text-2xl">  Suggested Food Items</h1>
        <div className="w-full h-auto flex flex-wrap gap-[20px] justify-center ">
        {updatedItemsList?.map((item,index)=>(
          <FoodCard key={index} data={item}/>
          
        ))}
       </div>
       </div>
       
    </div>
  )
}

export default UserDashboard