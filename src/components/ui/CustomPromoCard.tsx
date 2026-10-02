import { Link } from "react-router-dom";
import { showFallbackImage } from "@/lib/image";
import type { Promo } from "@/types/promo";

type CustomPromoCardProps = { promo: Promo };

// One promo row: a photo on the left, title and subtitle on the right, the whole row a link when it has somewhere to go. Rows are separated by dividers, not cards.
const CustomPromoCard = ({ promo }: CustomPromoCardProps) => {
  const content = (
    <>
      <img src={promo.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" onError={showFallbackImage} className="aspect-square w-28 shrink-0 rounded-xl object-cover" />
      <div className="min-w-0 flex-1">
        <h3 className="title line-clamp-2 text-body font-bold text-foreground">{promo.title}</h3>
        <p className="subtitle mt-0.5 line-clamp-3 text-caption text-foreground/70">{promo.subtitle}</p>
      </div>
    </>
  );

  const rowClass = "flex items-start gap-2.5 p-sm";

  return promo.to ? (
    <Link to={promo.to} className={`${rowClass} transition hover:bg-muted`}>
      {content}
    </Link>
  ) : (
    <article className={rowClass}>{content}</article>
  );
};

export default CustomPromoCard;
