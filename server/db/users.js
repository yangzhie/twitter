import { prisma } from "."
import bcrypt from "bcrypt"

export const createUser = (userData) => {
    // for hashing
    const passwordHashedUserData = {
        // spreading to preserve original properties, only overwriting password
        ...userData,
        password: bcrypt.hashSync(userData.password, 10)
    }

    // creating user in Prisma
    return prisma.user.create({
        data: passwordHashedUserData
    })
}

export const getUserByUsername = (username) => {
    return prisma.user.findUnique({
        where: {
            username: username
        }
    })
}

export const getUserById = (id) => {
    return prisma.user.findUnique({
        where: {
            id: id
        }
    });
}