import { useState } from 'react';

interface ScrollIndicatorProps {
  scrollProgress: number;
  currentImage: string;
  currentTime: string;
  currentPeriod: string;
  currentTitle: string;
}

export function ScrollIndicator({ 
  scrollProgress, 
  currentImage, 
  currentTime, 
  currentPeriod,
  currentTitle,
}: ScrollIndicatorProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate position: move from top to bottom as user scrolls
  const topPosition = 16 + scrollProgress * (window.innerHeight - 270);

  return (
    <div
      className="fixed right-[24px] z-50"
      style={{ 
        top: `${topPosition}px`,
        width: isHovered ? '288px' : '64px',
        height: isHovered ? '270px' : '199px',
        transition: 'width 0.25s cubic-bezier(0.65, 0, 0.35, 1), height 0.25s cubic-bezier(0.65, 0, 0.35, 1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="backdrop-blur-[24px] bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col items-center justify-between overflow-clip pb-[16px] pt-[8px] px-[8px] h-full"
        style={{ 
          borderRadius: isHovered ? '24px' : '999px',
          transition: 'border-radius 0.25s cubic-bezier(0.65, 0, 0.35, 1)',
        }}
      >
        <div 
          className="pointer-events-none relative shrink-0 overflow-hidden"
          style={{
            width: isHovered ? '100%' : '48px',
            height: isHovered ? '180px' : '48px',
            borderRadius: isHovered ? '16px' : '9999px',
            transition: 'width 0.25s cubic-bezier(0.65, 0, 0.35, 1), height 0.25s cubic-bezier(0.65, 0, 0.35, 1), border-radius 0.25s cubic-bezier(0.65, 0, 0.35, 1)',
          }}
        >
          <img 
            alt="" 
            className="absolute inset-0 max-w-none object-cover size-full" 
            src={currentImage}
            style={{
              transform: isHovered ? 'scale(1)' : 'scale(1.15)',
              transition: 'opacity 0.35s cubic-bezier(0.65, 0, 0.35, 1), transform 0.25s cubic-bezier(0.65, 0, 0.35, 1)',
            }}
          />
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 rounded-[inherit]" />
        </div>
        <p 
          className="font-['KH_Teka:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-center"
          style={{
            color: isHovered ? 'white' : 'rgba(255,255,255,0)',
            marginTop: isHovered ? '12px' : '0px',
            opacity: isHovered ? 1 : 0,
            transitionProperty: 'opacity, color, margin-top',
            transitionDuration: '0.25s',
            transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
            transitionDelay: isHovered ? '75ms' : '0ms',
            whiteSpace: 'nowrap',
          }}
        >
          {currentTitle}
        </p>
        <div className="content-stretch flex flex-col font-['KH_Teka:Regular',sans-serif] items-center leading-[normal] not-italic relative shrink-0 text-center" style={{ marginTop: isHovered ? '8px' : '0px', transition: 'margin-top 0.25s cubic-bezier(0.65, 0, 0.35, 1)' }}>
          <p className="relative shrink-0 text-[14px] text-white">{currentTime}</p>
          <p className="relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)]">{currentPeriod}</p>
        </div>
      </div>
    </div>
  );
}