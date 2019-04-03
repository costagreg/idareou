export default (...fns) => acc => fns.reduceRight((val, fn) => fn(val), acc)
