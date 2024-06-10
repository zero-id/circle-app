import { useState } from "react";
import { useParams } from "react-router-dom";
import { IThreadImage } from "../../../types/app";
import useThread from "./useThread";

const useThreadDetailImage = () => {
  const { id } = useParams();
  const { thread, fetchThreads } = useThread();

  const threadDetail = thread.find((thread) => thread.id === +id!);

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slides = threadDetail?.image?.map((img: IThreadImage) => {
    return img.image;
  });

  const slidesCount = slides?.length;
  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount! - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount! - 1 ? 0 : s + 1));
  };

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };

  return {
    id,
    threadDetail,
    fetchThreads,
    currentSlide,
    setCurrentSlide,
    slides,
    slidesCount,
    carouselStyle,
    prevSlide,
    nextSlide,
  };
};

export default useThreadDetailImage;
