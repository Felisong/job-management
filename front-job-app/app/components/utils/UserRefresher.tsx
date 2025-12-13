"use client";

import { usePathname } from "next/navigation";
import { useUser } from "../../utils/context/UserDataContext";
import { useEffect } from "react";

export default function UserRefresher(){
    const {refreshUser} = useUser();
    const pathName = usePathname();

    useEffect(() => {
        refreshUser();
    }, [pathName])

    return null;
}