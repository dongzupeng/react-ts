import { FC, useEffect, useRef, useState } from "react";
import LogoImage from '../../assets/logo.png';

import styles from './styles.module.scss';
import classNames from "classnames";

const tabs = [
  {
    key: 'comic',
    title: '动画',
    image: "https://pic.netbian.com/uploads/allimg/220111/002720-16418320408c00.jpg",
  },
  {
    key: 'animal',
    title: '动物',
    image: "https://pic.netbian.com/uploads/allimg/210308/224421-1615214661c045.jpg",
  },
  {
    key: 'food',
    title: '美食',
    image: "https://pic.netbian.com/uploads/allimg/170718/170400-1500368640ed1f.jpg",
  },
  {
    key: 'beauty',
    title: '美女',
    image: "https://pic.netbian.com/uploads/allimg/211210/232707-16391500276274.jpg",
  },
  {
    key: 'movie',
    title: '电影',
    image: "https://pic.netbian.com/uploads/allimg/210730/001329-1627575209b75e.jpg",
  },
  {
    key: 'game',
    title: '游戏',
    image: "https://pic.netbian.com/uploads/allimg/210512/230537-1620831937c93c.jpg",
  },
  {
    key: 'phone',
    title: '手机壁纸',
    image: "https://pic.netbian.com/uploads/allimg/211223/232002-1640272802c15b.jpg",
  }
]

const TAB_HEIGHT = 60;

// 1. 点击 Tab 滚动跳转 x
// 3. Tabs 吸顶 x
// 2. 滚动时，高亮 Tab x
// 4. 按钮吸底
const SecondSection: FC = () => {
  const [activeTab, setActiveTab] = useState<string>('cartoon');
  const [isFixed, setIsFixed] = useState<boolean>(false);

  const secondSectionRef = useRef<HTMLDivElement>(null);

  const activate = (key: string) => {
    setActiveTab(key);

    const tabContentEl = document.querySelector(`[data-id=${key}]`);

    if (tabContentEl) {
      tabContentEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const onScroll = () => {
    if (secondSectionRef.current) {
      const { top } = secondSectionRef.current.getBoundingClientRect();
      setIsFixed(top <= 0);

      const sectionNodes = secondSectionRef.current.querySelectorAll('section');

      Array.from(sectionNodes).forEach(sectionEl => {
        const { top } = sectionEl.getBoundingClientRect();
        const key = sectionEl.getAttribute('data-id') || '';

        if (top <= TAB_HEIGHT) {
          setActiveTab(key);
        }
      })
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [])

  return (
    <div className={styles.secondSection} ref={secondSectionRef}>
      {/* Tabs */}
      <ul className={classNames({ [styles.isFixed]: isFixed })}>
        {tabs.map(tab => (
          <li key={tab.key} onClick={() => activate(tab.key)}>
            <span>{tab.title}</span>
            <span className={classNames(styles.line, { [styles.visible]: activeTab === tab.key })} />
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      <div>
        {tabs.map(tab => (
          <section data-id={tab.key} key={tab.key}>
            <h2>{tab.title}</h2>
            <img src={tab.image} alt={tab.key} />
          </section>
        ))}
      </div>

      {/* 吸底按钮 */}
      <div className={classNames(styles.btnWrapper, { [styles.visible]: isFixed })}>
        <img src={LogoImage} alt="LOGO" />
        {/* eslint-disable  */}
        <a href="https://www.bilibili.com/" target="_blank">
          <button>App 内打开</button>
        </a>
        {/* eslint-enable  */}
      </div>
    </div>
  )
}

export default SecondSection;
