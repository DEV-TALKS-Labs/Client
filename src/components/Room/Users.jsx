"use client";
import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "@/components/Room/ui/avatar";
import { Card } from "@/components/Room/ui/card";
import { Button } from "@/components/Room/ui/button";
import { Badge } from "@/components/Room/ui/badge";
import PeerVideo from "../PeerVideo";
import Image from "next/image";

export function UsersArea({ handleScreenClick, roomUsersList }) {
  return (
    <div className="col-span-2 flex flex-col gap-4 p-4 overflow-y-scroll relative">
      <h2 className="text-xl font-semibold ">Users</h2>
      <div className="flex flex-wrap flex-col gap-4">
        {/* delete this line */}
        {console.log("roomUsersList from users", roomUsersList)}
        {roomUsersList.map(
          ({ stream: screen, muted: isMuted, id, name, imageUrl }) => {
            return (
              <Card
                key={id}
                className="border p-2 rounded-md group block"
                onClick={() => handleScreenClick(screen)}
              >
                <div className="flex flex-col justify-center">
                  <div className="w-full h-32">
                    {screen ? (
                      <PeerVideo
                        isMe={isMuted}
                        stream={screen}
                        className="aspect-video object-cover h-full w-full"
                      />
                    ) : (
                      <Image
                        src={imageUrl ? imageUrl : "/images/avatar.svg"}
                        alt={name}
                        className="aspect-video h-full w-full"
                        width={100}
                        height={100}
                      />
                    )}
                  </div>
                  <div className="bg-gray-700 w-full flex items-center justify-between p-2">
                    <h3 className="font-semibold text-lg text-white">{name}</h3>
                    <div>
                      <Button size="icon" variant="ghost">
                        {isMuted ? (
                          <IconVolumeoff className="w-6 h-6 text-white" />
                        ) : (
                          <IconVolumeup className="w-6 h-6 text-white" />
                        )}
                        <span className="sr-only">
                          {isMuted ? `Unmute ${name}` : `Mute ${name}`}
                        </span>
                      </Button>
                      <Button size="icon" variant="ghost">
                        {isMuted ? (
                          <IconVolumeoff className="w-6 h-6 text-white" />
                        ) : (
                          <IconVolumeup className="w-6 h-6 text-white" />
                        )}
                        <span className="sr-only">
                          {isMuted ? `Unmute ${name}` : `Mute ${name}`}
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          }
        )}
      </div>
    </div>
  );
}

//off icon with another color
function IconVolumeoff(props) {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function IconVolumeup(props) {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}
