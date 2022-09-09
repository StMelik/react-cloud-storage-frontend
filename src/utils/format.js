
export const nameFormat = (name, isDir) => {
    const type = name.split('.').pop()
    const length = { dir: 15, file: 10 }

    if (isDir) {
        return name.length > length.dir
            ? name.slice(0, length.dir) + '...'
            : name
    } else {
        return name.length > length.file
            ? `${name.slice(0, length.file)}... .${type}`
            : name
    }
}

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

    return `${size} б`
}
