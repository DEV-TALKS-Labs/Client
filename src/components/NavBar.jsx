import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { encode } from "next-auth/jwt";

const Navbar = async () => {
  // const { userId, getToken } = auth();
  // const user = await currentUser();
  // console.log(await getToken());
  // console.log(userId)
  const session = await getServerSession(options);

  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-900 h-[10vh]'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link
          href='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
            DEV TALKS
          </span>
        </Link>

        <div className='flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
          <div className='pr-4'>
            {session ? (
              <Image
                src={session.user.image}
                alt='user image'
                width={50}
                height={50}
                className='rounded-full'
              />
            ) : (
              <div></div>
            )}
          </div>

          {session ? (
            //adding user image
            <Link
              href='/api/auth/signout?callbackUrl=/'
              className='dark:text-white'
            >
              Logout
            </Link>
          ) : (
            <Link href='/api/auth/signin' className='dark:text-white'>
              Login
            </Link>
          )}
        </div>
        <div
          className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
          id='navbar-user'
        ></div>
      </div>
    </nav>
  );
};

export default Navbar;
