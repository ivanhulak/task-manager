import { createContext, useEffect, useState } from 'react';
import { Boards } from './components/Boards/Boards';
import { AddIcon } from './components/common/Icons/AddIcon';
import { CreateTaskForm } from './components/CreateTaskForm/CreateTaskForm';
import { Header } from './components/Header/Header';
import './index.scss';

export const TaskContext = createContext(null);

function App() {
  const [createMode, setCreateMode] = useState(false)
  const [currentBoardId, setCurrentBoardId] = useState(null)
  const [taskRequired, setTaskRequired] = useState(false)
  const [boards, setBoards] = useState(() => {
    const boards = localStorage.getItem('boards');
    if (boards) {
      return JSON.parse(localStorage.getItem('boards'));
    } else {
      return [];
    }
  })

  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(boards))
  }, [boards])
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [createMode])

  const createModeCallback = () => {
    setCreateMode(!createMode)
    setTaskRequired(false)
  }
  const updateBoardsCallBack = (data) => {
    if (data.id === currentBoardId) {
      setBoards(boards.map(b =>
        b.id === currentBoardId
          ? { ...b, items: [...b.items, data.items[0]], colorLabel: data.colorLabel }
          : b))
      setCurrentBoardId(null)
    } else {
      setBoards([...boards, data])
    }
  }
  const addTaskCallback = (id) => {
    setCurrentBoardId(id)
    setCreateMode(prev => !prev)
    setTaskRequired(true)
  }

  return (
    <div className='container'>
      <div className='wrapper'>
        <Header createModeCallback={createModeCallback} />

        <main className="content">
          <CreateTaskForm
            createMode={createMode}
            createModeCallback={createModeCallback}
            updateBoardsCallBack={updateBoardsCallBack}
            currentBoardId={currentBoardId}
            taskRequired={taskRequired} />
          <TaskContext.Provider value={{ addTaskCallback }}>
            <Boards
              boards={boards}
              setBoards={setBoards} />
          </TaskContext.Provider>
          {(boards.length === 0 && !createMode) && <div className='empty' onClick={createModeCallback}>
            <span>Empty</span>
            <AddIcon />
          </div>}
        </main>

        <footer className="footer">
          <p className="footer__text">
            Made by Ivan Hulak 2023 ©
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
