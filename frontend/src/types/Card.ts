import type { BadgeProps } from "./Badge";
import type { ButtonProps } from "./Button";

export interface CarCardProps {
  car: {
    brand: string;
    model: string;
    year: number;
    hp: number;
    engine_type: string;
    image?: string;
  };
}

export interface CardProps {
  badge: BadgeProps;
  car: CarCardProps;
  title: string;
  subtitle?: string;
  body: string;
  btn: ButtonProps;
}
