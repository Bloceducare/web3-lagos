import Image from "next/image";
const Card = ()=>(<>

<div className="relative mt-10 rounded-md ">
    <div className="">
        <img src='/event-photo-1.jpg' alt="event" className="object-cover w-full border-0 rounded-t-md h-60" />


    </div>
        <div className= "absolute w-full pt-2 text-white -bottom-8 rounded-b-md" >
            <div className="px-4 mb-">
          <p>Isaac ijuo</p>
          <p className="text-sm">Attorney and Smart Contract Dev</p>
            </div>
          <div className="w-full h-8 bg-black-[#1313136d] img-box-shadow rounded-b-md"
          style={{
            backgroundColor:"#131313d3"
          }}></div>
        </div>
      </div>

</>)
const SpeakersCards = () => {

    // create new Array
    
    const speakers = new Array(6).fill(0).map((_, i) => <Card />);
    
    return (
        <>
<div className="max-w-6xl mx-auto speakers-section">
<div className="mx-4">
  
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
  {speakers}

</div>
  </div>

  {/* <div className="speakers">
    <h3>Speakers</h3>
    <div className="images-speakers">
        {speakers}
    </div>
  </div> */}
</div>


        </>
    )
}


export default SpeakersCards