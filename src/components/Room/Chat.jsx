import { Card } from "@/components/Room/ui/card";
import { Input } from "@/components/Room/ui/input";
import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "@/components/Room/ui/avatar";
export function ChatingArea() {
  return (
    <div className='col-span-1 flex flex-col gap-4 p-4'>
      <h2 className='text-xl font-semibold'>Chat</h2>
      <Card className='h-4/6 overflow-y-auto'>
        <div className='p-4 space-y-2'></div>
      </Card>
      <div className='mt-2'>
        <Input className='w-full' placeholder='Type a message...' />
      </div>
    </div>
  );
}

function message(user, message) {
  const { name, imageUrl } = user;
  return (
    <div className='flex items-center gap-4'>
      <Avatar className='h-6 w-6 rounded-full'>
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className='flex-1'>
        <h3 className='font-semibold'>{name}</h3>
        <p className='text-sm'>{message}</p>
      </div>
    </div>
  );
}
