export interface CategoryCardProps {
  title: string;
  image?: string; // Zdjęcie w tle
  count?: string;
  onClick?: () => void;
  className?: string;
}

const CategoryCard = ({
  title,
  image,
  count,
  onClick,
  className = "",
}: CategoryCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`group relative h-40 rounded-2xl overflow-hidden border bg-slate-900 border-slate-700 hover:border-blue-500 cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl ${className}`}
    >
      {/* Zdjęcie w tle z efektem powiększenia przy najechaniu */}
      {image && (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      )}

      {/* Gradient przyciemniający, żeby tekst był czytelny na każdym zdjęciu */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/40 to-transparent group-hover:via-slate-950/40 transition-colors duration-300" />

      {/* Treść karty umieszczona na wierzchu */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        <div className="flex items-end justify-between">
          <div>
            {count && (
              <span className="text-xs text-blue-400 font-semibold mb-1 block">
                {count}
              </span>
            )}
            <h3 className="text-white font-bold text-lg group-hover:translate-x-1 transition-transform">
              {title}
            </h3>
          </div>

          {/* Mała ikona strzałki reagująca na hover */}
          <div className="w-9 h-9 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
            →
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
