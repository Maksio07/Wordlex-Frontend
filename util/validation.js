export function isEmail(email) {
    const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regExp.test(email)
}

export function isEmpty(value) {
    return value.trim() === ''
}

export function canBePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/

    return passwordRegex.test(password)
}
