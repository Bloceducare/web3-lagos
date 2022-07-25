import dynamic from 'next/dynamic';
import classNames from 'utils/classNames';

const DynamicComponent = dynamic(() =>
  import('react-date-countdown-timer'),
  { ssr: false },
  
)

;

interface Props {
  className?:string
}
const DateCountDown = ({className=''}:Props) => {
  return (<>   
    <div className={classNames(className, ' p-3 md:-mt-8 rounded-md md:bg-white')}> 
    <DynamicComponent dateTo="January 01, 2023 00:00:00 GMT+03:00"  style = {{
      border:"1px solid"
    }} />
    </div>
  </>)
}


export default DateCountDown

