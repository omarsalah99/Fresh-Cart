import style from './Loading.module.css'
export default function Loading() {
  return (
    <>
    <div className="flex justify-center items-center min-h-screen">
    <div className={style.boxes}>
    <div className={style.box}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div className={style.box}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div className={style.box}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div className={style.box}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    </div>
    </div>
    </>
  )
}
