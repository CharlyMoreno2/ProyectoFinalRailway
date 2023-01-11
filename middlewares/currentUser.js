async function getCurrentUser(reqUser){
    const user = await reqUser;
    const userObject = {
        username: user.username,
        fotoPerfil: user.fotoPerfil
    }
    return userObject;
}

module.exports = {getCurrentUser};