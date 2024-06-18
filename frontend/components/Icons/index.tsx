interface IiconWrapperProps {
  children: React.ReactNode;
  className?: string;
}
export const IconWrapper = ({
  children,
  className = "text-blue-900",
}: IiconWrapperProps) => {
  return <span className={`text-3xl  ${className}`}>{children}</span>;
};
