//problema apresentado
//fazer o loguin de usuario e executar logado ou não depois de veririfcar se estpa logado ou não

// const loginUser = (email, passaword, success, error) => {
//     setTimeout(() => {
//         const error = false;

//         if (error) return error(new error('Erro ao logar!'))

//         console.log('Logged Sucessfully');
//         success({ email });
//     }, 1500)
// }

//mesma coisa so que com promisses
const loginUserPromisse = (email, passaword) => {
    return new Promise((resolve, reject) => {
        const error = false;
        if (error) {
            reject(new Error('Erro login'));
        }

        console.log('Loggin succesfuly!');
        resolve({ email })
    })
};

const detalsVideos = (video) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(detalsVideos)
            resolve(['video1', 'video2', 'video3'])
        }, 2000);
    })
}

const getUserVideos = (email) => {
    return new Promise((resolve, reject) => {
        setInterval(() => {
            console.log('getUserVideos');
            resolve({ title: 'video Title' })
        }, 2500);
    });
};

loginUserPromisse('welisson@gmail.com', '123456')
    .then((user) => getUserVideos(user.email))
    .then((video) => detalsVideos(video[0]))
    .then((detalsVideos) => console.log({ detalsVideos }))
    .catch((error) => console.log({ error }));