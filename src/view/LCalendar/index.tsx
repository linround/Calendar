import styles from './style.module.less'
import DayComponent from './components/DayComponent'
import MenuHeader from './modules/MenuHeader'

export default function () {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainLeft}></div>
      <div className={styles.mainRight}>
        <MenuHeader />
        <DayComponent />
      </div>
    </div>
  )
}
