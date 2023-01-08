export const StatusIcon = ({itemStatus}) => {
   return (
      <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M21.8751 13.125L15.9666 21.875L13.1251 18.5468M13.1251 32.0833H21.8751C27.513 32.0833 32.0834 27.5129 32.0834 21.875V13.125C32.0834 7.4871 27.513 2.91667 21.8751 2.91667H13.1251C7.48717 2.91667 2.91675 7.4871 2.91675 13.125V21.875C2.91675 27.5129 7.48718 32.0833 13.1251 32.0833Z" stroke={itemStatus === 'uncompleted' ? "#333333" : "#219653"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
   );
}