'use client';

const ScrollingBelt = () => {
  const tags = [
    "UI Design", "Design Agency", "Strategy", "Digital Solution",
    "Business Growth", "Development", "IT Company", "SEO Agency", "Consulting"
  ];

  // Tripled for seamless looping
  const displayTags = [...tags, ...tags, ...tags];

  return (
    <div className="w-full bg-white py-12 overflow-hidden">
      <div className="flex animate-marquee-fast whitespace-nowrap gap-4 items-center">
        {displayTags.map((tag, index) => (
          <div
            key={index}
            className="px-10 py-2 rounded-full border border-gray-100 text-[#64748b] font-medium text-lg shadow-sm hover:border-gray-400 transition-all cursor-default shrink-0 bg-white"
          >
            {tag}
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        
        .animate-marquee-fast {
          /* CHANGED FROM 40s TO 15s FOR MORE SPEED */
          animation: marquee 15s linear infinite;
        }

        .animate-marquee-fast:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ScrollingBelt;