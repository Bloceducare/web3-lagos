import QRCode from "qrcode";

    // event name
// attendee name
// role
// dates to be attended

var options = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    quality: 0.3,
    margin: 1,
    color: {
      dark:"#010599FF",
      light:"#FFBF60FF"
    }
  }


  const callBackAsync = (...args:any)=>{
    
    return new Promise((res, rej)=>{
        QRCode.toDataURL(args, (err, url)=>{
            if(err) rej(err)
            res(url)
        })
    })
  }


const generateQR =  async (text:any, opts = options) => {

 const url  =  await callBackAsync(text, opts)
    return url

}

export default generateQR