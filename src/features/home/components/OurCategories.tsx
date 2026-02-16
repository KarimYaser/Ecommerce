import { getAllCategories } from "@/features/categories/server/categories.actions";
import Image from "next/image";
import Link from "next/link";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function OurCategories() {
  const response = await getAllCategories();

  // Background colors for category circles
  const bgColors = [
    "bg-orange-100",
    "bg-blue-100",
    "bg-red-100",
    "bg-green-100",
    "bg-amber-100",
    "bg-yellow-100",
    "bg-lime-100",
    "bg-pink-100",
    "bg-purple-100",
    "bg-teal-100",
  ];

  return (
    <section className="py-12 border-y border-gray-200">
      <div className="container">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            <span className="border-l-4 border-primary-600 pl-3">Shop By</span>{" "}
            <span className="text-primary-600">Category</span>
          </h2>
          <Link
            href="/categories"
            className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2 transition-colors"
          >
            View All Categories
            <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {response.data.map((category, index) => (
            <Link
              key={category._id}
              href={`/category/${category.slug}`}
              className="group flex flex-col items-center gap-3 cursor-pointer"
            >
              <div
                className={`${
                  bgColors[index % bgColors.length]
                } rounded-full p-4 w-24 h-24 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={80}
                  height={80}
                  className="object-contain w-16 h-16"
                />
              </div>
              <p className="font-medium text-sm text-gray-800 text-center group-hover:text-primary-600 transition-colors">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
