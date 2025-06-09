import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Aarav Nair",
    image: "https://img.freepik.com/premium-photo/face-portrait-casual-middleaged-man-white-square-background-generative-ai_741672-1331.jpg",
    message: "BabyChronicles helped us track everything so easily. It's a lifesaver for new parents!",
  },
  {
    name: "Meera Menon",
    image: "https://imgcdn.stablediffusionweb.com/2024/10/11/f47fe0d1-3d14-4e76-9817-0bd14f5af77a.jpg",
    message: "Simple, clean, and very helpful. I love the daily highlights!",
  },
  {
    name: "Rahul Dev",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT83smr_kdI7hxxNOeLf0cEL8_bSx-HtZBMqQ&s",
    message: "A must-have for every parent! Great user experience.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    

      <div className="relative overflow-hidden z-10">
         <h1 className='text-center text-3xl mt-16 my-5'>Testimonials</h1>
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="min-w-full flex items-center justify-center p-6 text-center"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-50 h-50 rounded-full mb-4 me-10 border-4 border-amber-200"
              />
              <div>
                  <p className="text-lg italic mb-2">"{t.message}"</p>
                  <h4 className="font-semibold text-amber-800">{t.name}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full mb-5 ${
                index === currentIndex ? "bg-pink-500" : "bg-pink-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    
  );
}

