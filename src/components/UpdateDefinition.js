import React, { Component } from 'react';   //필수 - 에디터마다 다르긴하나 하는게 좋음

class UpdateDefinition extends Component { //서브젝트-> 업데이트이피니션으로 변경 
  constructor(props){
    super(props);
    this.state = {
      id:this.props.data.id,
      title:this.props.data.title,
      desc:this.props.data.desc
    }
     this.inputFormHandler = this.inputFormHandler.bind(this);
  }
  inputFormHandler(e){
    this.setState({[e.target.name]:e.target.value});
  }


  render () {   //함수 : 클래스안에 들어있는 함수는 function 키워드 없이 작성 가능
    console.log(this.props.data);
    console.log("UPdateDefinition render");
    return (    //컴포넌트를 만들때 하나의 최상의 태그만 사용해야한다
      <article>
      <h2>Update</h2>
      <form action="/create_process" method="post"
        onSubmit={function(e){
          e.preventDefault(); 
          this.props.onSubmit(
              this.state.id,
              this.state.title,
              this.state.desc
          );
        }.bind(this)}>
        <input type="hidden" name="id" value={this.state.id}></input>
        <p><input 
        type="text" 
        name="title" 
        placeholder="title" 
        value={this.state.title}
        onChange={this.inputFormHandler}
        ></input></p>
        <p><textarea 
        name="desc" 
        placeholder="description"
        onChange={this.inputFormHandler}
        ></textarea></p>
        <p><input type="submit"></input></p>
      </form>
    </article>
  )
}
}
export default UpdateDefinition;      //외부에서 사용할 수 있게 허용