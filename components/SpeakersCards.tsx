import Image from "next/image";

const imageArr=['/isaac.svg', '/justin.svg', 'tutu.svg', 'lanre.svg']
const Card = ({src=''})=>(<> 

<div className="relative mt-10 rounded-md ">
    <div className="">
        <img src={src} alt="event" className=" w-full border-0 rounded-t-md" />


    </div>
       
      </div>

</>)
const SpeakersCards = () => {

    // create new Array
    
    const speakers = imageArr.map((speaker, i) => <Card src={speaker} />);
    
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