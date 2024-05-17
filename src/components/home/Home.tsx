import styles from "./home.module.css"
import homeImg from "./../../media/homeGroup.jpg"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import dogsImg from "./../../media/dogs.png"
import catsImg from "./../../media/cats.png"

export default function Home() {

  const navigate = useNavigate();

  const handlePetsTypeFilter = (petType: string) => {
    navigate(`/pets?petType=${petType}`);
  };

  return (
    <div>
      <div>
        <h1 className={styles.text1}>
          Соединяем сердца тех, кто ищет верного друга,
        </h1>
        <h1 className={styles.text2}>c теми, кто нуждается в любящем уходе!</h1>
      </div>
      <div className={styles.homePageContainer}>
        <img src={homeImg} alt="Cat" />
        <div className={styles.content}>
          Наша миссия — преобразовать сострадание в конкретные действия, чтобы
          каждое животное, лишенное дома, могло найти безусловную заботу и
          любовь. Мы стремимся стать связующим звеном между животными, которые
          лишились дома из-за войны или катастрофы, и заботливыми людьми в
          Европе, желающими предложить им новый дом и любящие сердца. Мы верим,
          что каждое животное заслуживает лучшего, и мы делаем все возможное,
          чтобы помочь им найти теплый дом и заботливых хозяев. Присоединяйтесь
          к нам в нашем стремлении сделать мир лучше!
        </div>
      </div>
      <div className={styles.lookingFor}>
        <h1 className={styles.lookingForTitle}>Looking for a tailed friend</h1>
        <div className={styles.dogs_cats_container}>
          <div className={styles.dogs_cats} onClick={() => handlePetsTypeFilter('dog')}>
            <img src={dogsImg} alt="Dogs" />
            <div className={styles.dogs_cats_body}>
              <Link className={styles.dogs_cats_btn} to="/pets?petType=dog">DOGS</Link>
            </div>
          </div>
          <div className={styles.dogs_cats} onClick={() => handlePetsTypeFilter('cat')}>
            <img src={catsImg} alt="Cats" />
            <div className={styles.dogs_cats_body}>
              <Link className={styles.dogs_cats_btn} to="/pets?petType=cat">CATS</Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

