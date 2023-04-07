const KEY = 'wc-studio::app-data';

// localStorage implementation... [ json ]
const bag = {
  get: () => {
    const json = localStorage.getItem(KEY)

    return json ? JSON.parse(json) : undefined
  },
  store: (data, stringify = false) => {
    if(stringify) {
      const json = JSON.stringify(data)
      localStorage.setItem(KEY, json)
    } else {
      localStorage.setItem(KEY, data)
    }
  },
}

export { bag }
export default bag
