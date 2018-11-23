export default (fn, time) => {
  let timeoutFn
  
  return function() {
    const myFun = () => fn.apply(this, arguments)

    clearTimeout(timeoutFn);
    timeoutFn = setTimeout(myFun, time)
  }
}