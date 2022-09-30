import { useState } from "react"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


const Schedule = () => {
    const [current, setCurrent] = useState(0)

    const handleCurrent =(id:number)=>{
        setCurrent(id)
    }
    return (
        <>

<div className="max-w-6xl mx-auto mt-16 ">
  <div className="mx-4">

<h3 className="text-3xl text-white">Outline of Event</h3>
<Tabs>
    <TabList>
      <Tab>Thursday</Tab>
      <Tab>Friday</Tab>
      <Tab>Saturday</Tab>
    </TabList>

    <TabPanel>
    <div className="events" id="thursday">
    <div className="individualEvent">
      <div className="time">
        <p>09:00 - 10:00 AM</p>
      </div>
      <div className="title">
        <p>Arrival &amp; Registration</p>
      </div>
    </div>
    <div className="individualEvent">
      <div className="time">
        <p>10:00 - 10:15 AM</p>
      </div>
      <div className="title">
        <p>Welcome address</p>
      </div>
    </div>
    <div className="individualEvent">
      <div className="time">
        <p>10:15 - 10:30 AM</p>
      </div>
      <div className="title">
        <p>Introductions</p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>10:30 - 11:00AM
          </p>
        </div>
        <div className="title">
          <p>Workshop 1: Web3 is Web2: Understanding the architecture of web3 apps</p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Trust Onyekwere</span></p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>11:05 - 11:30AM
          </p>
        </div>
        <div className="title">
          <p>DAOs: Possibilities and Opportunities</p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Israel Rex</span></p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>11:30AM- 12:00PM</p>
        </div>
        <div className="title">
          <p>The Web3 Stack</p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Idris Olubis</span></p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>12:00 - 12:45PM
          </p>
        </div>
        <div className="title">
          <p>Understanding the Starknet Ecosystem</p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">N. Darlington</span></p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>12:45 - 1:30PM
          </p>
        </div>
        <div className="title">
          <p>Building Polylithic and Upgradable contract with the diamond standard</p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Temitayo Daniel</span></p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>1:30 - 2:00PM
          </p>
        </div>
        <div className="title">
          <p>Ethereum Merge: What it is, what went into it!</p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Tim Beiko</span></p>
      </div>
    </div>
    <div className="individualEvent">
      <div className="time">
        <p>2:00 - 2:30PM
        </p>
      </div>
      <div className="title">
        <p>Pillow Fund workshop</p>
      </div>
    </div>
    <div className="individualEvent">
      <div className="time">
        <p>2:30 - 3:15PM
        </p>
      </div>
      <div className="title">
        <p>AMA for speakers</p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>3:00 - 3:30PM</p>
        </div>
        <div className="title">
          <p> Closing</p>
        </div>
      </div>
    </div>
  </div>
    </TabPanel>
    <TabPanel>
    <div>
    <div className="individualEvent">
      <div className="time">
        <p>09:00 - 10:00 AM</p>
      </div>
      <div className="title">
        <p>Arrival &amp; Registration</p>
      </div>
    </div>
    <div className="individualEvent">
      <div className="time">
        <p>10:00 - 10:15 AM</p>
      </div>
      <div className="title">
        <p>Welcome address</p>
      </div>
    </div>
    <div className="individualEvent">
      <div className="time">
        <p>10:15 - 10:30 AM</p>
      </div>
      <div className="title">
        <p>Introductions</p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>10:30 - 11:00AM
          </p>
        </div>
        <div className="title">
          <p>Building customized token on Binance Smart chain</p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Adesanya Joshua Ayodeji</span></p>
      </div>
    </div>
    <div className="individualEvent">
      <div className="time">
        <p>11:05 - 11:30AM
        </p>
      </div>
      <div className="title">
        <p>Polygon Workshop</p>
      </div>
    </div>
    <div className="individualEvent">
      <div className="time">
        <p>11:30AM- 12:15PM</p>
      </div>
      <div className="title">
        <p>Developing your career practical in Web3</p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>12:15 - 1:00PM
          </p>
        </div>
        <div className="title">
          <p>Understanding Crypto trading and making profit</p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Tunmise Olaoluwa</span></p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>1:00 - 1:20PM
          </p>
        </div>
        <div className="title">
          <p>Lending and Burrowing</p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Raymond Abiola</span></p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>1:20 - 2:00PM
          </p>
        </div>
        <div className="title">
          <p>Starting, Building and Growing a community</p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Michael Jerry</span></p>
      </div>
    </div>
    <div className="individualEvent">
      <div className="time">
        <p>2:00 - 3:00PM
        </p>
      </div>
      <div className="title">
        <p>Break out sessions</p>
      </div>
    </div>
    <div className="individualEvent">
      <div className="time">
        <p>3:00 - 3:30PM</p>
      </div>
      <div className="title">
        <p> Closing</p>
      </div>
    </div>
  </div>
    </TabPanel>
    <TabPanel>
    <div>
    <div className="individualEvent">
      <div className="time">
        <p>09:00 - 09:30 AM</p>
      </div>
      <div className="title">
        <p>Arrival &amp; Registration</p>
      </div>
    </div>
    <div className="individualEvent">
      <div className="time">
        <p>09:30 - 09:45 AM</p>
      </div>
      <div className="title">
        <p>Welcome address</p>
      </div>
    </div>
    <div className="individualEvent">
      <div className="time">
        <p>09:45 - 10:00 AM</p>
      </div>
      <div className="title">
        <p>Introductions</p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>10:00 - 10:15AM
          </p>
        </div>
        <div className="title">
          <p>New Digital Order: Legal Frameworks, Risks and Pitfalls
          </p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Isaac Ijuo</span></p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>10:15 - 10:30 AM
          </p>
        </div>
        <div className="title">
          <p>-</p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Adedeji Owonibi</span></p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>10:30 - 10:45AM</p>
        </div>
        <div className="title">
          <p> Opportunities for Africans in the Web3 Marketing space
          </p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Tutu Adetunmbi</span></p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>10:45 - 10:55AM
          </p>
        </div>
        <div className="title">
          <p>Promise of Web3</p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Adamu Bello</span></p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>10:55AM- 11:05AM
          </p>
        </div>
        <div className="title">
          <p>Polygon Keynote</p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name"> Ayomide Shodipo</span></p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>11:05 - 11:35 AM
          </p>
        </div>
        <div className="title">
          <p>Ethereum Merge: Keynote</p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">  Justin Drake</span></p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>11:35- 11:40AM
          </p>
        </div>
        <div className="title">
          <p>Beauty of Blockchain </p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Pius Paul</span></p>
      </div>
    </div>
    <div className="individualEvent">
      <div className="time">
        <p>11:40 - 11:50AM
        </p>
      </div>
      <div className="title">
        <p>Pillow fund</p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>11:50 - 12:30PM
          </p>
        </div>
        <div className="title">
          <p>Panel Session: Panel: Role of blockchain campus clubs in increasing community onboarding </p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Campus reps from seven (7) universities</span></p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>12:30 - 12:50PM
          </p>
        </div>
        <div className="title">
          <p>Panel Session: Cryptocurrency regualtion in Nigeria</p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name"> Senator Ihenyen</span></p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>12:50 - 1:30PM
          </p>
        </div>
        <div className="title">
          <p>Panel Session: Panel: Through the Lens, the present and prospects of Nigeria's developers ecosystem </p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Mayowa, Jude &amp; Lucky</span></p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>1:30 - 1:40PM
          </p>
        </div>
        <div className="title">
          <p>Insight into Web3 Ladies </p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Oluchi Enebeli</span></p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>1:40 - 1:50PM
          </p>
        </div>
        <div className="title">
          <p>Understanding the Starknet Ecosystem </p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Starknet Representative</span></p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>1:50 - 2:00PM
          </p>
        </div>
        <div className="title">
          <p>The Consensus Mechanism </p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Claire Charles</span></p>
      </div>
    </div>
    <div className="individualEvent">
      <div className="time">
        <p>2:00 - 2:15PM</p>
      </div>
      <div className="title">
        <p> Break </p>
      </div>
    </div>
    <div className="content">
      <div className="individualEvent1">
        <div className="time">
          <p>2:15 - 3:00PM
          </p>
        </div>
        <div className="title">
          <p>Power Law Careers </p>
        </div>
      </div>
      <div className="presenter">
        <p className="nameTitle">by: <span className="name">Olumide Aderinwale</span></p>
      </div>
    </div>
    <div className="individualEvent">
      <div className="time">
        <p>3:00 - 3:30PM</p>
      </div>
      <div className="title">
        <p> Web3bridge anniversary Documentary</p>
      </div>
    </div>
    <div className="individualEvent">
      <div className="time">
        <p>3:00 - 3:30PM</p>
      </div>
      <div className="title">
        <p>Web3bridge AMA &amp; Closing </p>
      </div>
    </div>
  </div>
    </TabPanel>
  </Tabs>
  </div>
  </div>




        </>
    )
}


export default Schedule