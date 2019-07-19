import { Map } from 'immutable'
import _ from 'lodash'

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}
export const urlify = (text) => {
  const urlImgRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g
  // eslint-disable-next-line no-useless-escape
  const regExp = /(https?:\/\/[^\s]+(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11}))/g
  let urls = {
    img: [],
    idVideos: []
  }

  text = text.replace(urlImgRegex, (url) => { urls.img.push(url); return '' })
  text = text.replace(regExp, (url) => { urls.idVideos.push(extractVideoID(url)); return '' })

  urls.img = unique(urls.img)
  urls.idVideos = unique(urls.idVideos)

  return { text, urls }
}

function extractVideoID (match) {
  const videoId = match.split('v=')[1]
  // const ampersandPosition = video_id.indexOf('&')
  const ampersandPosition = 11
  // if (ampersandPosition != -1) {
  return videoId.substring(0, ampersandPosition)
  // }
  // return null
}
export const unique = (arr) => {
  const obj = {}

  for (let i = 0; i < arr.length; i++) {
    let str = arr[i]
    obj[str] = true // запомнить строку в виде свойства объекта
  }

  return Object.keys(obj) // или собрать ключи перебором для IE8-
}

export const removeFromArray = (arr, indexes) => {
  // eslint-disable-next-line no-undef
  let arrayOfIndexes = [].slice.call(arguments, 1)
  return arr.filter((item, index) => {
    return arrayOfIndexes.indexOf(index) === -1
  })
}

export const checkValidity = (value, rules) => {
  let isValid = true
  if (!rules) {
    return true
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    isValid = pattern.test(value) && isValid
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/
    isValid = pattern.test(value) && isValid
  }

  return isValid
}

export const arrayToObject = (obj) => obj.reduce((acc, message) => ({ ...acc, [message.id]: message }), {})

export const getItem = (item) => JSON.parse(window.localStorage.getItem(item))

export const setItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}
export const randomId = () => Math.floor(Date.now() + Math.random())

export function arrToMap (arr, DataModel) {
  return arr.reduce(
    (acc, item) => {
      return acc.set(item.id, DataModel ? new DataModel(item) : item)
    },
    new Map({})
  )
}

export function objToMap (arr, DataModel) {
  return _.reduce(arr,
    (acc, item) => {
      return acc.set(item.id, DataModel ? new DataModel(item) : item)
    },
    new Map({})
  )
}
