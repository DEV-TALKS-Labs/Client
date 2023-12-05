import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "@/components/Room/ui/avatar";
import { Card } from "@/components/Room/ui/card";
import { Button } from "@/components/Room/ui/button";
import { Badge } from "@/components/Room/ui/badge";
import Image from "next/image";

export function UsersArea(data) {
  // on join room update userslist
  // current users List

  const { roomUsers, id, hostId, coHostId } = data.data;
  console.log(roomUsers, id, hostId, coHostId);
  return (
    <div className='col-span-2 flex flex-col gap-4 p-4'>
      <h2 className='text-xl font-semibold'>Users</h2>
      <div className='grid gap-4 '>
        {roomUsers.map((user) => (
          <UserCard key={id} user={user} hostId={hostId} coHostId={coHostId} />
        ))}
      </div>
    </div>
  );
}
function UserCard({ user, hostId, coHostId }) {
  const { id, name, imageUrl } = user;
  return (
    <Card className='rounded-full flex items-center gap-4 p-4'>
      <Avatar className='h-9 w-9 rounded-full'>
        <Image
          alt={name}
          src={imageUrl}
          className='object-cover'
          layout='fill'
        />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <div className='flex-1'>
        <h3 className='font-semibold'>{name}</h3>
        {id === hostId && <Badge>Host</Badge>}
        {id === coHostId && <Badge>Co-Host</Badge>}
      </div>
      <Button size='icon' variant='ghost'>
        <IconVolumeoff className='h-6 w-6' />
        <span className='sr-only'>Mute {name}</span>
      </Button>
    </Card>
  );
}
function IconVolumeoff(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      <polygon points='11 5 6 9 2 9 2 15 6 15 11 19 11 5' />
    </svg>
  );
}
