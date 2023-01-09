import { useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import i18next from 'i18next';
import avatar from '../../assets/images/ivan.jpg';
import coockies from 'js-cookie';
import { AddIcon } from '../common/Icons/AddIcon';
import { GlobeIcon } from '../common/Icons/GlobeIcon';
import { InfoIcon } from '../common/Icons/InfoIcon';
import { SettingsIcon } from '../common/Icons/SettingsIcon';
import { LogotypeIcon } from '../common/Icons/LogotypeIcon';
import './header.scss';
import '../Boards/MoreToolsMenu/more-tools-menu.scss';
import { Link, NavLink } from 'react-router-dom';

const languages = [
  {
    code: 'ukr',
    name: 'Українська',
    country_code: 'ua'
  },
  {
    code: 'en',
    name: 'English',
    country_code: 'gb'
  },
  {
    code: 'ru',
    name: 'Кацапский',
    country_code: 'ru'
  }
]

export const Header = ({ createModeCallback }) => {
  const [changeLangMode, setChangeLangMode] = useState(false)
  let menuRef = useRef();
  const { t } = useTranslation(['common']);
  const [languageCode, setLanguageCode] = useState(coockies.get("i18next") || '')

  useEffect(() => {
    if (languageCode === '') {
      coockies.set('i18next', 'en')
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    coockies.set('i18next', languageCode)
  }, [languageCode])

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setChangeLangMode(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    }
  });

  return (
    <div className="header">
      <div className="header__left left-header">
        <div className="left-header__logo">
          <Link to='/'><LogotypeIcon /></Link>
        </div>
        <div>
          <div className="left-header__title">{t("programm_name")}</div>
          <div className="left-header__subtext">{t("subtitle")}</div>
        </div>
      </div>
      <div className="header__right">
        <ul className="header__menu menu-header">
          <li title={t("titles.create_task")} className="menu-header__item" onClick={createModeCallback}>
            <NavLink to='/'><AddIcon /></NavLink>
          </li>
          <li ref={menuRef}
            title={t("titles.change_language")}
            className="menu-header__item"
            onClick={() => setChangeLangMode(prev => !prev)}
          >
            <GlobeIcon />
            <div className={`change-language__dropdown-menu menu-dropdown ${changeLangMode ? 'active' : 'inactive'}`} >
              <ul className='menu-dropdown__list'>
                {languages.map(language =>
                  <li
                    key={language.country_code}
                    className={languageCode === language.code ? 'menu-dropdown__item active' : 'menu-dropdown__item'}
                  >
                    <button onClick={() => {
                      setLanguageCode(language.code)
                      return i18next.changeLanguage(language.code)
                    }}>
                      <span className={`fi fi-${language.country_code} mx-2`}></span>
                      <span className='menu-dropdown__item-langname'>{language.name}</span>
                    </button>
                  </li>)}
              </ul>
            </div>
          </li>
          <li className="menu-header__item" title={t("titles.info")}>
            <NavLink to='/info'><InfoIcon /></NavLink>
          </li>
          <li className="menu-header__item" onClick={() => alert(`${t("not_available")}`)}>
            <SettingsIcon />
          </li>
        </ul>
      </div>
      <div className="header__avatar">
        <img src={avatar} alt="avatar" />
      </div>
    </div>
  );
}