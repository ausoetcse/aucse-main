"use client";

import React, { useRef, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

type Testimonial = {
  name: string;
  // // title: string;
  message: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Sanmoy Roy",
    // title: "Data Analyst at Scaler",
    message:
      "Adamas gave me more than a degree — it gave me confidence and clarity. The real-world projects were game changers.",
    image:
      "/testimonial/2.png",
  },
  {
    name: "Rhytam Garai",
    // title: "Software Engineer at Google",
    message:
      "Thanks to Adamas, I learned how to think like an engineer. Their hands-on approach prepared me for global tech challenges.",
    image:
      "/testimonial/3.png",
  },
  {
    name: "Pretam Chandra",
    // title: "AI Research Intern at Microsoft",
    message:
      "The faculty at Adamas inspired me to dig deep into AI. I owe my research mindset to their constant support.",
    image:
      "/testimonial/1.png",
  },
  {
    name: "Pragya Das",
    // title: "Product Designer at Adobe",
    message:
      "Adamas nurtured my creative side while grounding me in tech. I found my passion for UX design here.",
    image:
      "/testimonial/5.png",
  },
  {
    name: "Subhojit Santra",
    // title: "DevOps Engineer at Atlassian",
    message:
      "The project-based learning model made me industry-ready from day one. It’s the best decision I ever made.",
    image:
      "/testimonial/4.png",
  },
    {
    name: "Sanmoy Roy",
    // title: "Data Analyst at Scaler",
    message:
      "Adamas gave me more than a degree — it gave me confidence and clarity. The real-world projects were game changers.",
    image:
      "/testimonial/2.png",
  },
  {
    name: "Rhytam Garai",
    // title: "Software Engineer at Google",
    message:
      "Thanks to Adamas, I learned how to think like an engineer. Their hands-on approach prepared me for global tech challenges.",
    image:
      "/testimonial/3.png",
  },
  {
    name: "Pretam Chandra",
    // title: "AI Research Intern at Microsoft",
    message:
      "The faculty at Adamas inspired me to dig deep into AI. I owe my research mindset to their constant support.",
    image:
      "/testimonial/1.png",
  },
  {
    name: "Pragya Das",
    // title: "Product Designer at Adobe",
    message:
      "Adamas nurtured my creative side while grounding me in tech. I found my passion for UX design here.",
    image:
      "/testimonial/5.png",
  },
  {
    name: "Subhojit Santra",
    // title: "DevOps Engineer at Atlassian",
    message:
      "The project-based learning model made me industry-ready from day one. It’s the best decision I ever made.",
    image:
      "/testimonial/4.png",
  },
    {
    name: "Pragya Das",
    // title: "Product Designer at Adobe",
    message:
      "Adamas nurtured my creative side while grounding me in tech. I found my passion for UX design here.",
    image:
      "/testimonial/5.png",
  },
  {
    name: "Subhojit Santra",
    // title: "DevOps Engineer at Atlassian",
    message:
      "The project-based learning model made me industry-ready from day one. It’s the best decision I ever made.",
    image:
      "/testimonial/4.png",
  },  {
    name: "Pragya Das",
    // title: "Product Designer at Adobe",
    message:
      "Adamas nurtured my creative side while grounding me in tech. I found my passion for UX design here.",
    image:
      "/testimonial/5.png",
  },
  {
    name: "Subhojit Santra",
    // title: "DevOps Engineer at Atlassian",
    message:
      "The project-based learning model made me industry-ready from day one. It’s the best decision I ever made.",
    image:
      "/testimonial/4.png",
  },


];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="bg-neutral-100/10 border-2 border-blue-800 rounded-xl p-4 min-h-[180px] shadow-sm ">
    <div className="flex items-center gap-4 mb-3">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h3 className="font-semibold text-blue-900">{testimonial.name}</h3>
        {/* <p className="text-sm text-zinc-200/80">{testimonial.title}</p> */}
      </div>
    </div>
    <p className="text-white">{testimonial.message}</p>
  </div>
);

const TestimonialCarousel: React.FC = () => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const mouseOver = useRef(false);
  const easingEaseOut = (t: number) => 1 - Math.pow(1 - t, 3); // cubic ease-out
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1.08,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 500px)": {
        slides: { perView: 1.3, spacing: 16 },
      },
      "(min-width: 600px)": {
        slides: { perView: 1.5, spacing: 16 },
      },
      "(min-width: 640px)": {
        slides: { perView: 1.6, spacing: 16 },
      },
      "(min-width: 700px)": {
        slides: { perView: 1.75, spacing: 16 },
      },
      "(min-width: 800px)": {
        slides: { perView: 2, spacing: 16 },
      },
      "(min-width: 900px)": {
        slides: { perView: 2.5, spacing: 24 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 2.8, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 24 },
      },
    },
    // animation: {
    //   duration: 6000,
    //   easing: easingEaseOut,
    // },
    

    // dragStarted() {
    //   stopAutoSlide();
    // },
    // dragEnded() {
    //   startAutoSlide();
    // },
    // mouseEntered() {
    //   mouseOver.current = true;
    //   stopAutoSlide();
    // },
    // mouseLeft() {
    //   mouseOver.current = false;
    //   startAutoSlide();
    // },

  });
  

  const startAutoSlide = () => {
    stopAutoSlide();
    timer.current = setInterval(() => {
      if (!mouseOver.current && slider.current) {
        slider.current.next();
      }
    }, 6000);
  };

  const stopAutoSlide = () => {
    if (timer.current) clearInterval(timer.current);
  };

  useEffect(() => {
    if (slider.current) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [slider.current]);

  return (
    <section className="px-2 py-10 bg-gradient-to-b to-[#001885] from-[#ffffff]">
      <div className="max-w-8xl mx-auto text-justify">
        <h2 className="scroll-m-20 text-center text-5xl font-extrabold tracking-tight  font-special-gothic mb-4">What our Student Says</h2>
        {/* <p className="text-zinc-900 text-sm leading-start p-5 mb-4 font-ubuntu">
          Discover the voices of Adamas University. Our students share how
          academic rigor, mentorship, and real-world exposure helped shape their
          personal and professional journeys. Their stories reflect the vibrant
          learning environment and transformative impact of being part of Adamas.
          Explore their experiences and envision your future with us.
        </p> */}
 
        <div className="lg:hidden" ref={sliderRef}>
          <div className="keen-slider">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="keen-slider__slide bg-[#f3f2f2] rounded-xl p-4 min-h-[220px]"
              >
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{t.name}</h3>
                    {/* <p className="text-sm text-gray-500">{t.title}</p> */}
                  </div>
                </div>
                <p className=" text-gray-700">{t.message}</p>
              </div>
            ))}
          </div>
        </div>
        {/* 👉 Desktop: 3-column vertical scroll with overlays */}
        <div className="relative hidden lg:block lg:px-8">
          
          {/* The grid container */}
          <div className="grid grid-cols-3 gap-6">
            <div className="overflow-hidden h-[750px]">
              <div className="space-y-4 animate-scroll-up">
                {[...testimonials.slice(0, 4), ...testimonials.slice(0, 4)].map((t, i) => (
                  <TestimonialCard key={`col1-${i}`} testimonial={t} />
                ))}
              </div>
            </div>
            <div className="overflow-hidden h-[750px]">
              <div className="space-y-4 animate-scroll-down">
                {[...testimonials.slice(4, 8), ...testimonials.slice(4, 8)].map((t, i) => (
                  <TestimonialCard key={`col2-${i}`} testimonial={t} />
                ))}
              </div>
            </div>
            <div className="overflow-hidden h-[750px]">
              <div className="space-y-4 animate-scroll-up">
                {[...testimonials.slice(8, 12), ...testimonials.slice(8, 12)].map((t, i) => (
                  <TestimonialCard key={`col3-${i}`} testimonial={t} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
