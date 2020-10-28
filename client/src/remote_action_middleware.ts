export default (socket:any) => (store: any) => (next: any) => (action: any) => {
    if (action.meta && action.meta.remote) {
        socket.emit('action', action);
    }
    console.log(`in middleware with action ${JSON.stringify(action)}`);
    return next(action);
}