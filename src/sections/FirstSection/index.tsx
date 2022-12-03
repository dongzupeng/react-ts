import { FC } from "react";
import BannerImage from '../../assets/banner.jpg';
import styles from './styles.module.scss';
import { GetImages } from "../../api";

interface imgsType {
  list: Array<string>,
}
GetImages<imgsType>({ page: 1, size: 10, type: "comic" }).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})

const FirstSection: FC = () => {
  return (
    <div className={styles.firstSection}>
      <img src={BannerImage} alt="Banner" />
    </div>
  )
}

export default FirstSection;
