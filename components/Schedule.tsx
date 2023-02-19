import { schedule } from "data";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { IScheduleItem } from "types";

const SheduleItem = ({ time, speaker, topic }: IScheduleItem) => {
  return (
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>{time}</p>
        </div>
        <div className="title">
          <p>{topic}</p>
        </div>
      </div>
      <div className="presenter">
        {!!speaker && (
          <p className="nameTitle">
            by: <span className="name">{speaker}</span>
          </p>
        )}
      </div>
    </div>
  );
};

const Schedule = () => {
  const thur = schedule.thur.item.map((item) => <SheduleItem {...item} />);
  const fri = schedule.fri.item.map((item) => <SheduleItem {...item} />);
  const sat = schedule.sat.item.map((item) => <SheduleItem {...item} />);

  return (
    <>
      <div className="bg-[#122C47] ">
        <div className="relative bg-top bg-no-repeat bg-[url('../images/moreOfUs.png')] h-[calc(100vh-4rem)] ">
          <div className="bg-transparent absolute top-[240px] ml-16 text-white w-[450px]">
            <div className="text-6xl font-bold leading-[90px]">
              <h2>Our</h2>
              <h2>Success Story;</h2>
            </div>
            <div className="flex gap-4 mt-7 items-center">
              <div className="bg-white rounded-full text-black flex items-center justify-center w-16 h-16">
                icon
              </div>
              <div className="text-3xl ">
                <p>Check gallery</p>
                <p>from our last event</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto w-[1340px]">
          <div className="mx-4">
            <h3 className="text-3xl text-white text-center pt-36 pb-16">
              Order of Event
            </h3>
            <Tabs>
              <TabList>
                <Tab>{schedule.thur.title}</Tab>
                <Tab>{schedule.fri.title}</Tab>
                <Tab>{schedule.sat.title}</Tab>
              </TabList>

              <TabPanel>
                <div className="events" id="thursday">
                  {thur}
                </div>
              </TabPanel>
              <TabPanel>{fri}</TabPanel>
              <TabPanel>{sat}</TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;

// const Schedule = () => {
//   const thur = schedule.thur.item.map((item) => <SheduleItem {...item} />);
//   const fri = schedule.fri.item.map((item) => <SheduleItem {...item} />);
//   const sat = schedule.sat.item.map((item) => <SheduleItem {...item} />);

//   return (
//     <>

//       <div className="max-w-6xl mx-auto mt-16 ">
//         <div className="mx-4">
//           <h3 className="text-3xl text-white">Outline of Event</h3>
//           <Tabs>
//             <TabList>
//               <Tab>{schedule.thur.title}</Tab>
//               <Tab>{schedule.fri.title}</Tab>
//               <Tab>{schedule.sat.title}</Tab>
//             </TabList>

//             <TabPanel>
//               <div className="events" id="thursday">
//                 {thur}
//               </div>
//             </TabPanel>
//             <TabPanel>{fri}</TabPanel>
//             <TabPanel>{sat}</TabPanel>
//           </Tabs>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Schedule;
