'use client';
import Tilt from 'react-parallax-tilt';

export default function AICounsel({ insight }: { insight: string }) {
  // UPDATED: Changed the highlight color from blue to a heavy dark font 
  // so it stands out against the neon green background
  const formatText = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary-foreground font-black">$1</strong>');
  };

  return (
    <Tilt 
      glareEnable={true} 
      glareMaxOpacity={0.25} 
      glareColor="#ffffff" // Changed glare to white to make the green look glassy/shiny
      glarePosition="all" 
      scale={1.02} 
      transitionSpeed={1000} 
      className="h-full"
    >
      {/* UPDATED: Changed background to solid neon green (bg-primary) and added the glow effect */}
      <div className="h-full bg-primary text-primary-foreground p-8 rounded-3xl glow-primary cursor-default group flex flex-col relative overflow-hidden">
        
        {/* Added a subtle lighting overlay to give the green card a 3D physical feel */}
        <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent pointer-events-none" />

        <h4 className="relative z-10 flex items-center gap-3 font-display font-bold text-xl mb-4 group-hover:scale-105 transition-transform origin-left">
          <span className="text-2xl drop-shadow-md">✨</span> AI Health Protocol
        </h4>
        
        <div className="relative z-10 grow flex flex-col">
          {insight ? (
            <p 
              className="whitespace-pre-line leading-relaxed grow font-medium opacity-90"
              dangerouslySetInnerHTML={{ __html: formatText(insight) }} 
            />
          ) : (
            // UPDATED: Skeleton loader changed from gray to a semi-transparent dark color
            <div className="animate-pulse flex space-x-4 grow">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-primary-foreground/20 rounded w-3/4"></div>
                <div className="h-4 bg-primary-foreground/20 rounded w-5/6"></div>
                <div className="h-4 bg-primary-foreground/20 rounded w-4/6"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Tilt>
  );
}