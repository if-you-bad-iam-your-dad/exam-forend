
export const StoreUserData = (user_detail) => {
    localStorage.setItem('token', user_detail.token);
    localStorage.setItem('userName', user_detail.userName);
    localStorage.setItem('role',user_detail.role)
}

export const GetUserData = () => {
    let access_token = localStorage.getItem('token');
    let userName = localStorage.getItem('userName');
    let role = localStorage.getItem('role');
    let userDetails = {
        access_token : access_token,
        userName : userName,
        role: role
    }

    return userDetails
}

export const RemoveUserData = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('role')
}
