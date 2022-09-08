interface IProps {
  children: React.ReactNode;
}
const PageWrapper = ({ children }: IProps) => {
  return <div className="blue-bg-gradient">{children}</div>;
};

export default PageWrapper;
