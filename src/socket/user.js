export const onRedirect = (socket, push) => {
  socket.on("user:redirect", (id) => {
    push("/" + id);
  });
};

export const onUserLeft = (socket, setUserList) => {
  socket.on("user:left", (userId) => {
    setUserList((prev) => prev.filter((user) => user.id !== userId));
  });
};
