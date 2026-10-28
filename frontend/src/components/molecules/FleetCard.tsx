export interface CardProps {
  image?: string;
  title?: string;
  tag?: string;
  price?: string | number;
  text?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const FleetCard = ({
  image,
  title,
  tag,
  price,
  text,
  onClick,
  className,
  children,
}: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={`group relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-blue-500/50 hover:shadow-blue-500/10 hover:-translate-y-1 ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {/* Subtle background glow effect on hover */}
      <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image container - object-cover fills the container completely without black bars */}
      <div className="relative h-36 w-full overflow-hidden bg-slate-950">
        {image && (
          <img
            src={image}
            alt={title || "Card image"}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500"
          />
        )}

        {/* Modern Glassmorphic Tag */}
        {tag && (
          <span className="absolute top-3 left-3 z-10 bg-slate-950/60 backdrop-blur-md border border-white/10 text-blue-400 text-xs font-medium px-3 py-1 rounded-full shadow-lg">
            {tag}
          </span>
        )}

        {/* Gradient overlay at the bottom of the image for smooth transition */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-slate-950/80 to-transparent opacity-60 pointer-events-none" />
      </div>

      {/* Content wrapper */}
      <div className="p-5 flex flex-col gap-3 relative z-10">
        {title && (
          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">
            {title}
          </h3>
        )}

        {text && (
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 font-light">
            {text}
          </p>
        )}

        {price && (
          <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/10">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">
              Price from:
            </span>
            <span className="text-sm font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
              {price} zł{" "}
              <span className="text-xs font-light text-slate-400">/ day</span>
            </span>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default FleetCard;
