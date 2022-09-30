import Image from "next/image"

const DetailsCard = () => {
    return (
        <>
<div className="max-w-6xl py-16 mx-auto ">
<div className="mx-4">
 
  <div className="cards">
    <div className="first-column">
      <div className="top-section">
        <div className="icon">
        <Image
              src="/developer-exp.svg"
              width="50"
              height="50"
              layout="fixed"
              objectFit="cover"
        />
       
        </div>
        <h3>Our Goal</h3>
        <p>
          To organize one of the Largest Blockchain developers and
          Ethereum builders conference in the heart of Africa tech.
        </p>
      </div>
      <div className="bottom-section">
        <div className="icon">

        <Image
              src="/success-story.svg"
              width="50"
              height="50"
              layout="fixed"
              objectFit="cover"
        />
        
        </div>
        <h3>Our Success Story</h3>
        <p>
          Web3Bridge's mission is to identify Web3 passions, train them in a collaborative and 
          supportive remote environment and create an African Web3 Community. We have over the years  
          executed this mission through our learning series called “COHORT” from edition 1 to edition 7 
          and with more than 2000 trained on Web2 &amp; Web3 Blockchain development for free with access to 
          accommodation, feeding and internet access at our learning facility in Lagos.
        </p>
        <p>
          An initiative that started as 500 Nigerian Developers for Ethereum with results has scaled into an 
          organization that has contributed to growth, development of leading Blockchain projects including Hydro, 
          Nahmii and many others and have exposed not less than 10,000 Africans to Web3 and its wealth of opportunities 
          through educational and extended learning series.
        </p>
      </div>
    </div>
    <div className="second-column">
      <div className="text">
        <div className="icon">
        <Image
              src="/eth-img.svg"
              width="50"
              height="50"
              layout="fixed"
              objectFit="cover"
        />

        </div>
        <h3>Event Overview</h3>
        <p>
          Web3 Lagos Conference is a 3-day event kickstarting with a hackathon and several other events including; 
          workshop, networking, career fair, panel session, talks, main event, etc.
        </p>
        <p>
          With an expected attendance of 5000 participants physically and virtually, 
          this event will focus on helping developers and other none developer blockchain enthusiasts 
          realize the endless possibilities and opportunities of the Blockchain &amp; Ethereum ecosystem.
        </p>
        <p>
          Beyond celebrating three years of contributions to the Blockchain and Web3 space in Africa and 
          international scenes, one of our core beliefs is that repeated interactions will contribute resourcefully 
          to career growth. We are bringing together the best, value-driven industry thought leaders and speakers.
        </p>
      </div>
      <div className="image">
      <Image
              src="/event-photo-1.jpg"
              width="100%"
              height="70%"
              layout="responsive"
              objectFit="cover"
            />
            
        {/* <img src="./images/kobby-mendez-d0oYF8hm4GI-unsplash.jpg" alt="img" /> */}
      </div>
    </div>
  </div>
  </div>
</div>

        </>
    )
}

export default DetailsCard