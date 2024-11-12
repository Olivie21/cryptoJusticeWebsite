import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ts1 from "/public/images/testimonial/2.png";

import tright from "/public/images/testimonial/1.png";
import Image from "next/image";

const Testimonial = (props) => {
  var settings = {
    dots: true,
    arrows: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const testimonial = [
    {
      tsImg: ts1,
      Des: "“Elementum viverra tortor rhoncus nunc. Nunc proin lacinia interdum nulla fusce nam. Sagittis dolor hendrerit donec in eu, facilisis lobortis. Hendr laoret pretium veslum egestas.”",
      Title: "Milani Harverd",
      Sub: "CEO Of GRK Egency",
    },
  ];
  return (
    <section className={`relative ${props.tClass}`}>
      <div className="wraper">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-4 md:col-span-6 sm:col-span-12 sm:order-2">
            <div className="testimonial-img sm:text-center sm:max-w-[70%] sm:mx-auto">
              <Image src={tright} alt="" />
            </div>
          </div>
          <div className="col-span-8 md:col-span-6 sm:col-span-12 sm:order-1">
            <div className="testimonial-text ml-[95px] mt-[50px] md:ml-0">
              <div className="text-left sm:text-center">
                <span className="text-[16px] text-[#ada282]">
                  What People Say
                </span>
                <h2
                  className="text-[36px] md:text-[26px] font-medium text-[#333] pb-[20px] relative 
                        before:absolute before:content-[''] before:left-[-68px] 
                        before:top-[30px] before:transform before:-translate-y-1/2 
                        before:w-[60px] before:h-[1px] before:bg-[#c0b596] md:before:hidden"
                >
                  Client Testimonial
                </h2>
              </div>
              <div className="testimonial-slide owl-carousel">
                <Slider {...settings}>
                  {testimonial.map((tesmnl, tsm) => (
                    <div className="slide-item sm:text-center" key={tsm}>
                      <p className="relative pt-[30px] sm:p-0 z-10 sm:pl-[20px] pl-[33px] pb-[30px] pr-[50px] mb-[20px] before:absolute before:left-[4px] before:top-[5px] before:content-['\f10d'] before:-z-10  before:font-['FontAwesome'] before:text-[#c0b596] before:text-[30px] sm:before:text-[20px]">
                        I thought my life was destroyed but they saved me. Their
                        expertise and dedication were evident from the very
                        beginning. They guided me through every step of the
                        process, providing support and reassurance when I needed
                        it most. Thanks to their relentless efforts, I was able
                        to recover what I had lost and rebuild my life. I am
                        forever grateful for their help and highly recommend
                        their services to anyone in need.
                      </p>
                      <div className="w-[18%] rounded-[50%] float-left sm:float-none sm:mx-auto pr-[20px] sm:pr-0">
                        <Image src={tesmnl.tsImg} alt="" />
                      </div>
                      <div className="mt-[35px] sm:mt-[20px] sm:mb-[30px]">
                        <h4 className="text-[18px] font-semibold font-base-font">
                          {tesmnl.Title}
                        </h4>
                        <span className="text-[16px] text-[#666]">
                          {tesmnl.Sub}
                        </span>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
