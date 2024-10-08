"use server";

import prisma from "@/lib/prisma";
import { updateUserCurrencySchema } from "@/schema/userSettings";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const updateUserCurrency = async (currency: string) => {
    const parseBody = updateUserCurrencySchema.safeParse({
        currency,
    });

    if(!parseBody.success){
        throw parseBody.error;
    }

    const user = await currentUser();
    if(!user){
        redirect("/sign-in");
    }

    const userSettings = await prisma.userSettings.update(
    {where: {
        userId: user.id,
    },
    data: {
        currency,
    }}
    );

    return userSettings;
}