import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {

  const [filesContent,setFilesContent] = useState(
                                         {
                                           originalfile:[],
                                           comparedfile:[]
                                         }
                                         );

  const [compare,setCompare] = useState(false);

  // const colorizedLine = (line)=>{
  //     if(line.added)
  //     {
  //       return <span style={{backgroundColor:'lightgreen'}}>{line.value}</span>;
  //     }
  //     else if(line.removed)
  //     {
  //       return <span style={{backgroundColor:'pink'}}>{line.value}</span>
  //     }
  //     else 
  //     {
  //       return <span>{line.value}</span>
  //     }
  // };


  // const compareFiles = () =>{
  //      var newOriginalFileArray = [];
  //      var newComparedFileArray = [];
  //      filesContent.originalfile.length >= filesContent.comparedfile.length ? 
  //       filesContent.originalfile.forEach((line,lineIndex)=>
  //       {console.log(line)
  //        var newLineOriginalFile = '';
  //        var newLineComparedFile = '';
  //        line.split(' ').forEach((word,wordIndex)=>
  //        {
  //         word == filesContent.comparedfile[lineIndex].split(' ')[wordIndex] ? newLineComparedFile = newLineComparedFile+word+' ':newLineComparedFile = newLineComparedFile+`<span style={{color:'green'}}>${filesContent.comparedfile[lineIndex].split(' ')[wordIndex]}</span>`+' ';
  //         word == filesContent.comparedfile[lineIndex].split(' ')[wordIndex] ? newLineOriginalFile = newLineOriginalFile+word+' ':newLineOriginalFile = newLineOriginalFile+`<span style={{color:'red'}}>${filesContent.originalfile[lineIndex].split(' ')[wordIndex]}</span>`+' '
  //        } 
        
  //       )
  //       newOriginalFileArray.push(newLineOriginalFile);
  //       newComparedFileArray.push(newLineComparedFile);
  //       }
  //      )
  //     :filesContent.comparedfile.forEach((line,lineIndex)=>
  //      line.split(' ').forEach((word,wordIndex)=>{
  //        var newLineOriginalFile = '';
  //        var newLineComparedFile = '';
  //        word === filesContent.originalfile[lineIndex][wordIndex]?newLineOriginalFile=newLineOriginalFile+filesContent.originalfile[lineIndex][wordIndex]+' ':newLineOriginalFile=newLineOriginalFile+<span style={{color:"red"}}>{filesContent.originalfile[lineIndex][wordIndex]}</span>+' '
  //        word === filesContent.originalfile[lineIndex][wordIndex]?newLineComparedFile=newLineComparedFile+word+' ':newLineComparedFile=newLineComparedFile+<span style={{color:"green"}}>{word}</span>+' '})
  //     )
  //     var newFilesContent = {...filesContent};
  //     newFilesContent.originalfile = newOriginalFileArray;
  //     newFilesContent.comparedfile = newComparedFileArray;
  //     setFilesContent(newFilesContent);
  // };

  const handleChange = async (e) =>
  {
      e.preventDefault();
      const reader = new FileReader();
      var text = '';
      var fileName = e.target.name;
      reader.onload = async (e) => { 
                                    text = (e.target.result);
                                    const allLines = text.split(/\r\n|\n/);
                                    var newFilesContent = {...filesContent};
                                    newFilesContent[fileName] = [];
                                    allLines.forEach((line)=>
                                    newFilesContent[fileName].push(line));
                                    setFilesContent(newFilesContent);
                                   };
      reader.readAsText(e.target.files[0])
  };
  
  
  return (
    <div>
      <div  className="App">
      <input type="file" name="originalfile" id="originalfile" className="inputBgColor" onChange={(e)=>handleChange(e)}/>
      <input type="file" name="comparedfile" id="comparedfile" className="inputBgColor" onChange={(e)=>handleChange(e)}/>
      </div>
      
      { compare === false ? <div className="filescontainer">
        <div className="fileitem">
         {filesContent.originalfile.map((line,index)=><p key={index}>{`${index+1}.${line}`}</p>)} 
        </div>
        <div className="fileitem">
          {filesContent.comparedfile.map((line,index)=><p key={index}>{`${index+1}.${line}`}</p>)}
        </div>
      </div> : 
      <div className="filescontainer">
        <div className="fileitem">
          {filesContent.originalfile.map((line,lineIndex)=><p key={lineIndex}>{lineIndex+1}{'.'}
            {console.log("lineSplit",line.split(' '))}
            {line.split(' ').length>0 ?line.split(' ').map((word,wordIndex)=>filesContent.comparedfile[lineIndex] &&  word===filesContent.comparedfile[lineIndex].split(' ')[wordIndex]?word+' ':<span style={{color:'red',fontWeight:'bolder'}} key={wordIndex}>{word+' '}</span>) 
            :line === filesContent.originalfile[lineIndex]?line:<span style={{color:'green',fontWeight:'bolder'}} key={lineIndex}>{line+' '}</span>}
            </p>
          )}
        </div>
        <div className="fileitem">
          {filesContent.comparedfile.map((line,lineIndex)=><p key={lineIndex}>{lineIndex+1}{'.'}
            {console.log("lineSplit",line.split(' '))}
            {line.split(' ').length > 0 ? line.split(' ').map((word,wordIndex)=>filesContent.originalfile[lineIndex] && word===filesContent.originalfile[lineIndex].split(' ')[wordIndex]?word+' ':<span style={{color:'green',fontWeight:'bolder'}} key={wordIndex}>{word+' '}</span>)
             : line === filesContent.originalfile[lineIndex]?line:<span style={{color:'green',fontWeight:'bolder'}} key={lineIndex}>{line+' '}</span>          
            }
            </p>
          )}
        </div>
      </div>
      }
      <center><button type="button" onClick={()=>setCompare(!compare)} style={{backgroundColor:"green"}}>Compare</button></center>
    </div>
  );
}

export default App;
