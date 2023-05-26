//libs
import axios from "axios";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect } from "react";
import { Link } from "react-router-dom";
//lib css
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
//components
import MainSwiper from "../components/MainPage/MainSwiper";
import UserInfo from '../components/MainPage/UserInfo';
import Card from "../components/Card";
import DeveloperCard from "../components/MainPage/DeveloperCard";
//modules 
import { getPopularProducts } from '../controllers/product_controller';
import { useState } from "react";
//types
import { ProductInterface } from "../types/product";
//assets
import hotchair from '../assets/images/hot_chair.png'
import hotdesk from '../assets/images/hot_desk.webp';
import GuideCard from '../components/MainPage/GuideCard';

const MainPage = ():React.ReactElement=>{

  const [populars, setPopulars] = useState<ProductInterface[]|null>(null)

  const setPopularsData = async ()=>{
    const result = await getPopularProducts();
    setPopulars(result)
  }

  useEffect(()=>{
    setPopularsData();
  },[])

  return (
    <div className="main_page">
      <div className="hero_wrap">
        <div className="hero_banner">
        <MainSwiper></MainSwiper>
        </div>
        <div className="user_interface">
          <UserInfo></UserInfo>
        </div>
      </div>
      <div className="side_wrap">
        <div className="side_left">
          <div className="list_best">
            <h3>인기 상품</h3>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={4}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => null}
              onSlideChange={() => null}
              >
                {
                  populars && populars.map(item => {
                    return(
                      <SwiperSlide key={item.id}>
                        <Card {...item}></Card>
                      </SwiperSlide>
                    )
                  })
                }
            </Swiper>
          </div>
          <div className="hot_deal">
            <h3>오늘의 추천</h3>
            <div className="hot_banner">
              <h4>의자 모음전</h4>
              <img className="hot_banner_img" src={hotchair} alt="" />
              <Link className="go_button" to='/'>사러가기</Link>
            </div>
            <div className="hot_banner">
              <h4>책상 모음전</h4>
              <img className="hot_banner_img" src={hotdesk} alt="" />
              <Link className="go_button" to='/'>사러가기</Link>
            </div>
          </div>
          <div className="guide">
            <h3>이용 가이드</h3>
            <GuideCard></GuideCard>
          </div>
          <div className="developer" id="dev">
            <h3>개발자 소개</h3>
            <DeveloperCard></DeveloperCard>
          </div>
        </div>
        <div className="side_right">
          <div className="side_floating_bar">
            현재 내 포인트 : <br></br>
            장바구니 : <br></br>
            to Top
          </div>
        </div>
      </div>

    </div>
  )
}

export default MainPage;