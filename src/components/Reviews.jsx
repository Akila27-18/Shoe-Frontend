import React from "react";

// Default reviews data
const defaultReviews = [
  {
    reviewer: "Beverley",
    location: "Weymouth",
    ratings: { fit: 5, overall: 5, comfort: 5, value: 4, quality: 5 },
    text: "Very pleased with the super fast delivery and packaging. Shoes are very good quality and superb.",
    recommend: true,
  },
  {
    reviewer: "Beverley",
    location: "Weymouth",
    ratings: { fit: 5, overall: 5, comfort: 5, value: 4, quality: 5 },
    text: "Very pleased with the super fast delivery and packaging. Shoes are very good quality and superb.",
    recommend: true,
  },
];

const Reviews = ({ reviews = defaultReviews }) => {
  const generateStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"} fill-current`}
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21L16.54 13.91L22 9.27L14.81 8.65L12 2L9.19 8.65L2 9.27L7.46 13.91L5.82 21L12 17.27Z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="mt-12 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>

      {reviews.map((review, idx) => (
        <div
          key={idx}
          className={`${idx !== reviews.length - 1 ? "border-b border-gray-200 pb-6 mb-6" : ""}`}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-gray-600">
              {review.reviewer[0]}
            </div>
            <div>
              <p className="font-semibold text-gray-800">Reviewed by {review.reviewer}</p>
              <p className="text-sm text-gray-500">From: {review.location}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>Fit</span>
              <div className="flex">{generateStars(review.ratings.fit)}</div>
            </div>
            <div className="flex items-center justify-between">
              <span>Overall rating</span>
              <div className="flex">{generateStars(review.ratings.overall)}</div>
            </div>
            <div className="flex items-center justify-between">
              <span>Comfort</span>
              <div className="flex">{generateStars(review.ratings.comfort)}</div>
            </div>
            <div className="flex items-center justify-between">
              <span>Value for Money</span>
              <div className="flex">{generateStars(review.ratings.value)}</div>
            </div>
            <div className="flex items-center justify-between">
              <span>Quality</span>
              <div className="flex">{generateStars(review.ratings.quality)}</div>
            </div>
          </div>

          <p className="mt-4 text-gray-700">{review.text}</p>
          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={review.recommend}
              className="w-4 h-4 text-slate-600 bg-gray-100 border-gray-300 rounded focus:ring-slate-500"
              readOnly
            />
            <span className="text-sm text-gray-700">
              {review.reviewer} would recommend this product
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
