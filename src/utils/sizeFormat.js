

export const sizeFormat = (size) => {
    if (size >= 1024 ** 3) {
        return (size / 1024 ** 3).toFixed(1) + ' Гб'
    }

    if (size >= 1024 ** 2) {
        return (size / 1024 ** 2).toFixed(1) + ' Мб'
    }

    if (size > 1024) {
        return (size / 1024).toFixed(1) + ' Кб'
    }

    return ' б'
}
