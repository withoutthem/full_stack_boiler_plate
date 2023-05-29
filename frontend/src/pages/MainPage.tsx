//libs
import axios from "axios";
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
//lib css
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
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
import iconLogin from "../assets/images/icon_login2.png";

const MainPage = ():React.ReactElement=>{

  const [populars, setPopulars] = useState<ProductInterface[]|null>(null)

  const navigate = useNavigate();
  const storeState:any = useSelector(state => state);

  const setPopularsData = async ()=>{
    try{
      const result = await getPopularProducts();
      console.log(result)
      setPopulars(result)
    }
    catch(err){
      alert(err);
      navigate('/')
    }
  }

  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

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
          {storeState.userInfo.id === null ? 
          <div className="none_box">
            <img src={iconLogin} alt="" />
            <div className="inner">
              <h3>로그인을 해주세요</h3>
              <Link className="login_go"  to='/login'>로그인</Link>
              <Link className="join_go"  to='/sign_up'>회원가입</Link>
            </div>
          </div>
          : 
          <UserInfo></UserInfo>}
          
        </div>
      </div>
      <div className="side_wrap">
        <div className="side_left">
          <div className="list_best">
            <h3>인기 상품</h3>
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={50}
              slidesPerView={4}
              navigation
              pagination={{ clickable: true }}
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
            <div className="hot_banner_wrap">
              <div className="hot_banner">
                <div className="hot_banner_con">
                  <h4><span>의자</span> 모음전</h4>
                  <Link className="go_button" to='/all_products?key=furnitureType&value=chair'>사러가기</Link>
                </div>
                <img className="hot_banner_img" src={hotchair} alt="" />
              </div>
              <div className="hot_banner">
                <div className="hot_banner_con">
                  <h4><span>책상</span> 모음전</h4>
                  <Link className="go_button" to='/all_products?key=furnitureType&value=desk'>사러가기</Link>
                </div>
                <img className="hot_banner_img" src={hotdesk} alt="" />
              </div>
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
            <div className="my_point">현재 내 포인트 <br></br> <span>{storeState.userInfo.point}</span></div>
            <div className="cart_title_wrap">
              <div className="cart_title">장바구니</div>
              <div className="cart_four_wrap">
                <ul className="cart_four">
                    {
                      storeState.userCartFour.items.map((item:any) => {
                        return (
                          <li className="cart_item" key={item.Product.imageuri}>
                            <img src={item.Product.imageuri} alt={item.Product.name} />
                          </li>
                        )
                      })
                    }
                </ul>
                <Link to='/cart_page'>더보기</Link>
              </div>
            </div>
            <button onClick={toTop}>TOP</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default MainPage;