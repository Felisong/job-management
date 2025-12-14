"use client"

import { useUser } from "@/app/utils/context/UserDataContext"
import Link from "next/link"

export default function ValidateUserPage(){
    const user = useUser();

    // sent fetch to update user to validated here

    return (
        <div className="p-4">
            <h1>You are now validated!</h1>
            <p>Thank you!</p>
            <p> Now you have full access to the <Link href={`/${user.userData.user_id}/resume`}>resume</Link> and <Link href={`/${user.userData.user_id}/cover`}>cover letter</Link> pages </p>
            <p>{`Z('w' / Z)_`}</p>
        </div>
    )
}