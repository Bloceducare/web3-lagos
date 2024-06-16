import React from "react";

function Contact() {
  return (
    // <div className="w-[70%] h-[371px]  mx-auto justify-center">
    //       <div className="bg-[#3e5f75] bx rounded-lg">
    //         <div className="flex items-center justify-between p-24">
    //           <div>
    //             <h2 className="text-[40px] leading-[48px] text-white font-[700]">Enquiries/Details</h2>
    //             <p className="text-white text-[24px] leading-[31px]">
    //               Contact <a href="mailto:event@web3bridge.com">event@web3bridge</a> <span>or<br/></span>{" "}
    //               <a href="mailto:ayodeji@web3bridge.com">ayodeji@web3bridge</a>
    //             </p>
    //           </div>
    //           <div>
    //             <button className="text-white cta py-2 rounded-lg text-[30px] leading-[36px] font-[700] px-4">Get in touch</button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    <div className="w-full mx-auto flex items-center justify-center">
      <div className="max-w-screen-lg w-full p-2 md:p-8 lg:p-8">
        <div className="bg-[#3e5f75] bx flex items-center justify-between rounded-lg p-8">
          <div>
            <h2 className="text-3xl lg:text-4xl text-white font-semibold mb-4">
              Enquiries/Details
            </h2>

            <p className="text-white text-lg lg:text-xl mb-8">
              Contact{" "}
              <a href="mailto:event@web3bridge.com" className="underline">
                event@web3bridge.com
              </a>{" "}
              or{" "}
              <a href="mailto:ayodeji@web3bridge.com" className="underline">
                ayodeji@web3bridge.com
              </a>
            </p>
          </div>
          <div>
            <button className="bg-white text-[#3e5f75] cta py-0 md:py-3 lg:py-3 px-2 md:px-8 lg:px-8 rounded-lg text-base md:text-lg lg:text-xl font-semibold">
              Get in touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
