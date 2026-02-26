import imgFrame353 from "figma:asset/0faabb4333aaf536737093cad721efec19dacdd5.png";

function Frame1() {
  return (
    <div className="h-[137px] pointer-events-none relative rounded-[16px] shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[16px] size-full" src={imgFrame353} />
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 rounded-[16px]" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col font-['KH_Teka:Regular',sans-serif] items-center leading-[normal] not-italic relative shrink-0 text-center">
      <p className="relative shrink-0 text-[14px] text-white">06:34</p>
      <p className="relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)]">AM</p>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(0,0,0,0.6)] content-stretch flex flex-col items-center justify-between overflow-clip pb-[16px] pt-[8px] px-[8px] relative rounded-[24px] size-full">
      <Frame1 />
      <p className="font-['KH_Teka:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-center text-white">Bedtime Stories, Paris, FR</p>
      <Frame2 />
    </div>
  );
}