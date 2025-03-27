import * as bcrypt from 'bcrypt'

export const createHash = (data: string,
    salt_round: number = +process.env.SALT_ROUND!) : string => {
    return bcrypt.hashSync(data, salt_round)
}

export const verifyHash = (data : string, hash : string) : boolean=>{
    return bcrypt.compareSync(data, hash)
}