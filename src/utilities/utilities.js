const cipher = string => {
    const encodedString = window.btoa(string);
    return encodedString
}

export { cipher }