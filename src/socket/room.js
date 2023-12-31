import { onRedirect, onUserLeft, onUserJoined } from "./user";

const emitCreateRoom = (socket, data) => {
  socket.emit("room:add", data);
};

const emitJoinRoom = (socket, room) => {
  socket.emit("room:joinRoom", room);
};

const emitLeaveRoom = (socket, room) => {
  socket.emit("room:leaveRoom", room);
};

const emitTest = (socket, data) => {
  socket.emit("test", data);
};
//------------------//
//  Socket listeners //
//------------------//

const onNewRoom = (socket, setRoomList) => {
  socket.off("room:new").on("room:new", (room) => {
    setRoomList((prev) => [...prev, room.body]);
  });
};

const onDeleteRoom = (socket, setRoomList) => {
  socket.off("room:delete").on("room:delete", (roomId) => {
    setRoomList((prev) => prev.filter((room) => room.id !== roomId));
  });
};


const onErrorHandler = (socket) => {
  socket.on("errorHandler", (err) => {
    console.log(err);
  });
};

const onTest = (socket) => {
  socket.on("test:res", (data) => {
    console.log(data);
  });
};

const onSocket = (socket) => {
  onUserJoined(socket);
  onErrorHandler(socket);
  onTest(socket);
};

export {
  emitCreateRoom,
  emitJoinRoom,
  emitLeaveRoom,
  emitTest,
  onSocket,
  onNewRoom,
  onDeleteRoom,
  onTest,
  onRedirect,
  onUserLeft,
  onUserJoined,
};
