import slugify from "slugify"


export const _slugify = (name : string)=>{
    return slugify(name, {lower : true, trim : true, replacement : '-'})
}