import { BannerType } from "@/types";


export function ServerBanner({ banner }: { banner: BannerType }) {
  return (
    <div className="absolute top-0 left-0 w-full h-32 overflow-hidden z-0">
      {banner.type === "solid" ? (
        <div
          className="w-full h-full"
          style={{ backgroundColor: banner.color }}
        />
      ) : banner.url ? (
        <img
          src={banner.url}
          alt="Server banner"
          className="w-full h-full object-cover"
        />
      ) : banner.gradient ? (
        <div
          className="w-full h-full bg-gradient-to-br"
          style={{
            backgroundImage: `linear-gradient(${banner.gradient.angle || 135}deg, ${banner.gradient.from || '#3d48b9'}, ${banner.gradient.to || '#5865f2'})`
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500" />
      )}
      {/* Overlay gradient for text readability */}
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-card/80 to-transparent" />
    </div>
  );
}
