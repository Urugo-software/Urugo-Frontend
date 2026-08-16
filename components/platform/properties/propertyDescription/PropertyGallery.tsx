import { PropertyImage } from "@/types/properties";
import Image from "next/image";

interface PropertyGalleryProps {
  images: PropertyImage[];
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [mainImage, secondImage, thirdImage] = images;

  return (
    <div className="grid grid-cols-1 rounded-xl md:grid-cols-[1.6fr_1fr] gap-3  overflow-hidden mb-8 h-auto md:h-[380px]">
      {/* Main image */}
      <div className="relative overflow-hidden    h-[260px] md:h-full">
        {mainImage && (
          <Image
            src={mainImage.image}
            alt={mainImage.alt}
            fill
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Secondary images */}
      <div className="hidden md:grid grid-rows-2 gap-3  overflow-y-auto ">
        {secondImage && (
          <div className="overflow-hidden ">
            <Image
              src={secondImage.image}
              alt={secondImage.alt}
              width={500}
              height={350}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {thirdImage && (
          <div className="overflow-hidden ">
            <Image
              src={thirdImage.image}
              alt={thirdImage.alt}
              width={500}
              height={350}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
