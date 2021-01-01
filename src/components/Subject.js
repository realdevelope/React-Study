import React, { Component } from 'react';

class Subject extends Component { //서브젝트라는 클래스를 만들겠다.
    render () {   //함수 : 클래스안에 들어있는 함수는 function 키워드 없이 작성 가능
        console.log("Subject render");
        return (    //컴포넌트를 만들때 하나의 최상의 태그만 사용해야한다
        <header>
        {/* <h1>WEB</h1>      //기존의 코드를 아래의 코드로 
        world wide web! */} 
        <h1><a href="/" onClick={function(e){
             e.preventDefault();
             this.props.onChangePage();
        }.bind(this)}>{this.props.title}</a></h1> {/*리팩토링*/}
        {this.props.sub}

    </header>
    );
  }
}

export default Subject;