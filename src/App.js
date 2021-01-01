import React, { Component } from 'react';
import Definition from "./components/Definition";
import Link from  "./components/Link";
import Subject from "./components/Subject";
import './App.css';   //App이라는 이름의 App.js안에 들어있는 react의 component가 load됬을떄 App.css도 같이 load됨 (디자인)
                      //즉, APP이라는 컴포넌트의 디자인을 그 앱안에 넣는다.

// class Subject extends Component { //서브젝트라는 클래스를 만들겠다.
//     render () {   //함수 : 클래스안에 들어있는 함수는 function 키워드 없이 작성 가능
//       return (    //컴포넌트를 만들때 하나의 최상의 태그만 사용해야한다
//         <header>
//         {/* <h1>WEB</h1>      //기존의 코드를 아래의 코드로 
//         world wide web! */} 
//         <h1>{this.props.title}</h1> {/*리팩토링*/}
//         {this.props.sub}

//     </header>
//     );
//   }
// }


// class Link extends Component { //서브젝트라는 클래스를 만들겠다.
//   render () {   //함수 : 클래스안에 들어있는 함수는 function 키워드 없이 작성 가능
//     return (    //컴포넌트를 만들때 하나의 최상의 태그만 사용해야한다
//       <nav>
//     <ul>
//         <li><a href="1.html"></a>HTML</li>
//         <li><a href="2.html"></a>CSS</li>
//         <li><a href="3.html"></a>JavaScript</li>
//     </ul>
// </nav>
//   );
// }
// }


// class Definition extends Component { //서브젝트라는 클래스를 만들겠다.
//   render () {   //함수 : 클래스안에 들어있는 함수는 function 키워드 없이 작성 가능
//     return (    //컴포넌트를 만들때 하나의 최상의 태그만 사용해야한다
//     <article>
//       {/*<h2>HTML</h2>
//          HTML is HyperText Markup Language      //기존의 코드 */}
//       <h2>{this.props.title}</h2>
//       {this.props.desc}       {/*리팩토링*/}
//     </article>
//   );
// }
// }


// class App extends Component { //컴포넌트를 만드는 코드( App클래스 , react의 component를 상속, 그 클래스는 render라는 메소드를 가지고있다.)
//     render () {
//       return (
//       <div className="App">
//        <Subject title="WEB" sub="world wide"></Subject> {/*이처럼 태그 속성사용하듯이 사용하여 입력 하여 변경할 수 있음*/}
//        <Subject title="React" sub="For UI"></Subject>   {/*완벽하게 작동하는 사용자 정의 태그를 만들어봄 */}
//        <Link></Link>
//         <Definition title ="HTML" desc="HTML is HyperText Markup Language"></Definition>
//       </div>
//     );
//   }
// }

//State 사용
class App extends Component { 
  constructor(props){  
    super(props);   //states 값을 초기화 하려고함 - 어떤 컴포넌트가 실행될때 render()함수보다 먼저 실행되면서 초기화시켜주고싶은 코드는 construcror(props){ super(props);    }안에 넣는다
    this.state  = { //내부적으로 사용하려고 할 떄 state 사용 - 핵심
      mode: "read",
      welcome: {title: "Welcome", desc: "Hello, React!!!"},
      subject: {title: "WEB", sub:"World Wid Web!!"},
      contents: [   //프로퍼티가 여러개라서 배열로 작성
        {id : 1, title: "HTML", desc:"HTML is for infrmation"},
        {id : 2, title: "CSS", desc:"CSS is for design"},
        {id : 3, title: "JavaScript", desc:"JavaScript is for interactive"}
        
      ] 
    }
  }
  //state에 대해서 알아야할 중요한 사실 : 리액트에서 state의 값이 바뀌면 state를 가지고 있는 컴포넌트의 render() 함수가 다시호출됨
  //render() 함수가 다시 호출됨에 따라서 그 render() 함수 하위에있는 각 컴포넌트들의 각 render() 함수들이 싹다 다시 호출된다 
  //즉, props나 state의 값이 바뀌면 해당되는 render() 함수가 호출되게 약속되어있다. ( 화면이 다시그려진다!!!!!)

  render () {
    console.log("App render");
    var _title, _desc = null;
    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }
    else if(this.state.mode === "read"){
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }
    console.log("render", this ); //여기서 this는 자기 자신을 가르킨다.
    return (
      //this.state.subject.title 을 자바스크립트로 작성해야하기에 { }로 감싸준다 "" 로 감싸게되면 문자로 인식하여 그대로 출력된다
      /*핵심 : 상위 컴포넌트인 APp의 상태를 하위컴포넌트로 전달하고 싶을떄는  상위컴포넌트의 state 값을 하위 컴포넌트의 props의 값으로 전달하는것은 가능하다!*/
    <div className="App">
    <Subject title={this.state.subject.title}   
              sub={this.state.subject.sub}
              onChangePage={function(){
                this.setState({mode:"welcome"});
              }.bind(this)}
              >     
    </Subject>

    {/* <header>
        <h1><a href="/" onClick ={function(e){   // 이벤트 종료시 페이지가 리로드 되지 않게 하려면 href로 이동한다는 기본적인 동작방법이 있는데 이걸 못하게 해야한다.
          console.log(e);
          e.preventDefault(); //이벤트가 발생한 태그의 기본동작 방법을 막게하는 것!!! -> 리로드 되지않고 그대로!!!
          //this.state.mode = "welcome";
          this.setState({
            mode:"welcome"
          });
        }.bind(this)}>{this.state.subject.title}</a></h1> 
        {this.state.subject.sub}
    </header> */}

    {/*react에서는 onClcik 이고 { } 안에 담아야함*/}
     
     <Link onChangePage={function(){
        alert("hi");
        this.setState({mode: "read"});
     }.bind(this)} 
      data={this.state.contents}>
    </Link>
      <Definition title={_title} desc={_desc}></Definition>
    </div>
   );
  }
}   

    // 유사 javascript 이나 javascript는 아니다.(콘솔창에 쳐보면 문법오류남)
    // 따옴표나 역슬래시 등을 사용하지않고 태그들을 그대로 사용해서 페이스북에서 만든 JSX 라는것!!!
    // JSX 를 작성하면 create-react-app이 javascript 코드로 컨버팅 해준다.

export default App;