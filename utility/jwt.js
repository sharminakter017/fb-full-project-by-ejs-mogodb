import jwt from 'jsonwebtoken'

export const createToken = (payLoad, exp = 86400000) => {

    const token = jwt.sign(payLoad,process.env.SECRET_KEY, {
        expiresIn : exp
    })

    return token
}




