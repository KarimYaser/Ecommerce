"use client";

import { Product } from "../../Types/products.types";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";

export default function ProductGallery({ product }: { product: Product }) {
  const images = [product.imageCover, ...product.images];

  return (
    // <div className="flex flex-col gap-4 mx-auto w-full">
    //   {/* Main Image */}
    //   <div className="relative overflow-hidden rounded-lg bg-gray-100 mx-auto flex items-center justify-center">
    //     <Image
    //       src={images[selectedImage]}
    //       alt={product.title}
    //       width={500}
    //       height={500}
    //       className="object-cover"
    //       priority
    //     />
    //   </div>

    //   {/* Thumbnail Gallery */}
    //   <div className="grid grid-cols-4 gap-3">
    //     {images.map((image, index) => (
    //       <button
    //         key={index}
    //         onClick={() => setSelectedImage(index)}
    //         className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
    //           selectedImage === index
    //             ? "border-blue-500 ring-2 ring-blue-300"
    //             : "border-gray-200 hover:border-gray-300"
    //         }`}
    //       >
    //         <Image
    //           src={image}
    //           alt={`${product.title} view ${index + 1}`}
    //           fill
    //           className="object-cover"
    //         />
    //       </button>
    //     ))}
    //   </div>
    // </div>
    <ImageGallery
      items={images.map((image) => ({
        original: image,
        thumbnail: image,
      }))}
      showPlayButton={false}
    />
  );
}
