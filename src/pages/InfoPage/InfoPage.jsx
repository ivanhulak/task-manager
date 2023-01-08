import { useTranslation } from "react-i18next";
import './info.scss';

export const InfoPage = () => {
   const { t } = useTranslation(["info"])
   return (
      <div className="info">
         <div className="info-page">
            <h1 className="info-page__title">{t("info_title")}</h1>
            <div>
               <p className="info-page__paragraph">
                  <span className="bold" style={{marginBottom: '0px'}}>{t("p1_title")}</span>{t("info_p1")}
               </p>

               <p className="info-page__paragraph">
                  <span className="bold">{t("p2_title")}</span>
                  <p>{t("info_p2_1")}</p>
                  <p>{t("info_p2_2")}</p>
                  <p>{t("info_p2_3")}</p>
               </p>

               <p className="info-page__paragraph">
                  <span className="bold">{t("p3_title")}</span>
                  <p>{t("info_p3")}</p>
               </p>

               <p className="info-page__paragraph">
                  <span className="bold">{t("p4_title")}</span>
                  <p>{t("info_p4")}</p>
               </p>

               <p className="info-page__paragraph">
                  <span className="bold">{t("p5_title")}</span>
                  <p>{t("info_p5")}</p>
               </p>
            </div>
         </div>
      </div>
   );
}