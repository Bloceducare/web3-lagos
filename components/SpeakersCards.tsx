import { blurUrl, speakersImg } from "data";
import Image from "next/image";


const Card = ({src=''})=>(<> 

<div className="relative mt-10 rounded-md ">
    <div className="">
    <Image src={src}
     placeholder="blur"
    blurDataURL={blurUrl}
     width={300} height={300}
      alt="sponsor" />
    </div>
       
      </div>

</>)
const SpeakersCards = () => {
    
    const speakers =speakersImg.map((speaker, i) => <Card src={speaker} />);
    
    return (
        <>
<div className="max-w-6xl mx-auto speakers-section">
<div className="mx-4"> 
<h3 className="text-3xl text-white">Speakers</h3>
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
  {speakers}
</div>
  </div>
</div>


        </>
    )
}


export default SpeakersCards