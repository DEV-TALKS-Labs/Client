import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "@/components/Room/ui/avatar";

function Message({ user, message }) {
  const { name, imageUrl } = user;
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-6 w-6 rounded-full">
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h3 className="font-semibold whitespace-nowrap">{name}</h3>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}

export default Message;
