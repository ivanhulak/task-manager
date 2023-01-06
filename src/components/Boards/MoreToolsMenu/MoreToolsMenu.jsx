import { useContext, useEffect, useRef, useState } from "react";
import { TrashIcon } from "../../common/Icons/TrashIcon";
import { EditIcon } from "../../common/Icons/EditIcon";
import './more-tools-menu.scss';
import { DeleteTasksBoardContext } from "../Boards";

export const MoreToolsMenu = ({board, boardId, startEditBoard}) => {
   const [moreTools, setMoreTools] = useState(false)
   const {deleteBoardCallback} = useContext(DeleteTasksBoardContext)
   let menuRef = useRef();
   
   useEffect(() => {
      let handler = (e) => {
         if (!menuRef.current.contains(e.target)) {
            setMoreTools(false);
         }
      };
      document.addEventListener("mousedown", handler);
      return () => {
         document.removeEventListener("mousedown", handler);
      }
   });

   return (
      <div className='more-tools' ref={menuRef}>
         <div className='more-tools__menu' onClick={() => setMoreTools(prev => !prev)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M7.1999 12C7.1999 13.3255 6.12539 14.4 4.7999 14.4C3.47442 14.4 2.3999 13.3255 2.3999 12C2.3999 10.6745 3.47442 9.60001 4.7999 9.60001C6.12539 9.60001 7.1999 10.6745 7.1999 12Z" stroke="#8472F3" strokeWidth="2" />
               <path d="M14.3999 12C14.3999 13.3255 13.3254 14.4 11.9999 14.4C10.6744 14.4 9.5999 13.3255 9.5999 12C9.5999 10.6745 10.6744 9.60001 11.9999 9.60001C13.3254 9.60001 14.3999 10.6745 14.3999 12Z" stroke="#8472F3" strokeWidth="2" />
               <path d="M21.5999 12C21.5999 13.3255 20.5254 14.4 19.1999 14.4C17.8744 14.4 16.7999 13.3255 16.7999 12C16.7999 10.6745 17.8744 9.60001 19.1999 9.60001C20.5254 9.60001 21.5999 10.6745 21.5999 12Z" stroke="#8472F3" strokeWidth="2" />
            </svg>
         </div>
         <div className={`more-tools__dropdown-menu more-tools-dropdown ${moreTools ? 'active' : 'inactive'}`} >
            <ul className='more-tools-dropdown__list'>
               <DropdownItem 
                  component={<TrashIcon />} 
                  title={'delete'} 
                  callbackFn={() => deleteBoardCallback(boardId)}/>
               <DropdownItem 
                  component={<EditIcon />} 
                  title={'edit'}
                  callbackFn={() => startEditBoard(board)}/>
            </ul>
         </div>
      </div>
   );
}

const DropdownItem = ({component, title, callbackFn}) => {
   
   return (
      <li className='more-tools-dropdown__item' title={title} onClick={callbackFn}>
         {component}
      </li>
   );
}