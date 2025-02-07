'use server'

import { Prisma, PrismaClient } from '@prisma/client'



import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function searchUsers(query: string) {
    return await prisma.user.findMany({
        where: {
            name: { startsWith: query, mode: 'insensitive' }
        }
    })
}

export async function addUser(data: Parameters<typeof prisma.user.create>[0]['data']) {
    return await prisma.user.create({ data })
}


export async function deleteUser(id: string) {
    await prisma.user.delete({
        where: { id }
    })
    revalidatePath('/')
}

export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
    return await prisma.user.update({
        where: { id },
        data
    })
}

export const getUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id }
    })
}
