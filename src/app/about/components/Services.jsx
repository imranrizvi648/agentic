'use client';
import { Montserrat } from 'next/font/google';
import { ArrowUpRight } from 'lucide-react'; // Make sure to npm install lucide-react

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });

const Services = () => {
  const services = [
    {
      title: "UI/UX Design",
      desc: "Crafting intuitive digital experiences that resonate with users.",
      tags: ["Figma", "Prototyping"]
    },
    {
      title: "Development",
      desc: "Building scalable web applications using the latest tech stacks.",
      tags: ["Next.js", "React"]
    },
    {
      title: "Branding",
      desc: "Defining visual identities that tell a powerful brand story.",
      tags: ["Identity", "Strategy"]
    },
    {
      title: "Digital Marketing",
      desc: "Data-driven strategies to grow your online presence effectively.",
      tags: ["SEO", "Ads"]
    }
  ];

  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-325 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#FF424A] font-bold uppercase tracking-widest text-sm">
              Our Expertise
            </span>
            <h2 className={`${montserrat.className} text-5xl md:text-7xl font-black text-[#1e1b4b] mt-4 leading-tight`}>
              We push the boundaries of digital.
            </h2>
          </div>
          <p className="text-gray-500 text-lg max-w-sm pb-2">
            Providing full-suite solutions for modern brands looking to scale in the digital age.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group bg-white p-12 hover:bg-[#1e1b4b] transition-all duration-500 cursor-pointer relative"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="flex gap-2">
                  {service.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 border border-gray-200 group-hover:border-gray-700 text-gray-400 group-hover:text-gray-400 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="text-gray-300 group-hover:text-[#FF424A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={32} />
              </div>

              <h3 className={`${montserrat.className} text-3xl font-bold text-[#1e1b4b] group-hover:text-white mb-4 transition-colors`}>
                {service.title}
              </h3>
              <p className="text-gray-500 group-hover:text-gray-300 transition-colors text-lg max-w-xs">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;