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

const Card = ({
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
      className={`group bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:border-blue-500 hover:shadow-lg ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      <div className="relative h-24 w-full overflow-hidden bg-slate-900">
        {image && (
          <img
            src={image}
            alt={title || "Card image"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {tag && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
            {tag}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3">
        {title && (
          <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
        )}
        {text && (
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
            {text}
          </p>
        )}
        {price && (
          <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-700/60">
            <span className="text-xs text-slate-400">Price from:</span>
            <span className="text-sm font-bold text-blue-400">
              {price} zł / day{" "}
            </span>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default Card;
