import { FC, useState, useEffect } from "react";
import { Space, Swiper } from 'antd-mobile'
import styles from './styles.module.scss';
import { GetImages } from "../../api";


const FirstSection: FC = () => {
  const [data, setData] = useState({ list: [] });
  useEffect(() => {
    // 更优雅的方式
    const fetchData = async () => {
      const res: any = await GetImages({ page: 1, size: 5, type: "comic" })
      console.log(res);
      setData(res);
    };
    fetchData();
  }, []);
  return (
    <div className={styles.firstSection}>
     
      <Space direction='vertical' block>
        <Swiper
          loop={true}
          indicator={(total, current) => (
            <div className={styles.customIndicator}>
              {`${current + 1} / ${total}`}
            </div>
          )}
        >
          {
            data.list.map((item: any, index: number) => (
              <Swiper.Item key={index}>
                <img src={item.url} alt="Banner" />
              </Swiper.Item>
            ))
          }
        </Swiper>
        
      </Space>
    </div>
  )
}

export default FirstSection;
