

const AboveFold=()=>{
    return (<>

    <div className="flex items-center justify-center text-center text-white h-[calc(100vh-10rem)]">
        <div className="max-w-lg mx-auto mt-10">
          <p className="text-6xl " style={{
            lineHeight:"4rem"
          }}> Web3  <span className=" font-bold">Lagos Conference 2022</span></p>
          <p className="mt-6 text-xl my-16" >Join the largest Web3 conference in Lagos Nigeria, where stake holders, industry
            experts,
            software developers
            are
            coming together to network and discuss about web3 ecosystem</p>
        <div className="mt-6 flex justify-center text-xl mb-8" >
          <div>
          <button className="p-2 bg-red-500 mr-1 px-8 rounded-sm">Register</button>
            </div>
          <div>
          <button className="p-2 bg-red-400 ml-1">Register</button>
            </div>
        </div>

        <div>
          <p className="text-capitalize  text-2xl">October 6-8 </p>
        </div>
        </div>


    </div>
  <div className="header text-white hero">
          <p className="intro-heading">Web3 <span><b>Lagos Conference 2022</b></span></p>
          <p className="intro-text">Join the largest Web3 conference in Lagos Nigeria, where stake holders, industry
            experts,
            software developers
            are
            coming together to network and discuss about web3 ecosystem</p>
          <div className="call-to-register">
            <button className="register">Register</button>
            <a href="#apply-section" className="sponsored-by">Sponsored by <i className="bi bi-arrow-down" style={{color: '#B91C1C'}} /></a>
          </div>
          <h3 className="date">OCTOBER 6-8TH</h3>
          <div id="stadium ">
            <div className="event-cover">
              <div id="event">
                <div className="event">
                  <p className="event-item">Venue <i className="bi bi-send-fill" /></p>
                  <h3 className="event-details">Funplex Resort, Magodo, Lagos.</h3>
                </div>
                <div className="event">
                  <p className="event-item">Attendees <i className="bi bi-people-fill" /></p>
                  <h3 className="event-details">878</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="timer">
          <div className="count-down day">09 days</div>
          <div className="count-down hours">17 hours</div>
          <div className="count-down minutes">58 minutes</div>
          <div className="count-down secconds">60 seconds</div>
        </div>
        <div className="section-cover">
          <div id="apply-section">
            <div className="apply-section-container">
              <h1 className="apply-text"><span style={{color: '#122B47'}}>Apply &amp;</span> Join the Conversation</h1>
              <div className="apply-buttons">
                <button className="volunteer-button">Apply as a Volunteer</button>
                <button className="sponsor-button">Apply as a Sponsor</button>
              </div>
              <div>
                <h2 className="sponsor-names">headline Sponsor</h2>
                <img className="eth" src="images/eth.png" alt="Eth" />
              </div>
              <hr />
              <div>
                <h3 className="sponsor-names">Silver Sponsor</h3>
                <img src="images/wknd.png" alt="Wakanda" />
                <p className="logo-name">Wakanda Inu</p>
              </div>
              <hr />
              <div>
                <h3 className="partner-names">Media Partners</h3>
                <img src="images/wknd.png" alt="Wakanda" />
                <p className="logo-name">Wakanda Inu</p>
              </div>
              <hr />
              <div>
                <h3 className="partner-names">Community Partners</h3>
                <img src="./wknd.png" alt="Wakanda" />
                <p className="logo-name">Wakanda Inu</p>
              </div>
            </div>
          </div>
        </div>

    </>)
}


export default AboveFold