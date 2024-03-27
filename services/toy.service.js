
import fs from 'fs'
import { utilService } from './util.service.js'
const toys = utilService.readJsonFile('data/toy.json')

export const toyService = {
    query,
    getById,
    save,
    remove
}

function query(filterBy) {
    console.log(filterBy);
    let filteredToys = toys
    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        filteredToys = filteredToys.filter(toy => regExp.test(toy.name))
    }
    return Promise.resolve(filteredToys)
}

function getById(_id) {
    const toy = toys.find(toy => toy._id === _id)
    //
    return Promise.resolve(toy)
}

function remove(_id) {
    const idx = toys.findIndex(toy => toy._id === _id)
    toys.splice(idx, 1)
    _saveToysToFile()
    return Promise.resolve()
}

function save(toy) {
    if (toy._id) {
        const idx = toys.findIndex(currToy => currToy._id === toy._id)
        toys[idx] = { ...toys[idx], ...toy }
    } else {
        toy.createdAt = new Date(Date.now())
        toy._id = _makeId()
        toys.unshift(toy)
    }
    _saveToysToFile()
    return Promise.resolve(toy)
}



function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function _saveToysToFile() {
    fs.writeFileSync('data/toy.json', JSON.stringify(toys, null, 2))
}
