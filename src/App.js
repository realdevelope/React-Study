import React, { Component } from 'react';
import UpdateDefinition from "./components/UpdateDefinition"
import CreateDefinition from "./components/CreateDefinition";
import ReadDefinition from "./components/ReadDefinition";
import Link from  "./components/Link";
import Subject from "./components/Subject";
import Control from "./components/Control";
import './App.css';   //App이라는 이름의 App.js안에 들어있는 react의 component가 load됬을떄 App.css도 같이 load됨 (디자인)
                      //즉, APP이라는 컴포넌트의 디자인을 그 앱안에 넣는다.
//State 사용
class App extends Component { 
  constructor(props){  
    super(props);         //states 값을 초기화 하려고함 - 어떤 컴포넌트가 실행될때 render()함수보다 먼저 실행되면서 초기화시켜주고싶은 코드는 construcror(props){ super(props);    }안에 넣는다
    this.max_content_id = 3;       //state로 안한 이유는 UI에 영향을 주는게 아니기떄문
    this.state  = {         //내부적으로 사용하려고 할 떄 state 사용 - 핵심
      mode: "create",         //read에서 create로 변경
      selected_content_id: 2,     //기본적으로 2번 컨택트가 선택되게
      welcome: {title: "Welcome", desc: "Hello, React!!!"},
      subject: {title: "WEB", sub:"World Wid Web!!"},
      contents: [         //프로퍼티가 여러개라서 배열로 작성
        {id : 1, title: "HTML", desc:"HTML is for infrmation"},
        {id : 2, title: "CSS", desc:"CSS is for design"},
        {id : 3, title: "JavaScript", desc:"JavaScript is for interactive"}    
      ] 
    }
  }
  //state에 대해서 알아야할 중요한 사실 : 리액트에서 state의 값이 바뀌면 state를 가지고 있는 컴포넌트의 render() 함수가 다시호출됨
  //render() 함수가 다시 호출됨에 따라서 그 render() 함수 하위에있는 각 컴포넌트들의 각 render() 함수들이 싹다 다시 호출된다 
  //즉, props나 state의 값이 바뀌면 해당되는 render() 함수가 호출되게 약속되어있다. ( 화면이 다시그려진다!!!!!)
  
  getReadContent(){
    var i = 0;
    while (i < this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
       }
       i = i + 1;
    }
  }
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadDefinition title={_title} desc={_desc}></ReadDefinition>
    }
    else if(this.state.mode === "read"){
       var _content = this.getReadContent();
       _article = <ReadDefinition title={_content.title} desc={_content.desc}></ReadDefinition>
    }
    else if(this.state.mode === "create"){
      _article = <CreateDefinition onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id + 1;
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        var _contents = Array.from(this.state.contents);    //기존 배열을 복사해서 새로 배열을 만듬
        _contents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents:_contents,
          mode:"read",
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></CreateDefinition>
    }

    else if(this.state.mode === "update"){
      _content = this.getReadContent();
      _article = <UpdateDefinition data={_content} onSubmit=
        {function(_id, _title, _desc){
          // this.state.contents.push(
          //   {id:this.max_content_id, title:_title, desc:_desc}
          // );
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _contents.length){
            if(_contents[i].id === _id){
              _contents[i] = {id:_id, title:_title, desc:_desc};
              break;
            }
            i = i + 1;
          }
          this.setState({
            contents:_contents
          });
          console.log(_title, _desc);
        }.bind(this)}></UpdateDefinition>
    }
    return _article;
  }

  render () {
    console.log("App render");
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
     
     <Link onChangePage={function(id){
        this.setState({
          mode: "read",
          selected_content_id:Number(id)  //강제로 숫자로 바꿔주는 자바스크립트 명령어
      });
     }.bind(this)} 
      data={this.state.contents}>
    </Link>
    <Control onChangeMode={function(_mode){
      if(_mode === "delete"){
        if(window.confirm("really?")){    //window 안써주면 안됨!!! - true이면 ok false이면 cancel
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _contents.length){
              if(_contents[i].id === this.state.selected_content_id){
                _contents.splice(i,1);  //i부터 1만큼 지움
                break;
              }
            i = i + 1;
          }
          this.setState({
            mode:"welcome",   //delete 작업다음 welcome으로 표시
            contents:_contents
          });
          alert("deleted!");
        }
      }
        else{
      this.setState({
        mode:_mode
      });
    }
     }.bind(this)}></Control>
    {/* <ReadDefinition title={_title} desc={_desc}></ReadDefinition> */}
    {this.getContent()}
    </div>
   );
  }
}   

    // 유사 javascript 이나 javascript는 아니다.(콘솔창에 쳐보면 문법오류남)
    // 따옴표나 역슬래시 등을 사용하지않고 태그들을 그대로 사용해서 페이스북에서 만든 JSX 라는것!!!
    // JSX 를 작성하면 create-react-app이 javascript 코드로 컨버팅 해준다.

export default App;