import { schedule } from "data";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { IScheduleItem } from "types";


const SheduleItem = ({time, speaker, topic}:IScheduleItem)=>{
 
  return (
    <div className="content">
    <div className="individualEvent1">
      <div className="time">
        <p>{time}
        </p>
      </div>
      <div className="title">
        <p>
          {topic}
        </p>
      </div>
    </div>
    <div className="presenter">
     {!!speaker &&  <p className="nameTitle">by: <span className="name">
       {speaker}
        </span></p>}
    </div>
  </div>
  )
}

const Schedule = () => {
 
  
    const thur = schedule.thur.item.map((item)=> <SheduleItem {...item} />)
    const fri = schedule.fri.item.map((item)=> <SheduleItem {...item} />)
    const sat = schedule.sat.item.map((item)=> <SheduleItem {...item} />)


    return (
        <>

<div className="max-w-6xl mx-auto mt-16 ">
  <div className="mx-4">

<h3 className="text-3xl text-white">Outline of Event</h3>
<Tabs>
    <TabList>
      <Tab>{schedule.thur.title}</Tab>
      <Tab>
        {schedule.fri.title}
      </Tab>
      <Tab>
        {schedule.sat.title}
      </Tab>
    </TabList>

    <TabPanel>
    <div className="events" id="thursday">
    {thur}
  </div>
    </TabPanel>
    <TabPanel>
  {fri}
    </TabPanel>
    <TabPanel>
   {sat}
    </TabPanel>
  </Tabs>
  </div>
  </div>




        </>
    )
}


export default Schedule