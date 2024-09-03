import React, { useState } from "react";
import { schedule } from "@/data";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { IScheduleItem } from "@/types";

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
  const [hallIndex, setHallIndex] = useState(0); // 0 for Hall1, 1 for Hall2

  const thurHall1 = schedule.thur.hall1.item.map((item, i) => (
    <SheduleItem key={i} {...item} />
  ));
  const thurHall2 = schedule.thur.hall2.item.map((item, i) => (
    <SheduleItem key={i} {...item} />
  ));
  const friHall1 = schedule.fri.hall1.item.map((item, i) => (
    <SheduleItem key={i} {...item} />
  ));
  const friHall2 = schedule.fri.hall2.item.map((item, i) => (
    <SheduleItem key={i} {...item} />
  ));
  const sathall1 = schedule.sat.hall1.item.map((item, i) => (
    <SheduleItem key={i} {...item} />
  ));
  const sathall2 = schedule.sat.hall2.item.map((item, i) => <SheduleItem key={i} {...item} />);

  return (
    <>
      <div className="max-w-6xl mx-auto mt-16 ">
        <div className="mx-4">
          <h3 className="text-3xl text-white">Outline of Event</h3>
          <Tabs>
            <TabList>
              <Tab>{schedule.thur.title} - Hall 1</Tab>
              <Tab>{schedule.thur.title} - Hall 2</Tab>
              <Tab>{schedule.fri.title} - Hall 1</Tab>
              <Tab>{schedule.fri.title} - Hall 2</Tab>
              <Tab>{schedule.sat.title} - Hall 1</Tab>
              <Tab>{schedule.sat.title} - Hall 2</Tab>
            </TabList>

            <TabPanel>
              {hallIndex === 0 ? (
                <div className="events" id="thursday">
                  {thurHall1}
                </div>
              ) : (
                <div className="events" id="thursday">
                  {thurHall2}
                </div>
              )}
            </TabPanel>
            <TabPanel>
              {hallIndex === 0 ? (
                <div className="events" id="thursday">
                  {thurHall2}
                </div>
              ) : (
                <div className="events" id="thursday">
                  {thurHall1}
                </div>
              )}
            </TabPanel>
            <TabPanel>{hallIndex === 0 ? friHall1 : friHall2}</TabPanel>
            <TabPanel>{hallIndex === 0 ? friHall2 : friHall1}</TabPanel>
            <TabPanel>{hallIndex === 0 ? sathall1 : sathall2}</TabPanel>
            <TabPanel>{hallIndex === 0 ? sathall2 : sathall1}</TabPanel>
          </Tabs>
          {/* <div className="text-white mt-4">
            Toggle between halls: */}
            {/* <button
              onClick={() => setHallIndex(0)}
              className={`mx-2 ${
                hallIndex === 0 ? "text-blue-500" : "text-gray-500"
              }`}
            >
              Hall 1
            </button> */}
            {/* <button
              onClick={() => setHallIndex(1)}
              className={`mx-2 ${
                hallIndex === 1 ? "text-blue-500" : "text-gray-500"
              }`}
            >
              Hall 2
            </button> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Schedule;

