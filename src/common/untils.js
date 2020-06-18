/* 防抖函数封装 */
export function debounce(fn,delay){
    let timer = null
    return function(...agrs){
      if(timer) {
      clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn.apply(this,agrs)
      },delay)
    }
  }