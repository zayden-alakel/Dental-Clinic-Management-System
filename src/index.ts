import appFactory from "./app";

appFactory()
    .then(app => {
    app.listen(process.env.PORT, () => {
        console.log('Server Connected Successfully');
    })
})