import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function StarRating({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={faStar}
            className={`w-5 h-5 ${
              star <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">
        {rating} ({reviewCount} reviews)
      </span>
    </div>
  );
}
