// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { Container, Pagination, PaginationLink, PaginationItem, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, Row, Col, Button, Card, CardHeader, CardBody } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { Actions } from './reducer';
import { makeSelectContentList, makeSelectListPage } from './selector';
import Paginator from '../../Paginator';

type Props = {
  fetchContent: Function,
  saleContent: Array,
  location: Object,
};

class ContentList extends Component <Props> {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      page: 1,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    const search = qs.parse(this.props.location.search.replace('?', ''));
    this.props.fetchContent({ page: 1, ...search });
    this.setState(search);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const search = qs.parse(nextProps.location.search.replace('?', ''));
      this.props.fetchContent({ page: 1, ...search });
      this.setState(search);
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    const search = qs.parse(this.props.location.search.replace('?', ''));
    return (
      <Container>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
            팝니다
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
            삽니다
          </NavLink>
          </NavItem>
        </Nav>
        <br />
        <br />
        {!!this.props.saleContent &&
          this.props.saleContent.toJS().map(s =>
            <div key={s.id}>
              <Card>
                <CardHeader>
                  {s.bookTitle}
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>book picture</Col>
                    <Col>{s.price} 원</Col>
                  </Row>
                </CardBody>
              </Card>
              <br />
            </div>
          )}
        <Row>
          <Col sm={10}>
            <Paginator
              total={+this.props.page}
              current={+this.state.page}
              search={search}
            />
          </Col>
          <Col sm={2}>
            <Button href="/newpost">글 등록</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  saleContent: makeSelectContentList(),
  page: makeSelectListPage(),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchContent: Actions.contentListRequest,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContentList));

