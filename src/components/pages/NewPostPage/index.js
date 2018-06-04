// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { Container, Input, Button, Form, FormGroup, Label, InputGroup, InputGroupAddon } from 'reactstrap';
import { Creators as Actions } from './reducer';
import InterparkSearch from '../../../utils/InterparkSearch';
import { getToken } from '../../../utils/localStorage';

type Props = {
  newPost: (State) => void,
};

type State = {
  title: string,
  content: string,
  department: string,
  bookTitle: string,
  author: string,
  publisher: string,
  price: number,
  contact: string,
};

class NewPostPage extends React.Component <Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      contentType: 'sales',
      title: '',
      content: '',
      department: '',
      bookTitle: '',
      author: '',
      publisher: '',
      price: 0,
      priceStandard: 0,
      contact: '',
      interparkImage: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.newPost(this.state);
  }

  render() {
    return (
      <Container>
        {
          !getToken() && <Redirect to="/" />
        }
        <br />
        <h1>글 작성</h1>
        <hr />
        <Form>
          <FormGroup>
            <Label>글 제목</Label>
            <Input onChange={({ target }) => this.setState({ title: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>글 종류</Label>
            <Input type="select" onChange={({ target }) => this.setState({ contentType: target.value })}>
              <option value="sales">팝니다</option>
              <option value="purchases">삽니다</option>
            </Input>
          </FormGroup>
        </Form>
        <hr />
        <h4>책 정보 <InterparkSearch handleBook={b => this.setState(b)} /></h4>
        <hr />
        <Form>
          {this.state.bookPicture && <img src={this.state.bookPicture} alt="book" />}
          <FormGroup>
            <Label>책 제목</Label>
            <Input value={this.state.bookTitle} onChange={({ target }) => this.setState({ bookTitle: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>저자</Label>
            <Input value={this.state.author} onChange={({ target }) => this.setState({ author: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>출판사</Label>
            <Input value={this.state.publisher} onChange={({ target }) => this.setState({ publisher: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>원가</Label>
            <InputGroup>
              <Input type="number" value={this.state.priceStandard} onChange={({ target }) => this.setState({ priceStandard: target.value })} />
              <InputGroupAddon>
              원
            </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label>해당 단과대</Label>
            <Input onChange={({ target }) => this.setState({ department: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>중고 가격</Label>
            <InputGroup>
              <Input value={this.state.price} type="number" onChange={({ target }) => this.setState({ price: target.value })} />
              <InputGroupAddon>
                원
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Button>책 사진 추가</Button>
          </FormGroup>
        </Form>
        <hr />
        <h4>글 내용</h4>
        <hr />
        <Form>
          <FormGroup>
            <Label >내용</Label>
            <Input onChange={({ target }) => this.setState({ content: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>연락처</Label>
            <Input onChange={({ target }) => this.setState({ contact: target.value })} />
          </FormGroup>
          <Button onClick={this.handleSubmit}>등록하기</Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  newPost: Actions.newPostRequest,
}, dispatch);

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPostPage);
