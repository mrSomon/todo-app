import Link from "next/link";
import React from "react";

const priceList = [
  {
    id: 1,
    title: "Start",
    speed: "5 Mb/s",
    storage: "15 GB",
    price: "Free",
  },
  {
    id: 2,
    title: "Pro",
    speed: "25 Mb/s",
    storage: "25 GB",
    price: "$24",
  },
  {
    id: 3,
    title: "Business",
    speed: "36 Mb/s",
    storage: "48 GB",
    price: "$50",
  },
  {
    id: 4,
    title: "Exclusive",
    speed: "64 Mb/s",
    storage: "128 GB",
    price: "$80",
  },
  {
    id: 5,
    title: "Premium",
    speed: "128 Mb/s",
    storage: "256 GB",
    price: "$125",
  },
];

const PriceListSection = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h3 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            Pricing
          </h3>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Banh mi cornhole echo park skateboard authentic crucifix neutra
            tilde lyft biodiesel artisan direct trade mumblecore 3 wolf moon
            twee Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            at corrupti fugiat commodi minus ratione. Esse ratione rem ad,
            distinctio voluptas, sapiente odit blanditiis perspiciatis
            laboriosam modi sunt placeat laudantium!
          </p>
        </div>
        <div className=" w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Plan
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Speed
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Storage
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {priceList.map((e) => (
                <tr key={e.id}>
                  <td className="px-4 py-3">{e.title}</td>
                  <td className="px-4 py-3">{e.speed}</td>
                  <td className="px-4 py-3">{e.storage}</td>
                  <td className="px-4 py-3 text-lg text-gray-900">{e.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex pl-4 mt-8 w-full mx-auto justify-end">
          <Link
            href={"/"}
            className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
          >
            Learn More
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PriceListSection;
