import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib';

export const load = (async ({cookies}) => {
    const tokenId = cookies.get('authToken');

    if(!tokenId)
        throw redirect(302, '/login');

    const token = await prisma.authToken.findUnique({
        where: {
            id: tokenId
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

    return {};
}) satisfies PageServerLoad;