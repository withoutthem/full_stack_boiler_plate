//libs
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';

//lib css
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

//img import
import banner1 from '../../assets/images/banner1.png'
import banner2 from '../../assets/images/banner2.png'
import banner3 from '../../assets/images/banner3.png' 

const MainSwiper = ():React.ReactElement=>{
  const navigate = useNavigate();
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => null}
      onSlideChange={() => null}
      autoplay={true}
      >
      <SwiperSlide>
        <img onClick={()=>{navigate('/event')}} src={banner1} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={banner2} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={banner3} alt="" />
      </SwiperSlide>
    </Swiper>
  )
}

export default MainSwiper;