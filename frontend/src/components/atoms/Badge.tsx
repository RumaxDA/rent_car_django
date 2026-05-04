import type { BadgeProps } from "../../types/Badge";

export const Badge = ({ text }: BadgeProps) => {
  return (
    <div className="border rounded border-yellow-500 w-15 text-center">
      <small className="text-yellow-500">{text}</small>
    </div>
  );
};
