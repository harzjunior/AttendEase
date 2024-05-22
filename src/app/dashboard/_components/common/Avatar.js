"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";

function Avatar({ avClass, bool }) {
  const { user } = useKindeBrowserClient();

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
                <h2 className="text-xs text-slate-400">{user?.email}</h2>
              </>
            ) : (
              <>
                <h2 className="text-sm font-bold">Jon Doe</h2>
                <h2 className="text-xs text-slate-400">jondoe@gmail.com</h2>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Avatar;
