import React, { Component } from 'react';

class Link extends Component { //서브젝트라는 클래스를 만들겠다.
    render () {   //함수 : 클래스안에 들어있는 함수는 function 키워드 없이 작성 가능
        console.log("Link render");
        var lists = [];
        var data =  this.props.data;
        var i =0;
        while(i < data.length){
            lists.push(
            <li key = {data[i].id}>
                <a href={"/content/" + data[i].id} 
                    onClink ={function(e){
                        e.preventDefault();
                        this.props.onChangePage();
                    }.bind(this)}
                > {data[i].title} </a>
            </li>);  //key값은 리액트에서 리액트가 내부적으로 필요해서 요청하는 데이터
            i =  i + 1;
        }
        return (    //컴포넌트를 만들때 하나의 최상의 태그만 사용해야한다
        <nav>
      <ul>
          {lists}
      </ul>
  </nav>
    );
  }
  }

  export default Link;