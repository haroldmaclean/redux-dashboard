const loggerMiddleware = (store) => (next) => (action) => {
  console.log('========================')
  console.log('Previous State:')
  console.log(store.getState())

  console.log('------------------------')
  console.log('Action:')
  console.log(action.type)

  // Pass the action to the reducer
  next(action)

  console.log('------------------------')
  console.log('Next State:')
  console.log(store.getState())

  console.log('========================')
}

export default loggerMiddleware
