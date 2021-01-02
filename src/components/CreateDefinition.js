import React, { Component } from 'react';   //필수 - 에디터마다 다르긴하나 하는게 좋음

class CreateDefinition extends Component { //서브젝트라는 클래스를 만들겠다.
  render () {   //함수 : 클래스안에 들어있는 함수는 function 키워드 없이 작성 가능
    console.log("Definition render");
    return (    //컴포넌트를 만들때 하나의 최상의 태그만 사용해야한다
    <article>
      <h2>Create</h2>
        <form action="/create_process" method="post" onSubmit={function(e){
        e.preventDefault();
        this.props.onSubmit(
          e.target.title.value,
          e.target.desc.value
        );
        }.bind(this)}>   
          <p><input type="text" name="title" placeholder="title"></input></p>
          <p><textarea name="desc" placeholder="description"></textarea></p>
          <p><input type="submit"></input></p>
        </form>
    </article>
  );
}
}
export default CreateDefinition;      //외부에서 사용할 수 있게 허용