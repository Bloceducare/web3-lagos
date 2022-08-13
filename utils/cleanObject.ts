export function format(str:string){
    return str.split('').map((letter, idx) => {
        if(idx==0){
          letter = letter.toUpperCase()  
        }
      return letter.toUpperCase() === letter
       ? `${idx === 0 ? '' : ' '} ${letter.toUpperCase()}`
       : letter;
    }).join('');
}

function clean(obj:any) {
    Object.keys(obj).forEach(key => {
       
        if (obj[key] === '') {
          delete obj[key];
        }
      });
    
      const {SN, __v, updatedAt, createdAt, _id, ...others} = obj
    return others
  }

export default clean