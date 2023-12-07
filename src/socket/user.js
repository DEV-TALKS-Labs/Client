export const onRedirect = (socket, push) => {
  socket.off("user:redirect").on("user:redirect", (id) => {
    push("/" + id);
  });
};

export const onUserJoined = (socket, setRoomUsersList) => {
  const userJoined = (user) => {
    setRoomUsersList((prev) => [...prev, user]);
  };
  socket.off("user:joined", userJoined).on("user:joined", userJoined);
};

export const onUserLeft = (socket, setRoomUsersList) => {
  const userLeft = (userId) => {
    setRoomUsersList((prev) => {
      return prev.filter((user) => user.id !== userId);
    });
  };
  socket.off("user:left", userLeft).on("user:left", userLeft);
};
