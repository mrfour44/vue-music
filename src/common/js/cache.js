import storage from 'good-storage'

const SEAECH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

function inserArray(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare)
    if (index === 0) {
        return
    }
    if (index > 0) {
        arr.splice(index, 1)
    }
    arr.unshift(val)
    if (maxLen && arr.length > maxLen) {
        arr.pop()
    }
}

function deleteFromArray(arr, compare) {
    const index = arr.findIndex(compare)
    if (index > -1) {
        arr.splice(index, 1)
    }
}
export function saveSearch(query) {
    let searches = storage.get(SEAECH_KEY, [])
    inserArray(searches, query, (item) => {
        return item === query
    }, SEARCH_MAX_LENGTH)
    storage.set(SEAECH_KEY, searches)
    return searches
}

export function loadSearch() {
    return storage.get(SEAECH_KEY, [])
}

export function deleteSearch(query) {
    let searches = storage.get(SEAECH_KEY, [])
    deleteFromArray(searches, (item) => {
        return item === query
    })
    storage.set(SEAECH_KEY, searches)
    return searches
}

export function clearSearch() {
    storage.remove(SEAECH_KEY)
    return []
}