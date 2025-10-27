import Lottie from "lottie-react";
import animationData from "@/assets/loader.json";
import "@/styles/preloader.scss";

const Preloader = () => {
  return (
    <div className="preloader">
      <Lottie
        animationData={animationData}
        loop={true}
        autoPlay={true}
        className="size-20 md:size-50"
      ></Lottie>
    </div>
  );
};

export default Preloader;
