import './Loader.css'

export default function Loader() {
  return (
    <div className='loader'>
        <div className="container">
  <div className="liquid"></div>
  <div className="liquid"></div>
  <div className="liquid"></div>
  <div className="liquid"></div>
</div>
<svg>
  <filter id="gooey">
    <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
    <feColorMatrix values="
        1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 20 -10
        " />
  </filter>
</svg>
    </div>
  )
}
