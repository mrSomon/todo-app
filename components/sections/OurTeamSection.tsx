import React from "react";

const ourTeam = [
  {
    id: 1,
    img: {
      link: "https://dummyimage.com/80x80",
      alt: "team-1",
    },
    fullName: "Holden Caulfield",
    profesion: "UI Designer",
  },
  {
    id: 2,
    img: {
      link: "https://dummyimage.com/80x80",
      alt: "team-3",
    },
    fullName: "Sam Smith",
    profesion: "Frontend Developer",
  },
  {
    id: 3,
    img: {
      link: "https://dummyimage.com/80x80",
      alt: "team-3",
    },
    fullName: "John Smith",
    profesion: "Backend Developer",
  },
  {
    id: 4,
    img: {
      link: "https://dummyimage.com/80x80",
      alt: "team-4",
    },
    fullName: "Tom Green",
    profesion: "Manager Manager",
  },
  {
    id: 5,
    img: {
      link: "https://dummyimage.com/80x80",
      alt: "team-5",
    },
    fullName: "John Black",
    profesion: "Office Manager",
  },
  {
    id: 6,
    img: {
      link: "https://dummyimage.com/80x80",
      alt: "team-6",
    },
    fullName: "Tom Blue",
    profesion: "Admin",
  },
];

const OurTeamSection = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h3 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Our Team
          </h3>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            culpa vel eos nobis corrupti inventore, blanditiis, consequatur
            voluptatem incidunt sunt numquam impedit unde exercitationem iusto.
          </p>
        </div>
        <div className="flex flex-wrap -m-2">
          {ourTeam.map((e) => (
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={e.id}>
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={e.img.link}
                  alt={e.img.alt}
                />
                <div className="flex-grow">
                  <h5 className="text-gray-900 title-font font-medium">
                    {e.fullName}
                  </h5>
                  <p className="text-gray-500">{e.profesion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeamSection;
