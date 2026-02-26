import imgFrame352 from "figma:asset/1444f60ebed7c860d1cb303ee0b0c0b9e5eabfa9.png";
import imgFrame353 from "figma:asset/0faabb4333aaf536737093cad721efec19dacdd5.png";

function Frame2() {
  return (
    <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[48px]">
      <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[9999px] size-full" src={imgFrame353} />
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 rounded-[9999px]" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col font-['KH_Teka:Regular',sans-serif] items-center leading-[normal] not-italic relative shrink-0 text-center">
      <p className="relative shrink-0 text-[14px] text-white">06:34</p>
      <p className="relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)]">AM</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="-translate-y-1/2 absolute backdrop-blur-[12px] bg-[rgba(0,0,0,0.6)] content-stretch flex flex-col h-[199px] items-center justify-between left-[1848px] overflow-clip pb-[16px] pt-[8px] px-[8px] rounded-[999px] top-[calc(50%+0.5px)] w-[64px]">
      <Frame2 />
      <p className="font-['KH_Teka:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0)] text-center">Bedtime Stories, Paris, FR</p>
      <Frame3 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-white inset-0" />
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[102.7%] left-[-3.75%] max-w-none top-[-1.35%] w-[107.5%]" src={imgFrame352} />
        </div>
      </div>
      <Frame1 />
    </div>
  );
}