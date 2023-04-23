import dynamic from "next/dynamic";
import classNames from "utils/classNames";

const DynamicComponent = dynamic(() => import("react-date-countdown-timer"), {
  ssr: false,
});

interface Props {
  className?: string;
}
const DateCountDown = ({ className = "" }: Props) => {
  return (
    <>
 
      <div
        className={classNames(
          className,
          " md:p-3 md:mt-0 text-sm"
        )}
      >
        {/* @ts-ignore */}
        <DynamicComponent dateTo="August 31, 2023 10:00:00 GMT+01:00" />
      </div>
    </>
  );
};

export default DateCountDown;
