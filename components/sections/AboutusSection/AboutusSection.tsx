import React from "react";
import "./AboutusSection.scss";
import { TiTick } from "react-icons/ti";
import Link from "next/link";

const list = ["One", "Two", "Three", "Four", "Five"];

const AboutusSection = () => {
  return (
    <section className="about">
      <div className="container mx-auto py-24 flex flex-col md:flex-row items-center">
        <div className="">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded" src="https://dummyimage.com/720x600" alt="aboutus" />
          </div>
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <div className="section-header text-left">
            <h3 className="title-font sm:text-4xl text-3xl mb-2 font-medium text-gray-900">
              About Us
            </h3>
            <h4 className="text-sm">some slogan text here</h4>
          </div>
          <div className="about-content">
            <p className="mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet elit. In vitae turpis. Donec in hendre
              dui, vel blandit massa. Ut vestibu suscipi cursus. Cras quis porta
              nulla, ut placerat risus. Aliquam nec magna eget velit luctus
              dictum
            </p>
            <ul>
              {list.map((item, index) => (
                <li key={index} className="flex flex-row items-center">
                  <TiTick color="#3e3" />
                  <span className="ml-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutusSection;
