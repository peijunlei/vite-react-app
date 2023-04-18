import { generateImageList } from "../../utils"
import { useRef } from "react"

import none from '@/assets/image.png'
import useIntersectionObserver from "./useIntersectionObserver"



const list = generateImageList(300, 10)

function LazyImage() {
  const domlist = useRef([])
  useIntersectionObserver(domlist.current)
  return (

    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {
        list.map((v, index) => {
          return (
            <img
              ref={dom => { domlist.current[index] = dom }}
              src={none}
              alt="懒加载"
              key={v}
              data-src={v}
              width={300}
              height={300}
            />
          )
        })
      }
    </div>
  )
}

export default LazyImage