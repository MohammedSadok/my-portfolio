import HeroContent from "./HeroContent";

const Hero = () => {
  return (
    <div className="relative flex flex-col w-full h-full" id="about-me">
      {/* <video
        autoPlay
        muted
        loop
        className="absolute object-cover w-full h-full rotate-180"
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video> */}
      <HeroContent />
    </div>
  );
};

export default Hero;
