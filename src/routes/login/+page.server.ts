import { prisma } from '$lib';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import crypto from 'node:crypto';

const expirationTime = 30 * 3600 * 24;

function hash(original:string) : {salt:string, hash:string}{
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.pbkdf2Sync(original, salt, 1000, 64, 'sha256').toString('base64');
    return {salt,hash};
}

function validate(original:string, salt:string, storedHash:string) : boolean{
    const hash = crypto.pbkdf2Sync(original, salt, 1000, 64, 'sha256').toString('base64');
    return hash == storedHash;
}

function getExpirationDate(){
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 1);
    return expirationDate;
}

export const load = (async ({cookies}) => {
    // Check if user is already logged in
    const tokenId = cookies.get('authToken');

    // Check if user has an authToken ID saved
    if(tokenId){
        const token = await prisma.authToken.findUnique({
            where: {
                id: tokenId
            }
        });

        // Check so its a valid authToken
        if(token){
            // Check if authToken has expired
            if(new Date() > new Date(token.expires)){
                await prisma.authToken.delete({
                    where: {
                        id: tokenId
                    }
                });
            }else{
                // Redirects user
                throw redirect(302, '/main');
            }
        }
    }

    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    login: async ({request, cookies})=>{
        const data = await request.formData();
        const email = data.get('email')!.toString();
        const password = data.get('password')!.toString();
        
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(!user)
            return fail(400, {email_login: 'Email not in use'});

        const validated = validate(password, user.salt, user.hash);

        if(!validated)
            return fail(400, {password_login: 'Incorrect password'});

        const expirationDate = getExpirationDate()
        const authToken = await prisma.authToken.create({
            data: {
                userId: user.id,
                expires: expirationDate
            }
        });

        cookies.set('authToken', authToken.id, {secure: false, path: '/', expires: expirationDate});        
        throw redirect(302, '/main');
    },
    register: async ({request, cookies})=>{
        const data = await request.formData();
        const email = data.get('email')!.toString();
        const password = data.get('password')!.toString();
        const hashData = hash(password);

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(existingUser)
            return fail(400, {email_reg: 'Email already in use'});

        const newUser = await prisma.user.create({
            data: {
                email: email,
                hash: hashData.hash,
                salt: hashData.salt
            }
        });

        const expirationDate = getExpirationDate(); 
        
        const authToken = await prisma.authToken.create({
            data: {
                userId: newUser.id,
                expires: expirationDate
            }
        });
        
        cookies.set('authToken', authToken.id, {secure: false, path: '/', expires: expirationDate});
        throw redirect(302, '/main');
    }
};