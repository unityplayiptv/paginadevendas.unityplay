import { Star } from "lucide-react";

const GuaranteeBadge = () => {
  return (
    <div className="relative flex items-center justify-center w-40 h-40 mx-auto">
      {/* Outer circle with text */}
      <div className="absolute inset-0 rounded-full border-4 border-amber-600 bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg">
        {/* Text around the circle */}
        <svg className="w-full h-full" viewBox="0 0 160 160">
          <defs>
            <path
              id="circle-path"
              d="M 80 80 m -60 0 a 60 60 0 1 1 120 0 a 60 60 0 1 1 -120 0"
            />
          </defs>
          <text className="fill-white text-xs font-bold tracking-wider">
            <textPath href="#circle-path" startOffset="0%">
              GARANTIA DE SATISFAÇÃO • GARANTIA DE SATISFAÇÃO •
            </textPath>
          </text>
        </svg>
      </div>
      
      {/* Inner dark circle */}
      <div className="relative z-10 flex flex-col items-center justify-center w-24 h-24 bg-amber-900 rounded-full border-2 border-amber-400">
        {/* Stars */}
        <div className="flex gap-1 mb-1">
          {[...Array(3)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        
        {/* 100% text */}
        <div className="text-center">
          <span className="text-white font-bold text-xl">100%</span>
        </div>
        
        {/* Bottom stars */}
        <div className="flex gap-1 mt-1">
          {[...Array(3)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuaranteeBadge;