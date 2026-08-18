"use client";

import { motion } from "framer-motion";
import { PropertyListingCardProps } from "@/types";
import PropertyCardImage from "./card/PropertyCardImage";
import PropertyCardHeader from "./card/PropertyCardHeader";
import PropertyCardSpecs from "./card/PropertyCardSpecs";

function PropertyListingCard({
  id,
  image,
  headline,
  ownerName,
  price,
  currency,
  period,
  location,
  beds,
  baths,
  parking,
  isVerified,
  availabilityStatus = "Available",
  index = 0,
}: PropertyListingCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group relative flex flex-col sm:flex-row gap-4 sm:gap-5 rounded-2xl border border-line/80 bg-white p-3.5 sm:p-4 transition-all duration-300 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5"
    >
      {/* Property Image with Badges */}
      <PropertyCardImage
        image={image}
        headline={headline}
        isVerified={isVerified}
        availabilityStatus={availabilityStatus}
      />

      {/* Content Details */}
      <div className="min-w-0 flex-1 flex flex-col justify-between py-0.5">
        <PropertyCardHeader
          id={id}
          headline={headline}
          ownerName={ownerName}
          location={location}
          price={price}
          currency={currency}
          period={period}
        />

        <PropertyCardSpecs
          id={id}
          beds={beds}
          baths={baths}
          parking={parking}
        />
      </div>
    </motion.article>
  );
}

export default PropertyListingCard;
