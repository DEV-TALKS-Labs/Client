const emitCreateRoom = (socket, room) => {
  socket.emit("room:add", room);
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

const onNewRoom = (socket) => {
  socket.on("room:new", (room) => {
    console.log("New room created: " + room.title);
  });
};

const onUserJoined = (socket) => {
  socket.on("user:joined", (name) => {
    console.log("user joined: " + name);
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
  onNewRoom(socket);
  onErrorHandler(socket);
  onTest(socket);
};

export { emitCreateRoom, emitJoinRoom, emitLeaveRoom, emitTest, onSocket };
