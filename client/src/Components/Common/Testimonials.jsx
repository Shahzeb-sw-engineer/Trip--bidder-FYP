import React from 'react'
import dots from '../../assets/images/dots.png'
import clientImage from '../../assets/images/client.png'
import clientImage2 from '../../assets/images/client 2.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Testimonials() {
    return (
        <>
            <section className='testimonials'>
                <div className="split">
                    <div className="info">
                        <h2 className='heading fw-bold heading-font'>What Our <br /> Customers <br /> Are Saying</h2>
                        <img src={dots} alt="" />
                    </div>

                    <div className="reviews">
                        <Swiper
                            // install Swiper modules
                            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                            spaceBetween={30}
                            // slidesPerView={4}
                            // navigation
                            autoplay
                            // pagination={{ clickable: true }}
                            // scrollbar={{ draggable: true }}
                            // onSwiper={(swiper) => console.log(swiper)}
                            loop={true}
                            className="review-slider"
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                400: {
                                    slidesPerView: 1,
                                },
                                639: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    // width: 768,
                                    slidesPerView: 1,
                                },
                            }}
                        >
                            <SwiperSlide>
                                <div className="review">
                                    <img src={clientImage} alt="" className="image" />
                                    <h5 className="name color-primary fw-bold">Alexendra</h5>
                                    <div className="designation text-secondary fst-italic">~ Traveller</div>
                                    <p className="paragraph-sm mt-3">
                                        <q>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam assumenda eius, quasi perferendis numquam non magni corrupti. Est reiciendis suscipit possimus nobis, dolorum explicabo. Porro aliquam mollitia dicta esse labore.</q>
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="review">
                                    <img src={clientImage2} alt="" className="image" />
                                    <h5 className="name color-primary fw-bold">Francessco</h5>
                                    <div className="designation text-secondary fst-italic">~ Vlogger</div>
                                    <p className="paragraph-sm mt-3">
                                        <q>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam assumenda eius, quasi perferendis numquam non magni corrupti. Est reiciendis suscipit possimus nobis, dolorum explicabo. Porro aliquam mollitia dicta esse labore.</q>
                                    </p>
                                </div>
                            </SwiperSlide>
                            
                        </Swiper>

                    </div>
                </div>
            </section >
        </>
    )
}
