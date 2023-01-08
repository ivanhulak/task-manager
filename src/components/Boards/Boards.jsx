import { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TaskContext } from '../../App';
import './boards.scss';
import { MoreToolsMenu } from './MoreToolsMenu/MoreToolsMenu';
import {EditBoardForm} from './EditForms/EditBoardForm';
import {EditTaskForm} from './EditForms/EditTaskForm';
import {StatusIcon} from '../common/Icons/StatusIcon';

export const DeleteTasksBoardContext = createContext(null)

export const Boards = ({ boards, setBoards }) => {
   const { t } = useTranslation(['common']);
   const { addTaskCallback } = useContext(TaskContext)
   const [currentBoard, setCurrentBoard] = useState(null)
   const [currentItem, setCurrentItem] = useState(null)
   const [editTaskMode, setEditTaskMode] = useState(false)
   const [editBoardMode, setEditBoardMode] = useState(false)

   const deleteTaskCallback = (boardId, taskId) => {
      setBoards(boards.map(b => b.id === boardId ? { ...b, items: b.items.filter(task => task.id !== taskId) } : b))
   }
   const deleteBoardCallback = (boardId) => {
      setBoards(boards.filter(b => b.id !== boardId))
   }
   const setTaskStatus = (status, boardId, taskId) => {
      function sortByStatusKey(item1, item2) {
         if (item1.status > item2.status) return -1;
         if (item1.status < item2.status) return 1;
         return 0;
      }
      setBoards(boards.map(b => b.id === boardId
         ? { ...b, items: b.items.map(item => item.id === taskId ? { ...item, status: status } : item).sort(sortByStatusKey) }
         : b))
   }
   const editTaskCallback = (boardId, taskId, editData) => {
      setBoards(boards.map(b => b.id === boardId
         ? { ...b, items: b.items.map(item => item.id === taskId ? { ...item, task: editData.task } : item) }
         : b))
   }
   const editBoardCallback = (boardId, editData) => {
      const { title, colorLabel } = editData
      setBoards(boards.map(b => b.id === boardId ? { ...b, title: title, colorLabel: colorLabel } : b))
   }
   const startEditTask = (task) => {
      setEditTaskMode(true)
      setCurrentItem(task)
   }
   const startEditBoard = (board) => {
      setEditBoardMode(true)
      setCurrentBoard(board)
   }
   // Drag Handlers
   const onDragStartHandler = (e, board, item) => {
      setCurrentBoard(board)
      setCurrentItem(item)
   }
   const onDragEndHandler = (e) => {
      e.preventDefault()
      e.target.style.boxShadow = 'none';
   }
   const onDragLeaveHandler = (e) => {
      e.target.style.boxShadow = 'none';
   }
   const onDragOverHandler = (e) => {
      e.preventDefault()
      if (e.target.className === 'board-task') {
         e.target.style.boxShadow = '0px 4px 3px #AB98B7';
      }
   }
   const onDropHandler = (e) => {
      e.preventDefault()
      e.target.style.boxShadow = 'none';
   }
   const onDropCardHandler = (e, board) => {
      board.items.push(currentItem)
      const currentIndex = currentBoard.items.indexOf(currentItem)
      currentBoard.items.splice(currentIndex, 1)
      setBoards(boards.map(b => {
         if (b.id === board.id) {
            return b
         }
         if (b.id === currentBoard.id) {
            return currentBoard
         }
         return b
      }))
      e.target.style.boxShadow = 'none';
   }

   return (
      <DeleteTasksBoardContext.Provider value={{ deleteBoardCallback }}>
         <div className='boards'>
            <div className="boards__body">
               {boards.map(board =>
                  <div
                     key={board.id}
                     className="boards__column"
                     onDrop={(e) => onDropCardHandler(e, board)}
                     onDragOver={(e) => onDragOverHandler(e)}
                  >
                     <div className="board-inner">
                        <div className="board-inner__header">
                           {(editBoardMode && currentBoard === board)
                              ? <EditBoardForm
                                 editBoardCallback={editBoardCallback}
                                 board={board}
                                 setEditBoardMode={setEditBoardMode}
                                 setCurrentBoard={setCurrentBoard}
                              />
                              : <>
                                 <div className="board-inner__title">{board.title}</div>
                                 <div style={{ position: 'relative' }}>
                                    <MoreToolsMenu board={board} boardId={board.id} startEditBoard={startEditBoard} />
                                 </div>
                              </>}
                        </div>
                        <div className="board-inner__tasks">
                           {board.items.length !== 0 ? board.items.map(item =>
                              <div
                                 draggable={true}
                                 key={item.id}
                                 className="board-task"
                                 onDragStart={(e) => onDragStartHandler(e, board, item)}
                                 onDragEnd={(e) => onDragEndHandler(e)}
                                 onDragLeave={(e) => onDragLeaveHandler(e)}
                                 onDragOver={(e) => onDragOverHandler(e)}
                                 onDrop={(e) => onDropHandler(e, board, item)}
                              >
                                 <div
                                    className="board-task__status"
                                    onClick={() => setTaskStatus(item.status === 'completed' ? 'uncompleted' : 'completed', board.id, item.id)}
                                 >
                                    <StatusIcon itemStatus={item.status}/>
                                 </div>
                                 {(editTaskMode && currentItem === item)
                                    ? <EditTaskForm
                                       boardId={board.id}
                                       item={item}
                                       setEditTaskMode={setEditTaskMode}
                                       setCurrentItem={setCurrentItem}
                                       editTaskCallback={editTaskCallback}
                                    />
                                    : <div className="board-task__text">{item.task}</div>}
                                 <ul className="board-task__buttons buttons-task">
                                    <li className='buttons-task__button' onClick={() => deleteTaskCallback(board.id, item.id)}>
                                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M3 5C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7V5ZM8.44721 3.10557L7.55279 2.65836V2.65836L8.44721 3.10557ZM21 7C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5V7ZM15.5528 3.10557L16.4472 2.65836V2.65836L15.5528 3.10557ZM6.24805 9.93762C6.2136 9.38641 5.73883 8.9675 5.18762 9.00195C4.63641 9.0364 4.2175 9.51117 4.25195 10.0624L6.24805 9.93762ZM19.7481 10.0624C19.7825 9.51117 19.3636 9.0364 18.8124 9.00195C18.2612 8.9675 17.7864 9.38641 17.7519 9.93762L19.7481 10.0624ZM18.2813 17.4994L17.2832 17.437L18.2813 17.4994ZM7.50667 21.6981L7.06944 22.5974L7.50667 21.6981ZM6.20738 20.4774L5.33705 20.9699H5.33705L6.20738 20.4774ZM16.4933 21.6981L16.0561 20.7987L16.4933 21.6981ZM17.7926 20.4774L18.663 20.9699L17.7926 20.4774ZM3 7H7V5H3V7ZM7.89443 6.44721L9.34164 3.55279L7.55279 2.65836L6.10557 5.55279L7.89443 6.44721ZM10.2361 3H13.7639V1H10.2361V3ZM7 7H17V5H7V7ZM17 7H21V5H17V7ZM14.6584 3.55279L16.1056 6.44721L17.8944 5.55279L16.4472 2.65836L14.6584 3.55279ZM13.7639 3C14.1427 3 14.489 3.214 14.6584 3.55279L16.4472 2.65836C15.939 1.64201 14.9002 1 13.7639 1V3ZM9.34164 3.55279C9.51103 3.214 9.8573 3 10.2361 3V1C9.09975 1 8.06096 1.64201 7.55279 2.65836L9.34164 3.55279ZM13.4906 21H10.5094V23H13.4906V21ZM6.71677 17.437L6.24805 9.93762L4.25195 10.0624L4.72066 17.5618L6.71677 17.437ZM17.7519 9.93762L17.2832 17.437L19.2793 17.5618L19.7481 10.0624L17.7519 9.93762ZM10.5094 21C9.69953 21 9.15055 20.9993 8.72481 20.9654C8.3112 20.9325 8.09656 20.8729 7.9439 20.7987L7.06944 22.5974C7.53787 22.8251 8.03071 22.9165 8.56624 22.9591C9.08964 23.0007 9.73146 23 10.5094 23V21ZM4.72066 17.5618C4.76919 18.3382 4.80849 18.9788 4.88268 19.4986C4.9586 20.0304 5.08054 20.5166 5.33705 20.9699L7.0777 19.985C6.99411 19.8372 6.92124 19.6267 6.86261 19.216C6.80226 18.7932 6.76728 18.2453 6.71677 17.437L4.72066 17.5618ZM7.9439 20.7987C7.57938 20.6215 7.27731 20.3377 7.0777 19.985L5.33705 20.9699C5.73626 21.6754 6.34041 22.243 7.06944 22.5974L7.9439 20.7987ZM13.4906 23C14.2685 23 14.9104 23.0007 15.4338 22.9591C15.9693 22.9165 16.4621 22.8251 16.9306 22.5974L16.0561 20.7987C15.9034 20.8729 15.6888 20.9325 15.2752 20.9654C14.8494 20.9993 14.3005 21 13.4906 21V23ZM17.2832 17.437C17.2327 18.2453 17.1977 18.7932 17.1374 19.216C17.0788 19.6267 17.0059 19.8372 16.9223 19.985L18.663 20.9699C18.9195 20.5166 19.0414 20.0304 19.1173 19.4986C19.1915 18.9788 19.2308 18.3382 19.2793 17.5618L17.2832 17.437ZM16.9306 22.5974C17.6596 22.243 18.2637 21.6754 18.663 20.9699L16.9223 19.985C16.7227 20.3377 16.4206 20.6215 16.0561 20.7987L16.9306 22.5974Z" fill="#333333" />
                                       </svg>
                                    </li>
                                    <li className="buttons-task__button" onClick={() => startEditTask(item)}>
                                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path fillRule="evenodd" clipRule="evenodd" d="M15.1845 4.48309C16.5702 3.09736 18.8612 3.25697 20.0414 4.82145C21.0433 6.14966 20.8709 8.02198 19.6433 9.14493L10.0591 17.9119C9.6623 18.2749 9.19206 18.5483 8.6803 18.7135L5.69567 19.6772C4.72574 19.9904 3.80888 19.0735 4.12205 18.1036L5.06416 15.1858C5.24672 14.6205 5.56099 14.1066 5.9811 13.6864L15.1845 4.48309ZM16.2006 10.2612L13.8641 7.92477L7.04176 14.7471C6.7897 14.9992 6.60113 15.3075 6.4916 15.6467L5.69957 18.0997L8.2194 17.2861C8.52646 17.1869 8.8086 17.0229 9.04668 16.8051L16.2006 10.2612Z" fill="#333333" />
                                       </svg>
                                    </li>
                                 </ul>
                              </div>) : ''}
                        </div>
                        <div className="board-inner__footer">
                           <button className="board-inner__add-button" onClick={() => addTaskCallback(board.id, board.colorLabel)}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M12.0001 4.8L12 19.2M19.2001 12L4.80005 12" stroke="#CABAD4" strokeWidth="4" strokeLinecap="round" />
                              </svg>
                              <span>{t("add_task")}</span>
                           </button>
                           <div style={{
                              backgroundColor: `${board.colorLabel}`,
                              width: '85px',
                              height: '15px',
                              borderRadius: '24px'
                           }}>
                           </div>
                        </div>
                     </div>
                  </div>)}
            </div>
         </div>
      </DeleteTasksBoardContext.Provider>
   );
}