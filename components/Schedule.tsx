import { schedule } from "data";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { IScheduleItem } from "types";


const Schedule = () => { 
 
  return ( <>

  <div className=" bg-cover h-[calc(90vh-20rem)]  md:h-[calc(140vh-20rem)] bg-[url('../images/moreOfUs.png')]">
    <div>
      <p className="absolute mt-10 ml-10 md:mt-60">
        <h2 className="text-3xl text-white md:text-7xl ">Our</h2>
        <h2 className="text-2xl text-white mt-2 md:text-4xl"><b>Success Story;</b></h2>
        <p className="text-sm text-white md:text-base ">Check gallery</p>
        <p className="text-sm text-white md:text-base">from our last event</p>
      </p>
    </div>
  </div>

  

  <div className="bg-[#17a2b8] bg-contain pb-10">
    <div>
    <div className="flex  items-center justify-center text-center mt-10">
    <p className="text-white text-2xl">Order of <b>Event</b></p>
  </div>
  <div className="flex  mt-10 items-center justify-center text-center gap-20 p-4 md:gap-80">
  <p className="border px-8 py-2 pb-2 md:px-5 lg:px-10 rounded-full bg-white">
  <button className= "px-3.5 sm:px-12 md:px-16"><span className="items-center">day 1</span></button>
  <button className="px-12 sm:px-28 md:px-36 border-l border-black border-r"><span>day 1</span></button>
  <button className="px-3.5 sm:px-12 md:px-16"><span>day 3</span></button>
  </p>
  </div>
  <div>
    <div className="max-w-auto">
      <p className="flex gap-5 justify-center lg:gap-20 md:items-center mt-5"><span className="ml-2  mt-5 bg-white border text-center  px-4  sm:pr-5   md:px-12 py-4 pb-4 rounded-full">10:00am - 11:00am</span> <span className="bg-white border  mt-5 px-4 sm:ml-5 md:px-12 py-4 md:pb-7   rounded-full">hshh bayyqoj xbthj ksgsty jajsg sgcbjskk sshg gffa guh  s y</span></p>
      <p className="flex gap-5 justify-center lg:gap-20 md:items-center mt-5"><span className="ml-2  mt-5 bg-white border text-center  px-4  sm:pr-5   md:px-12 py-4 pb-4 rounded-full">10:00am - 11:00am</span> <span className="bg-white border  mt-5 px-4 sm:ml-5 md:px-12 py-4 md:pb-7   rounded-full">hshh bayyqoj xbthj ksgsty jajsg sgcbjskk sshg gffa guh  s y</span></p>
      <p className="flex gap-5 justify-center lg:gap-20 md:items-center mt-5"><span className="ml-2  mt-5 bg-white border text-center  px-4  sm:pr-5   md:px-12 py-4 pb-4 rounded-full">10:00am - 11:00am</span> <span className="bg-white border  mt-5 px-4 sm:ml-5 md:px-12 py-4 md:pb-7   rounded-full">hshh bayyqoj xbthj ksgsty jajsg sgcbjskk sshg gffa guh  s y</span></p>
      <p className="flex gap-5 justify-center lg:gap-20 md:items-center mt-5"><span className="ml-2  mt-5 bg-white border text-center  px-4  sm:pr-5   md:px-12 py-4 pb-4 rounded-full">10:00am - 11:00am</span> <span className="bg-white border  mt-5 px-4 sm:ml-5 md:px-12 py-4 md:pb-7   rounded-full">hshh bayyqoj xbthj ksgsty jajsg sgcbjskk sshg gffa guh  s y</span></p>
      <p className="flex gap-5 justify-center lg:gap-20 md:items-center mt-5"><span className="ml-2  mt-5 bg-white border text-center  px-4  sm:pr-5   md:px-12 py-4 pb-4 rounded-full">10:00am - 11:00am</span> <span className="bg-white border  mt-5 px-4 sm:ml-5 md:px-12 py-4 md:pb-7   rounded-full">hshh bayyqoj xbthj ksgsty jajsg sgcbjskk sshg gffa guh  s y</span></p>
      <p className="flex gap-5 justify-center lg:gap-20 md:items-center mt-5"><span className="ml-2  mt-5 bg-white border text-center  px-4  sm:pr-5   md:px-12 py-4 pb-4 rounded-full">10:00am - 11:00am</span> <span className="bg-white border  mt-5 px-4 sm:ml-5 md:px-12 py-4 md:pb-7   rounded-full">hshh bayyqoj xbthj ksgsty jajsg sgcbjskk sshg gffa guh  s y</span></p>

    </div>
  </div>
    </div>
  </div>


















































    {/* // <div className="content">
    // <div className="individualEvent1">
      // {/* <div className="time">
      //   <p>{time}
      //   </p>
      // </div> */}
      // {/* <div className="title">
      //   <p>
      //     {topic}
      //   </p>
      // </div>
    // </div> */}
    {/* <div className="presenter">
     {!!speaker &&  <p className="nameTitle">by: <span className="name">
       {speaker}
        </span></p>}
//     </div> */}
//   {/* </div>
//   )
// } */} 
</>
  )
}

// const Schedule = () => {
 
  
//     const thur = schedule.thur.item.map((item)=> <SheduleItem {...item} />)
//     const fri = schedule.fri.item.map((item)=> <SheduleItem {...item} />)
//     const sat = schedule.sat.item.map((item)=> <SheduleItem {...item} />)


//     return (
//         <>

// <div className="max-w-6xl mx-auto mt-16 ">
//   <div className="mx-4">

// {/* <h3 className="text-3xl text-">Outline of Event</h3>
// <Tabs>
//     <TabList>
//       <Tab>{schedule.thur.title}</Tab>
//       <Tab>
//         {schedule.fri.title}
//       </Tab>
//       <Tab>
//         {schedule.sat.title}
//       </Tab>
//     </TabList> */}

  //   <TabPanel>
  //   <div className="events" id="thursday">
  //   {thur}
  // </div>
  //   </TabPanel>
  //   <TabPanel>
  // {fri}
  //   </TabPanel>
  //   <TabPanel>
  //  {sat}
  //   </TabPanel>
  // </Tabs>
  // </div>
  // </div>




//         </>
//     )
// }


export default Schedule