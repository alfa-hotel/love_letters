import { useState } from "react";
import ImportedComponent from "@/imports/9/index";
import svgPaths from "@/imports/9/svg-artekh2weg";
import imgArtboard141 from "@/imports/9/1b481e7b3970f06a461fcd57c167f7577f0b8195.png";
import img2 from "@/imports/Artboard_1_1.jpg";
import img3 from "@/imports/Artboard_1_2.jpg";
import img4 from "@/imports/Artboard_1_3.jpg";
import img5 from "@/imports/Artboard_1_4.jpg";

const IMAGES = [imgArtboard141, img2, img3, img4, img5];

function StampPhoto({ src, onClick }: { src: string; onClick: () => void }) {
  return (
    <div
      className="aspect-[370/268] overflow-clip relative shrink-0 w-full cursor-pointer"
      onClick={onClick}
    >
      <div className="-translate-y-1/2 absolute aspect-[370/268] left-0 right-0 top-1/2">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 370 268"
        >
          <path d={svgPaths.p2e1d2980} fill="#FED4CA" />
        </svg>
      </div>
      <div className="-translate-y-1/2 absolute aspect-[350/248] left-[2.7%] right-[2.7%] top-1/2">
        <img
          alt="Фото гостя"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={src}
        />
      </div>
    </div>
  );
}

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <img
        alt="Фото гостя"
        className="max-w-full max-h-full md:max-h-[70vh] object-contain"
        src={src}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="absolute top-4 right-4 text-white bg-white/20 rounded-full w-10 h-10 flex items-center justify-center text-xl leading-none"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white overflow-clip relative rounded-[18px] size-[56px] flex items-center justify-center cursor-pointer active:scale-95 transition-transform hover:bg-gray-100"
    >
      <svg
        fill="none"
        height="20"
        viewBox="0 0 18.8 24.4"
        width="14"
        style={direction === "left" ? { transform: "rotate(-90deg)" } : { transform: "rotate(90deg)" }}
      >
        <path d="M9.4 23.4V1" stroke="#DA291C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d="M17.8 9.4L9.4 1L1 9.4" stroke="#DA291C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </button>
  );
}

export default function GuestLetters() {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setIndex((i) => (i + 1) % IMAGES.length);

  return (
    <div className="relative size-full overflow-hidden">
      {/* Background: full imported component with content hidden */}
      <div className="absolute inset-0 pointer-events-none [&_[data-name='content']]:invisible">
        <ImportedComponent />
      </div>

      {/* Interactive overlay */}
      <div className="absolute inset-0 flex items-center justify-center px-[16px]">
        <div className="flex flex-col gap-[48px] items-center justify-center w-full max-w-[600px] min-w-[304px]">

          {/* Header */}
          <div className="flex items-center justify-center shrink-0">
            <div
              className="[word-break:break-word] leading-[0] not-italic text-[0px] text-center text-white tracking-[-0.64px] whitespace-nowrap"
              style={{ fontFamily: "'Euclid Circular B', sans-serif", fontWeight: 500 }}
            >
              <p className="mb-0 whitespace-pre">
                <span className="leading-[normal] not-italic text-[67px]" style={{ fontFamily: "'Atziluth Script', cursive" }}>{`Письма `}</span>
                <span className="leading-[normal] text-[32px]">{` `}</span>
              </p>
              <p className="leading-[normal] text-[30px] whitespace-pre">наших гостей</p>
            </div>
          </div>

          {/* Photo stamp */}
          <div className="w-full">
            <StampPhoto src={IMAGES[index]} onClick={() => setLightbox(true)} />
          </div>

          {/* Dots */}
          <div className="flex gap-2 -mt-8">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`rounded-full transition-all ${
                  i === index ? "bg-white w-5 h-2" : "bg-white/50 w-2 h-2"
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-[32px] h-[56px] items-start justify-end shrink-0">
            <ArrowButton direction="left" onClick={prev} />
            <ArrowButton direction="right" onClick={next} />
          </div>

        </div>
      </div>
      {/* Preload all images */}
      <div className="hidden">
        {IMAGES.map((src, i) => <img key={i} src={src} alt="" />)}
      </div>

      {lightbox && <Lightbox src={IMAGES[index]} onClose={() => setLightbox(false)} />}
    </div>
  );
}
