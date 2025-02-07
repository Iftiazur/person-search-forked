'use server'

import { PrismaClient, Prisma } from '@prisma/client'


const prisma = new PrismaClient()

//  Search users by name (case-insensitive)
export async function searchUsers(query: string) {
    return await prisma.user.findMany({
        where: {
            name: { startsWith: query, mode: 'insensitive' }
        }
    })
}

// Create user with better validation
export async function addUser(data: { name: string; email: string; phoneNumber: string }) {
    try {
        const user = await prisma.user.create({
            data: {
                id: crypto.randomUUID(), //  Ensure UUID is generated
                ...data,
            }
        })
        return user
    } catch (error) {
        console.error('Error adding user:', error)
        throw new Error('Failed to add user')
    }
}

// Delete user safely with error handling

export async function deleteUser(id: string) {
    try {
        await prisma.user.delete({
            where: { id }
        });
    } catch (error) {
        console.error(`Failed to delete user with id: ${id}`, error);
        throw new Error('User not found');
    }
}


// Update user safely with validation
export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data
        })
        return updatedUser
    } catch (error) {
        console.error(`Failed to update user with id: ${id}`, error)
        throw new Error('User update failed')
    }
}

//Get user by ID safely
export async function getUserById(id: string) {
    const user = await prisma.user.findUnique({
        where: { id }
    })
    if (!user) {
        throw new Error('User not found')
    }
    return user
}
