export const onRedirect = (socket, push) => {
  socket.on("user:redirect", (id) => {
    push("/" + id);
  });
};
