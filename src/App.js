import bglight from './images/bg-desktop-light.jpg'; import bgdark from './images/bg-desktop-dark.jpg';
import { useEffect } from 'react';
import { ReactComponent as IconMoon } from "./images/icon-moon.svg";
import { useState } from 'react';
import './App.css';
import { ReactComponent as Iconcheck } from "./images/icon-check.svg";
import { ReactComponent as Iconcross } from './images/icon-cross.svg';
import { ReactComponent as IconSun } from './images/icon-sun.svg';
import { v4 as uuidv4 } from 'uuid';


function HandleInputTextForTask({ colorBoolean }) {

  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [textArray, setTextArray] = useState([]);
  const [filter, setFilter] = useState("all");
  const [toggle, setToggle] = useState(true);

  //handleSubmit is the function that does one the counting of the number of tasks 
  // and two the adddition of the task's text to an array
  const handleSubmit = () => {
    if (text.length >= 1) {
      setCount(count + 1);
    }

    if (text.trim() !== "") {
      setTextArray([...textArray, { id: uuidv4(), element: text.trim(), status: "active" }]);
      setText("");
    }
  };

   //if a task in textArray is no having delete as status and our filter is set to filter "all"
  const filteredTasks = textArray.filter((task) => {
    if (filter === "all" && task.status !== "delete") return true;
    return task.status === filter;
  });

  const filterAll = () => {
    setFilter("all");
  }

  const handletoggle = () => {
    setToggle(!toggle);
  }

  const active = () => {
    setFilter("active");
  }

  const complete = () => {
    setFilter("completed");
  }


//adding hover states to all the list
  const arr = document.getElementsByClassName("list-item");

  for (let i = 0; i <= arr.length - 1; i++) {
    arr[i].addEventListener("mouseover", () => {
      arr[i].getElementsByClassName("cross")[0].style.display = "block";
    });
    arr[i].addEventListener("mouseout", () => {
      arr[i].getElementsByClassName("cross")[0].style.display = "none";
    });
  }



  const element = <div className='list-container'>
    {filteredTasks.map(task => (

      <div className="list-item" key={task.id}>
   
        <button onClick={() => {
          //setToggle(!toggle);
          if (task.status === "active") {
            // complete();
            task.status = "completed";
            setCount(count - 1);
          } else if (task.status === "completed") {
            // active();
            task.status = "active";
            setCount(count + 1);
          }
        }} className='but'>
          <Circle />
        </button>
        {
          (filter === "all" && task.status === "completed") ? <s>{task.element}</s> :
            <p>{task.element}</p>
        }
        <button className='cross' onClick={() => {
          task.status = "delete";
          setCount(count - 1);

        }}>
          <Iconcross />
        </button>

      </div>
    ))
    }
  </div>;



  useEffect(() => {
    filteredTasks.forEach(task => {
      if (task.status === "completed") {
        task.status = "delete";
      }
    })
  }, [filteredTasks, toggle]);

  /*
    const [tasks, setTasks] = useState([
      { id: 1, title: "Buy groceries", status: "active" },
      { id: 2, title: "Clean house", status: "completed" },
      { id: 3, title: "Study React", status: "active" },
    ]);
    */



  return (


    <div>
         <div className='input-task'>
          <button onClick={handleSubmit} className='but'><Circle /></button>
          <textarea
           value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your to-do..."
          />
        </div>
        <div className='task-container'>
          <Content elt={element} tele={colorBoolean} />
          <div className='task-ctn-footer'>
            <ItemsLeft num={count} />
            <TaskManager filterAll={filterAll} active={active} complete={complete} />
            <ClearCompletedItems remove={handletoggle} />
          </div>
        </div>
    </div>


  );
}


function Content({ elt, colorBoolean }) {

  return (
    <div className={colorBoolean ? "content black" : "content white"}>
      {elt}
    </div>
  );
}


function ItemsLeft({ num }) {
  return (
    <div>
      {num} Items left
    </div>
  );
}



function ClearCompletedItems({ remove }) {
  return (
    <div>
      <button onClick={remove} className='all'>
        Clear Completed
      </button>

    </div>
  );
}


function TaskManager({ filterAll, active, complete }) {

  return (
    <div className='Modification'>
      <button onClick={filterAll} className='all'>All</button>
      <button onClick={active} className='active'> Activate</button>
      <button onClick={complete} className='complete'> Completed</button>

    </div>
  );
}


function Background({ colorBoolean }) {
  return (

    <div className=''>
      <img src={colorBoolean ? bglight : bgdark} alt="cool for me" />
    </div>
  );
}

function Circle() {

  const [bool, setBool] = useState(false);
  const size = 20;
  const stroke = 0.5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div>
      <button 
        onClick={() => setBool(!bool)}
        style={{ backgroundColor: 'inherit', border: 'none' }}
      >
        <svg width={size} height={size}>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'blue', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'pale blue', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="white"
            fill={bool ? 'url(#grad1)' : 'none'}
            strokeWidth={stroke}
          />

          {bool && (
            <foreignObject x="0" y="0" width={size} height={size}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Iconcheck />
              </div>
            </foreignObject>
          )}


          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="grey"
            fill="none"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={0}
            strokeLinecap="round"

          />


        </svg>
      </button>


    </div>
  );
}


function App() {

  const [colorBoolean, setColorBoolean] = useState(true);



  function handleColorBoolean() {
    setColorBoolean(!colorBoolean);
  }

  function handleColorUpdate(){
       if (colorBoolean) {
      document.body.style.backgroundColor = 'white'; // light
      document.body.style.color = 'black'; // black text
      document.getElementsByClassName("input-task")[0].style.backgroundColor = "white";
      document.getElementsByClassName("task-container")[0].style.backgroundColor = "white";
      document.getElementsByClassName("task-container")[0].style.color = "black";
    } else {
      document.getElementsByClassName("input-task")[0].style.backgroundColor = "black";
      document.getElementsByClassName("task-container")[0].style.backgroundColor = "black";
      document.getElementsByClassName("task-container")[0].style.color = "white";
      document.body.style.backgroundColor = 'black'; // dark
      document.body.style.color = 'white'; // white text
    }
  }


  useEffect(() => {
     handleColorUpdate()
    // Optional cleanup
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, [colorBoolean]);


  return (
    <div className="App">
      <Background colorBoolean={colorBoolean} />
      <div className='app-container'>
        <div className='header' style={{ backgroundColor: "transparent" }}>
          <div className='todo'>TODO</div>
          <button onClick={handleColorBoolean} style={{
            backgroundColor: "inherit", border: "none"
          }}>
            {
              colorBoolean ? <IconMoon /> : <IconSun />
            }

          </button>
        </div>
       <HandleInputTextForTask colorBoolean={colorBoolean} />
      </div>

    </div>
  );

}



export default App;

