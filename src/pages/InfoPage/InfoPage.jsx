import { useTranslation } from "react-i18next";

export const InfoPage = () => {
   const { t } = useTranslation(["info"])
   return (
      <h1>{t("info_title")}</h1>
   );
}