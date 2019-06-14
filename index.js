import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import './index.css';
const elementData = require("./data.json");
const elements =
    ["H","He"
    ,"Li","Be",                                                     "B", "C", "N", "O", "F", "Ne"
    ,"Na","Mg",                                                     "Al","Si","P", "S", "Cl","Ar"
    ,"K","Ca",  "Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn",   "Ga","Ge","As","Se","Br","Kr"
     ,"Rb","Sr", "Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd",   "In","Sn","Sb","Te","I", "Xe"
     ,"Cs","Ba",
                 "La","Ce","Pr","Nd","Pm","Sm","Eu","Gb","Tb","Dy","Ho","Er","Tm","Yb"
                ,"Lu","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg",  "Tl","Pb","Bi","Po","At","Rn"
    ,"Fr","Ra",
                "Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No",
                "Lr","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn",   "Nh","Fl","Mc","Lv","TS","Og"];



function Element  (props) {
return(
    <button style={{'backgroundColor':props.color } } className="Element" onClick={props.onClick}>
        <p id="AtomicNumber">{props.element+1}</p>   <h1>  {elements[props.element]} </h1>  {elementData.elements[props.element][2]}
        </button>
    )
}
function PerodicTable(props){
        let ff=0;
        if(props.wide){
            ff=14;
        }
        let table=[ ];
        let group =1;
        let period = 1;
        //const s=2;
        const p=6;
        const d=10;
        const f=14;
        let colors = createColorArray(props.colorScheme);

        let row=[];
        let lant=[ <td key={-200}></td>  , <td key={-201}></td>  ];
        let acc=[  <td key={-202}></td>  , <td key={-203}></td>    ];

        for (let i=0; i<elements.length; i++){
            switch (period){
                case 1:
                        if(group===1){
                            row.push(<td key={i}> <Element color={colors[i]} element={i} onClick={()=>props.handleClick(i)} /></td>);
                            group++;
                        }
                        else{
                            for(let j=0;j<p+d+ff;j++){
                                row.push(<td key={-j-1}> </td>);
                            }
                            row.push(<td key={i}> <Element color={colors[i]} element={i} onClick={()=>props.handleClick(i)} /></td>);
                            table.push(<tr key={period}>{row}</tr> );
                            row=[];
                            group=1;
                            period++;
                        }
                break

                case 2: case 3:
                       row.push(<td key={i}> <Element color={colors[i]} element={i} onClick={()=>props.handleClick(i)} /></td>);
                        group++;
                        if(group === 3){
                           for(let j=0;j<d+ff;j++){
                               row.push(<td key={-j-p-d-ff-2}> </td>);
                               group++
                            }
                            group-=ff;
                        }
                        else if(group===19){
                            table.push(<tr key={period}>{row}</tr> );
                            row=[];
                            group=1;
                            period++;
                            }
                break;

                case 4:
                case 5:
                    row.push(<td key={i}> <Element color={colors[i]} element={i} onClick={()=>props.handleClick(i)} /></td>);
                    group++;

                    if(group === 4)
                        for(let j=0;j<ff;j++){
                            row.push(<td key={-300-j}></td>);
                        }

                    if(group===19){
                          table.push(<tr key={period}>{row}</tr> );
                          row=[];
                          group=1;
                          period++;
                      }

                break;

                case 6:
                case 7:
                        if(group===4 && !props.wide){
                                for(let j=i-1;j<i+f;j++){
                                    if(period===6)
                                        lant.push((<td key={j}> <Element color={colors[j]} element={j}  onClick={()=>props.handleClick(j)}/></td> ));
                                    else
                                        acc.push((<td key={j}> <Element  color={colors[j]}  element={j} onClick={()=>props.handleClick(j)} /></td> ) );
                                }
                            i+=f;
                        }
                               row.push(<td key={i}> <Element color={colors[i]} element={i} onClick={()=>props.handleClick(i)} /></td>);
                    group++;
                        if(group===19+ff){

                            table.push(<tr key={period}>{row}</tr> );
                            row=[];
                            group=1;
                            period++;
                        }
                break;
                default:
                    break;
            }
        }
        table.push( <tr key={8}></tr>, <tr key={9}>{lant}</tr> , <tr key={10}>{acc}</tr> );
    return  <table className="PeriodicTable" ><tbody id="PeriodicTable">{table}</tbody></table>
        }

function elementInfo(props){
        const fields = ["AtomicNumber","Symbol","Name","AtomicMass", "CPK HexColor", "Electronic Configuration", "Electronegativity", "Atomic radius", "Ion radius", "Van-Der-Waals radius", "IonizationEnergy", "ElectronAffinity", "Oxidation states", "Standard state", "Bonding type", "Melting point", "Boiling point","Density", "Group block", "Year Discovered"];

        let r = [];
        for(let i=0;i<fields.length;i++){
            r.push( <tr key={i}><td> {fields[i]} </td><td align="right">{props[i]}</td></tr> );
          }
        r.push( <tr key={fields.length}><td> {"Wikipedia"} </td><td align="right"><a href={"https://en.wikipedia.org/wiki/"+props[2]} target='_blank'> {props[2]} </a> </td></tr> );



    return <table><tbody id="elements"> {r} </tbody></table>
}

function getElementInfo(query,cb){
    return elementData.elements[query];
}




function ColorChooser(props){
    return  <select onChange={props.onChange} >
        <option value={0}>Groups</option>
        <option value={1}>CPK colors</option>
        <option value={2}>Electronegativity</option>
        <option value={3}>Block</option>
        <option value={4}>None</option>
    </select>
}

class Controller extends React.Component{
    constructor(props){
        super(props);
        this.state={
            element: 1,
            selected:0,
            lastIndex: -1,
            wide: false,
            update: 0,
            colorScheme: 0,
        }
    }
    render(){
        let perTable = <div onClick={this.handleClick} > {PerodicTable( {handleClick:this.elementClick, wide:this.state.wide, colorScheme:this.state.colorScheme} )} </div>;

        let elInfo='';
        if (this.state.selected){
            elInfo=  <div>{elementInfo(this.state.element)} </div>;
        }
        return (<div>
                {perTable}
                {elInfo}
                <button onClick={this.toggleWide} > Set Wide </button>
                <ColorChooser onChange={this.selectColor}></ColorChooser>
            </div>);
    }
     toggleWide=function(){
           this.setState({wide:!this.state.wide})
        }.bind(this)

    setElement=function(info){
         this.setState({element:info,update:1});
         //this.setState({selected:1});
    }.bind(this)

    selectColor=function(event){
        console.log(event.target.value);
        this.setState({colorScheme:event.target.value});
    }.bind(this)

    handleClick=function(){
        this.setState((prevState, props) => (
        {selected: prevState.update? 1:0,update:0}));
//        if(this.state.selected && this.state.element!=0){
//            this.setState({selected:0,lastIndex:-1,element:0});
//        }
    }.bind(this)

   elementClick = function (index){
       if(index===this.state.lastIndex){
           this.setState({ selected:0,lastIndex:-1,element:0,update:0})
           return;
       }
       this.setElement( getElementInfo(index));
       this.setState({lastIndex:index})
   }.bind(this)
}

ReactDOM.render(
  <Controller/>,
  document.getElementById('root')
);

function createColorArray(colorScheme){
    const groupColors=[ "#ffccff","#ccffff",  "#ffffcc", "#ffffaa", "#00ffff", "#ffaaff", "#ccffcc", "#ccccff", "#ffcccc", "#aaaaff", "#aaffaa",  "#ffaaaa", "#aaccaa","#ccaaaa","#aaaacc","#ccccaa","#aacccc","#ccaacc", "#ff00ff", "#00ffff"]
    let colors=[];
    let c = Number(colorScheme)
    switch(c){
        case 0:
        for(let i=1;i<elements.length+1;i++){
            if(i===3||i===11||i===19||i===37||i===55||i===87)
                colors[i-1]=groupColors[0]
            else if(i===4||i===12||i===20||i===38||i===56||i===88)
                colors[i-1]=groupColors[1]
            else if(i===21 ||i===39)
                colors.push(groupColors[2])
            else if(i===22 ||i===40||i===72||i===104)
                colors.push(groupColors[3])
            else if(i===23 ||i===41||i===73||i===105)
                colors.push(groupColors[4])
            else if(i===24 ||i===42||i===74||i===106)
                colors.push(groupColors[5])
            else if(i===25 ||i===43||i===75||i===107)
                colors.push(groupColors[6])
            else if(i===26 ||i===44||i===76||i===108)
                colors.push(groupColors[7])
            else if(i===27 ||i===45||i===77||i===109)
                colors.push(groupColors[8])
            else if(i===28 ||i===46||i===78||i===110)
                colors.push(groupColors[9])
            else if(i===29 ||i===47||i===79||i===111)
                colors.push(groupColors[10])
            else if(i===30 ||i===48||i===80||i===112)
                colors.push(groupColors[11])
            else if(i===5 ||i===13||i===31||i===49||i===81||i===113)
                colors[i-1]=groupColors[12]
             else if(i===6 ||i===14||i===32||i===50||i===82||i===114)
                colors[i-1]=groupColors[13]
            else if(i===7 ||i===15||i===33||i===51||i===83||i===115)
                colors[i-1]=groupColors[14]
            else if(i===8 ||i===16||i===34||i===52||i===84||i===116)
                colors[i-1]=groupColors[15]
            else if(i===9 ||i===17||i===35||i===53||i===85||i===117||i===1 )
                colors[i-1]=groupColors[16]
            else if(i===10 ||i===18||i===36||i===54||i===86||i===118||i===2)
                colors[i-1]=groupColors[17]
            else if ( i=== 57| i=== 58|i=== 59 |i===60| i===61| i===62 |i===63 |i===64 |i===65 |i===66 |i===67| i===68|i=== 69| i===70|i=== 71 )
                colors[i-1]=groupColors[18]
            else if ( i=== 89| i=== 90|i=== 91 |i===92| i===93| i===94 |i===95 |i===96 |i===97 |i===98 |i===99|i===100|i=== 101| i===102|i=== 103 )
                colors.push(groupColors[19])
        }
    break;

    case 1:
        for(let i=0;i<elements.length;i++){
            colors.push("#"+elementData.elements[i][4])
        }
    break;
       case 2:
           for(let i=0;i<elements.length;i++){
            let red= Math.round( elementData.elements[i][6] * (255/4))
            let blue= 255-red;
            colors.push("rgb(" +red+",126,"+blue+")")
        }
    break;
    case 3:
        for(let i=0;i<elements.length;i++){
            switch(elementData.elements[i][18]){
                case "nonmetal":
                     colors.push("#ff22ff")
                break;
                case "alkali metal":
                    colors.push("#22ffff")
                break;
                case "alkaline earth metal":
                    colors.push("#aaffff")
                break;
                case "metal":
                    colors.push("#ffff22")
                break;
                case "transition metal":
                    colors.push("#ffffaa")
                break;
                case "metalloid":
                    colors.push("#ffaaaa")
                break;
                case "halogen":
                    colors.push("#aaaaaa")
                break;
                case "noble gas":
                    colors.push("#22ff22")
                break;
                case "post-transition metal":
                    colors.push("#2222ff")
                break;
                case "lanthanoid":
                    colors.push("#ffaaaa")
                break;
                case "actinoid":
                    colors.push("#aaaaff")
                break;

                default:
                    colors.push("#ffffff")
                    break;
            }
        }
        break;
       default:
           break;
    }
    return colors;
}
