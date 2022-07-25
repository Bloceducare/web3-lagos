

const classNames = ( classes:string='', defaultClass:string='',):string=>{
    const formDefault = defaultClass.split(" ")
    const formClasses = classes.split(",")
    return [ ...formDefault,...formClasses].join(" ")
}

export default classNames


