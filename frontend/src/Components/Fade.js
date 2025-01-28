import * as React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Pagination } from 'swiper';

const content = [
  {
    img: 'https://images.pexels.com/photos/7982749/pexels-photo-7982749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '26 December 2018',
    header: 'Title01',
    info: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid enim quidem ipsum quos corrupti totam ullam nam, amet, quam dolores saepe assumenda adipisci tenetur, sunt minima et porro unde excepturi?',
  },
  {
    img: 'https://images.pexels.com/photos/7982534/pexels-photo-7982534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '26 December 2010',
    header: 'Title02',
    info: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid enim quidem ipsum quos corrupti totam ullam nam, amet, quam dolores saepe assumenda adipisci tenetur, sunt minima et porro unde excepturi?',
  },
  {
    img: 'https://images.pexels.com/photos/7982425/pexels-photo-7982425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '26 December 2011',
    header: 'Title03',
    info: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid enim quidem ipsum quos corrupti totam ullam nam, amet, quam dolores saepe assumenda adipisci tenetur, sunt minima et porro unde excepturi?',
  },
];

export default function Fade() {
  return (
    <section className="pt-[7rem] pb-[2rem] bg-orange-100">
      <div className="lg:mx-auto max-w-5xl mx-[1.5rem]">
        <h1 className="text-[3rem] font-bold underline mb-[2rem] text-center">
          Fade
        </h1>
        <Swiper
          modules={[Navigation, Pagination, EffectFade]}
          effect={'fade'}
          loop={true}
          pagination={{
            clickable: true,
            type: 'fraction',
          }}
          spaceBetween={30}
          navigation
          className="fade"
        >
          {content.map((p, index) => {
            return (
              <SwiperSlide
                className=" grid md:grid-cols-2 gap-y-10 md:gap-x-10 x-md:pt-10"
                key={index}
              >
                <div>
                  <img src={p.img} alt="" />
                </div>
                <div className="px-y pt-7">
                  <header className="date text-slate-600 font-bold ">
                    {p.date}
                  </header>
                  <div className="title ">
                    <h1 className="font-bold mt-10 ">{p.header}</h1>
                    <p>{p.info}</p>
                  </div>
                  <button className="btn bg-red-500 p-[1rem_1.5rem] font-bold text-white mt-5 ">
                    More
                  </button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
