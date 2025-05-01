import bglight from './images/bg-desktop-light.jpg'; import bgdark from './images/bg-desktop-dark.jpg';
import { useEffect } from 'react';
import { ReactComponent as IconMoon } from "./images/icon-moon.svg";
import { useState } from 'react';
import './App.css';
import { ReactComponent as Iconcheck } from "./images/icon-check.svg";
import { ReactComponent as Iconcross } from './images/icon-cross.svg';
import { ReactComponent as IconSun } from './images/icon-sun.svg';
import  {v4 as uuidv4} from 'uuid';

/*

function UploadedTask({ texts }) {

  return (<div className='enter'>
    <button>
      <Circle />
    </button>
    <div>
          {texts.map((text,index) =>{
  <div key={index} >{text}</div>
})}
  </div>
    </div>

  );

}


/*
function Head() {
  
  return (

    

    <div className='header'>
      <div>TODO</div>
     
 
   {/*<button onClick={setColour(!colour)}>
    <IconMoon />
     </button> }      
</div>

   );
   }

*/




function TextUploader({grace}) {

  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [textArray, setTextArray] = useState([]);
   const [filter, setFilter] = useState("all");  
  const [toggle,setToggle]= useState(true);


  const handleSubmit = () => {
if(text.length>=3){
  setCount(count + 1);
}
    

    if (text.trim() !== "") {
      setTextArray([...textArray, {id : uuidv4(), element: text.trim(), status : "active"}]);
      setText("");
    }
  };


 const filteredTasks = textArray.filter(things => {
    if (filter === "all" && things.status!=="delete") return true;
    return things.status === filter;
  });

  const all = () => {
    setFilter("all");
  }

  const handletoggle=()=>{
    setToggle(!toggle);
  }

  const active = () => {
    setFilter("active");
  }

  const complete = () => {
    setFilter("completed");
  }


const arr = document.getElementsByClassName("main");

for(let i=0 ; i<=arr.length-1;i++){
  arr[i].addEventListener("mouseover", ()=>{
    arr[i].getElementsByClassName("cross")[0].style.display="block";
  });
  arr[i].addEventListener("mouseout", ()=>{
    arr[i].getElementsByClassName("cross")[0].style.display="none";
  });
}



 const element = <div className='full'>


     {/* {textArray.map((item) => (

     <div key={item.id}>
        <button onClick={() => {
          if (count >= 1) {
            setCount(count - 1)
          }
        }}
          style={{
            backgroundColor: "inherit", border: "none"
         }}>
        
        </button>

        <p>
          {item.element} 
        </p>
        
      </div>

    ))}*/}
 
{filteredTasks.map(task => (

            <div className="main" key={task.id}>
             {/* <span onClick={console.log("Hey, dude")}>
                 
              </span>
              */}
              <button onClick={()=>{
                //setToggle(!toggle);
                if(task.status==="active"){
                 // complete();
                  task.status="completed";
                  setCount(count-1);
                }else if(task.status==="completed") {
                 // active();
                  task.status="active";
                  setCount(count + 1);
                }
                }}    className='but'>
                 <Circle />
              </button>
          
          {
          (filter ===  "all" && task.status==="completed")?<s>{task.element}</s>:
          <p>{task.element}</p>
          }
             
              

<button className='cross' onClick={()=>{task.status="delete";
setCount(count-1);

}}>
<Iconcross />
</button>

            </div>
          ))
          }



  </div>;



useEffect(()=>{
   filteredTasks.forEach(task =>{
    if (task.status==="completed"){
      task.status="delete";
    }
  })
},[filteredTasks,toggle]);

/*
  const [tasks, setTasks] = useState([
    { id: 1, title: "Buy groceries", status: "active" },
    { id: 2, title: "Clean house", status: "completed" },
    { id: 3, title: "Study React", status: "active" },
  ]);
  */
 
 

  return (
  

      <div>
          <div>  


          <div className='upload'>
              <button onClick={handleSubmit} className='but'><Circle /></button>
            <textarea

              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your to-do..."
            />

          </div>

          
<div className='upCon'>


            <Content ele={element} tele={grace}/>

            {/*


                     {setCount(count + 1)}*/}

          
            <div className='forChange'>
        <LeftItems num={count} />
 <Manage all={all} active={active} complete={complete} />
        {/*  <Tes />*/}
        <ClearItems remove={handletoggle} />
      
</div>


             
            </div>



               {/* <Modification num={count} /> */} 
          </div>


</div>
    

      );
    }

/*
function TextUploader() {

  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [textArray, setTextArray] = useState([]);
 
  const [filter, setFilter] = useState("all");  
  
  const handleSubmit = () => {
if(text.length>=1){
  setCount(count + 1);
}
    

    if (text.trim() !== "") {
      setTextArray([...textArray, {element: text.trim()]);
      setText("");
    }
  };


 const filteredTasks = textArray.filter(things => {
    if (filter === "all") return true;
    return things.status === filter;
  });

  const all = () => {
    setFilter("all");
  }


  const active = () => {
    setFilter("active");
  }

  const complete = () => {
    setFilter("completed");
  }




  const element = <div className='full'>


    {textArray.map((item, index) => (

      <div key={index}>
        <button onClick={() => {
          if (count >= 1) {
            setCount(count - 1)
          }
        }}
          style={{
            backgroundColor: "inherit", border: "none"
         }}>
          <Circle />
        </button>

        <p>
          {item}
        </p>
        
      </div>

    ))}

{filteredTasks.map(task => (

            <div key={task.id}>
              {task.title} --<em>{task.status}</em>
            </div>
          ))
          }


  </div>;

  /*
  const [tasks, setTasks] = useState([
    { id: 1, title: "Buy groceries", status: "active" },
    { id: 2, title: "Clean house", status: "completed" },
    { id: 3, title: "Study React", status: "active" },
  ]);
  */
 
 /*

  return (
  <>

      <div>




        <div>
          



          <div className=''>
            <button onClick={handleSubmit} style={{
              backgroundColor: "inherit", border: "none"

            }}><Circle /></button>
            <textarea

              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your to-do..."
            />



            <Content ele={element} />

            {/*


         {setCount(count + 1)}*/
/*
            <div>
            <div className='forChange'>
        <LeftItems num={count} />
 <Manage all={all} active={active} complete={complete} />
        {/*  <Tes />*/
    /*    <ClearItems />
      </div>

             
            </div>



               {/* <Modification num={count} /> */
        /*  </div>


        </div>
</div>
      </>

      );
}*/

/*

function Tes(){

  const [tasks, setTasks] = useState([
      {id: 1, title: "Buy groceries", status: "active" },
      {id: 2, title: "Clean house", status: "completed" },
      {id: 3, title: "Study React", status: "active" },
      ]);

      const [filter, setFilter] = useState("all"); 
  
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
      return task.status === filter;
  });
  
  const all=()=>{
        setFilter("all");
  }

    
  const active=()=>{
        setFilter("active");
  }
    
  const complete=()=>{
        setFilter("completed");
  }


      return (
      <div>




        <ul>
          {filteredTasks.map(task => (
            <div key={task.id}>
              {task.title} - <em>{task.status}</em>
            </div>
          ))}
        </ul>

        <Manage all={all} active={active} complete={complete} />
      </div>


      );
  

}*/


      function Content({ele,grace}) {

  return (
      <div className={grace?"bCon":"Con"}>

      
          {ele}

      
      </div>
      );
}


      function LeftItems({num}) {
  return (

      <div>
        {num} Items left
      </div>

      );
}



      function ClearItems({remove}) {
  return (
      <div>
        <button onClick={remove} className='all'>
            Clear Completed
        </button>
      
      </div>
      );
}
/*
      function Modification({number}) {

  return (

      <div className='forChange'>
        <LeftItems num={number} />

        {/*  <Tes />*/
       /* <ClearItems />
      </div>


      );
}*/


      function Background({back}) {
  return (

      <div className=''>
        <img src={back ? bglight : bgdark} alt="cool for me" />
      </div>
      );
}

      function Circle() {

          const [us, setIs] = useState(false);
          const size = 20;
          const stroke = 0.5;
          const radius = (size - stroke) / 2;
          const circumference = 2 * Math.PI * radius;
        
          return (
            <div>
              <button
                onClick={() => setIs(!us)}
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
                    fill={us ? 'url(#grad1)' : 'none'}
                    strokeWidth={stroke}
                  />
        
                  {us && (
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


      function Container({text}) {





  return (
      <div >


        

        <TextUploader grace={text}/>
    
      </div>
      );
}




      function App() {

 const [colour, setColour] = useState(true);



      function handleColour() {
        setColour(!colour);
  }


  useEffect(() => {
    if (colour) { document.body.style.backgroundColor = 'white'; // light
      document.body.style.color = 'black'; // black text
      document.getElementsByClassName("upload")[0].style.backgroundColor="white";
      document.getElementsByClassName("upCon")[0].style.backgroundColor="white";
      document.getElementsByClassName("upCon")[0].style.color="black";
      document.getElementsByClassName("Con")[0].style.backgroundColor="white";
      document.getElementsByClassName("Con")[0].style.color="black";

    } else {
      document.getElementsByClassName("upload")[0].style.backgroundColor="black";
     document.getElementsByClassName("upCon")[0].style.backgroundColor="black";
      document.getElementsByClassName("upCon")[0].style.color="white";
      document.getElementsByClassName("Con")[0].style.backgroundColor="black";
      document.getElementsByClassName("Con")[0].style.color="white";
     document.body.style.backgroundColor = 'black'; // dark
      document.body.style.color = 'white'; // white text
    }

    // Optional cleanup
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, [colour]);


      return (
      <div className="App">
     
        <Background back={colour} />

        <div className='newCon'> 
          <div className='header' style={{ backgroundColor: "transparent" }}>
          <div className='todo'>TODO</div>


          <button onClick={handleColour} style={{
            backgroundColor: "inherit", border: "none"

          }}>

            {
              colour ? <IconMoon /> : <IconSun />
            }

          </button>
           
       
        </div>
        <Container text={colour}/>
        </div>
        
      </div>
      );

}

      function Manage({all, active, complete}) {

 return (
      <div className='Modification'>
        <button onClick={all} onMouseOver={()=>{
         // document.getElementsByClassName("all")[0].style.fontSize = "25px";
        }
                
        } 
        className='all'>All</button>
        <button onClick={active} className='active'> Activate</button>
        <button onClick={complete} className='complete'> Completed</button>

      </div>
      );
}

export default App;

