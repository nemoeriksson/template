import { prisma } from '$lib';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({cookies}) => {    
    const tokenId = cookies.get('authToken');

    if(!tokenId)
        throw redirect(302, '/login');

    const token = await prisma.authToken.findUnique({
        where: {
            id: tokenId
        },
        include: {
            user: {
                select: {
                    isAdmin: true
                }
            }
        }
    });

    if(!token)
        throw redirect(302, '/login');

    if(new Date() > new Date(token.expires)){
        await prisma.authToken.delete({
            where: {
                id: tokenId
            }
        });

        throw redirect(302, '/login');
    }

    if(!token.user.isAdmin)
        throw redirect(302, '/main');
    
    return {};
}) satisfies PageServerLoad;