import { Card } from "@/components/Room/ui/card";
import { Input } from "@/components/Room/ui/input";
import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "@/components/Room/ui/avatar";
export function ChatingArea() {
  return (
    
    //there is a bug in this code that causes the wornig below
    // TODO: fix the bug
    <div className='col-span-1 flex flex-col gap-4 p-4'>
      <h2 className='text-xl font-semibold'>Chat</h2>
      <Card className='h-4/6'>
        <div className='p-4 space-y-2'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-6 w-6 rounded-full'>
              
              <AvatarFallback>U1</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <h3 className='font-semibold'>User 1</h3>
              <p className='text-sm'>Hello everyone!</p>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <Avatar className='h-6 w-6 rounded-full'>
              <AvatarImage alt='User 2' src='/placeholder-avatar.jpg' />
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <h3 className='font-semibold'>User 2</h3>
              <p className='text-sm'>Hi User 1!</p>
            </div>
          </div>
        </div>
      </Card>
      <div className='mt-2'>
        <Input className='w-full' placeholder='Type a message...' />
      </div>
    </div>
  );
}
