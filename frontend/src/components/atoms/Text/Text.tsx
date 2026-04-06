interface TextProps {
  content: string;
  size?: "small" | "large";
}

export const Text = ({ content }: TextProps) => {
  const textClassName = "size-26";
  return <p className={textClassName}>{content}</p>;
};
