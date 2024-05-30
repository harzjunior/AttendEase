"use client";

import { useUser } from "@/context/UserContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

function Avatar({ avClass, bool }) {
  const { user } = useKindeBrowserClient();
  const { setUser } = useUser();

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return (
    <div className={`${avClass}`}>
      {user?.picture ? (
        <>
          <Image
            src={user?.picture}
            width={35}
            height={35}
            alt="user"
            className="rounded-full cursor-pointer"
          />
        </>
      ) : (
        <Image
          src={"/images/Kyrian.png"}
          width={35}
          height={35}
          alt="user"
          className="rounded-full cursor-pointer"
          objectFit=""
        />
      )}
      <div>
        {bool && (
          <>
            {user ? (
              <>
                <h2 className="text-sm font-bold">
                  {user?.given_name} {user?.family_name}
                </h2>
                <h2 className="text-xs text-slate-400">
                  <Link href={`mailto:${user?.email}`}>{user?.email}</Link>
                </h2>
              </>
            ) : (
              <>
                <h2 className="text-sm font-bold">Jon Doe</h2>
                <h2 className="text-xs text-slate-400">
                  <Link href={`mailto:jondoe@gmail.com`}>jondoe@gmail.com</Link>
                </h2>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Avatar;
