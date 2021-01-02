import React, { Component } from 'react';

class Control extends Component { //서브젝트라는 클래스를 만들겠다.
    render () {   //함수 : 클래스안에 들어있는 함수는 function 키워드 없이 작성 가능
        console.log("Subject render");
        return (    //컴포넌트를 만들때 하나의 최상의 태그만 사용해야한다
            <ul>
            <li><a href="/create" onClick={function(e){
              e.preventDefault();
              this.props.onChangeMode('create');
            }.bind(this)}>create</a></li>
            <li><a href="/update" onClick={function(e){
              e.preventDefault();
              this.props.onChangeMode('update');
            }.bind(this)}>update</a></li>       {/*create, read, update는 특정페이지로 이동해서 오퍼레이션이 실행*    버튼을 클릭할떄 삭제가 일어나게 하기위해서 링크를 사용하지 않고 버튼같은 오퍼레이션을 사용*/}
            <li><input onClick={function(e){
              e.preventDefault();
              this.props.onChangeMode('delete');
            }.bind(this)}type="button" value="delete"></input></li> 
        </ul> 
    );
  }
}

export default Control;
 