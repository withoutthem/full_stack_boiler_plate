//libs
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

//lib css
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

//img import
import banner1 from '../../assets/images/banner1.jpg'
import banner2 from '../../assets/images/banner2.jpg'
import banner3 from '../../assets/images/banner3.jpg' 
import banner4 from '../../assets/images/banner4.jpg' 

const MainSwiper = ():React.ReactElement=>{
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => null}
      onSlideChange={() => null}
      autoplay={true}
      >
      <SwiperSlide>
        <img src={banner1} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={banner2} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={banner3} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={banner4} alt="" />
      </SwiperSlide>
    </Swiper>
  )
}

export default MainSwiper;