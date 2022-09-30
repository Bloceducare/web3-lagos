import Image from "next/image";
const Card = ()=>(<>

<div className="rounded-md relative mt-10">
    <div className="">
        <img src='/event-photo-1.jpg' alt="event" className="w-full h-60 border-0 object-cover rounded-md" />


    </div>
        <div className="absolute bg-gradient-to-l from-neutral-400 to-transparent -bottom-8  rounded-b-md w-full pt-2" >
            <div className="px-4 mb-">
          <p>Isaac ijuo</p>
          <p className="text-sm">Attorney and Smart Contract Dev</p>
            </div>
          <div className="w-full bg-black h-8 rounded-b-md"></div>
        </div>
      </div>

</>)
const SpeakersCards = () => {

    // create new Array
    
    const speakers = new Array(6).fill(0).map((_, i) => <Card />);
    
    return (
        <>
<div className="speakers-section max-w-6xl mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {speakers}

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