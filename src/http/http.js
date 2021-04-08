const httpGET = (url) => {
    return fetch(url, {
        headers: {
            'Bearer': localStorage.getItem('jwt')
        }});
}

export { httpGET }