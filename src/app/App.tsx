import { useState, useEffect } from 'react';
import img1 from "figma:asset/1444f60ebed7c860d1cb303ee0b0c0b9e5eabfa9.png";
import img2 from "figma:asset/0faabb4333aaf536737093cad721efec19dacdd5.png";
import img3 from "figma:asset/a8eb66588b39892a0a80e2575760d6567420f429.png";
import { ScrollIndicator } from './components/ScrollIndicator';

const stages = [
  { image: img1, time: '06:34', period: 'AM', title: 'Morning Hike, Colorado, US' },
  { image: img2, time: '14:20', period: 'PM', title: 'Art Gallery, New York, US' },
  { image: img3, time: '19:45', period: 'PM', title: 'Sunset Terrace, Barcelona, ES' },
];

export default function App() {
  const [currentStage, setCurrentStage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);

      // Determine which stage based on scroll position
      if (progress < 0.33) {
        setCurrentStage(0);
      } else if (progress < 0.66) {
        setCurrentStage(1);
      } else {
        setCurrentStage(2);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full min-h-screen">
      {/* Full screen background with fade transitions */}
      <div className="fixed inset-0 -z-10">
        {stages.map((stage, index) => (
          <img
            key={index}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
            src={stage.image}
            style={{ 
              opacity: currentStage === index ? 1 : 0,
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(1.05)`,
              transition: 'opacity 0.7s ease-in-out',
            }}
          />
        ))}
      </div>
      
      {/* Scrollable content to enable scrolling */}
      <div className="relative z-0 h-[300vh]">
        {/* Empty content area to make page scrollable */}
      </div>
      
      {/* Interactive scroll indicator */}
      <ScrollIndicator 
        scrollProgress={scrollProgress}
        currentImage={stages[currentStage].image}
        currentTime={stages[currentStage].time}
        currentPeriod={stages[currentStage].period}
        currentTitle={stages[currentStage].title}
      />
    </div>
  );
}