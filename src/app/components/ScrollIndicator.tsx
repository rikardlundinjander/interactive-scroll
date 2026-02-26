import { useEffect, useRef, useState } from 'react';

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
  const [isResting, setIsResting] = useState(false);
  const inactivityTimeoutRef = useRef<number | null>(null);

  const scheduleResting = () => {
    if (inactivityTimeoutRef.current !== null) {
      window.clearTimeout(inactivityTimeoutRef.current);
    }
    setIsResting(false);
    inactivityTimeoutRef.current = window.setTimeout(() => {
      setIsResting(true);
    }, 5000);
  };

  // Start inactivity timer on mount and clean up on unmount
  useEffect(() => {
    scheduleResting();
    return () => {
      if (inactivityTimeoutRef.current !== null) {
        window.clearTimeout(inactivityTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Any scroll activity resets the timer and returns to default state
  useEffect(() => {
    scheduleResting();
  }, [scrollProgress]);

  // Calculate position: move from top to bottom as user scrolls
  const topPosition = 16 + scrollProgress * (window.innerHeight - 270);

  const isExpanded = isHovered && !isResting;
  const outerBorderRadius = isExpanded ? '24px' : '40px';
  const transitionTiming = '0.25s cubic-bezier(0.65, 0, 0.35, 1)';

  // Transition sequencing:
  // - default -> resting: fade out content first, then shrink/scale
  // - resting -> expanded/default: start scale slightly before fading content in
  const sizeTransition = isResting
    ? `width ${transitionTiming} 0.25s, height ${transitionTiming} 0.25s`
    : `width ${transitionTiming} 0s, height ${transitionTiming} 0s`;
  const imageTransition = isResting
    ? `opacity ${transitionTiming} 0s, transform ${transitionTiming} 0.25s`
    : `opacity ${transitionTiming} 0.15s, transform ${transitionTiming} 0s`;
  const timeBlockTransition = isResting
    ? `margin-top ${transitionTiming} 0s, opacity ${transitionTiming} 0s`
    : `margin-top ${transitionTiming} 0s, opacity ${transitionTiming} 0.15s`;

  return (
    <div
      className="fixed right-[16px] z-50"
      style={{ 
        top: `${topPosition}px`,
        width: isResting ? '4px' : isExpanded ? '288px' : '64px',
        height: isResting ? '199px' : isExpanded ? '270px' : '199px',
        transition: sizeTransition,
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        scheduleResting();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        scheduleResting();
      }}
    >
      <div 
        className="backdrop-blur-[24px] bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col items-center justify-between overflow-clip pb-[16px] pt-[8px] px-[8px] h-full"
        style={{ 
          borderRadius: outerBorderRadius,
          transition: `border-radius ${transitionTiming}`,
          padding: isResting ? '4px' : undefined,
        }}
      >
        <div 
          className="pointer-events-none relative shrink-0 overflow-hidden"
          style={{
            width: isExpanded ? '100%' : '48px',
            height: isExpanded ? '180px' : '48px',
            borderRadius: isExpanded ? '16px' : '40px',
            transition: `width ${transitionTiming}, height ${transitionTiming}, border-radius ${transitionTiming}`,
          }}
        >
          <img 
            alt="" 
            className="absolute inset-0 max-w-none object-cover size-full" 
            src={currentImage}
            style={{
              transform: isExpanded ? 'scale(1)' : isResting ? 'scale(0.5)' : 'scale(1.15)',
              opacity: isResting ? 0 : 1,
              transition: imageTransition,
            }}
          />
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 rounded-[inherit]" />
        </div>
        <p 
          className="font-['KH_Teka:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-center"
          style={{
            color: isExpanded ? 'white' : 'rgba(255,255,255,0)',
            marginTop: isExpanded ? '12px' : '0px',
            opacity: isExpanded && !isResting ? 1 : 0,
            transitionProperty: 'opacity, color, margin-top',
            transitionDuration: '0.25s',
            transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
            transitionDelay: isHovered ? '75ms' : '0ms',
            whiteSpace: 'nowrap',
          }}
        >
          {currentTitle}
        </p>
        <div
          className="content-stretch flex flex-col font-['KH_Teka:Regular',sans-serif] items-center leading-[normal] not-italic relative shrink-0 text-center"
          style={{
            marginTop: isExpanded ? '8px' : '0px',
            opacity: !isResting ? 1 : 0,
            transition: timeBlockTransition,
          }}
        >
          <p className="relative shrink-0 text-[14px] text-white">{currentTime}</p>
          <p className="relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)]">{currentPeriod}</p>
        </div>
      </div>
    </div>
  );
}