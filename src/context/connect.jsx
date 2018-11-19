import React, { Component } from 'react';
import QueryContext from './Context';
import getQueryComponent from '../QueryComponent';

//组件
export class Query extends Component {
  constructor(props) {
    super(props);
    let { query, name, variables, forcedUpdate = false, awaitQuery = false, updateQuery, children } = props;
    if (typeof children != 'function') {
      throw Error('children must be a Function');
    }
    this.QueryComponent = getQueryComponent({
      query,
      name,
      variables,
      forcedUpdate,
      awaitQuery,
      updateQuery,
      renderFun: children,
    });
  }
  render() {
    let QueryComponent = this.QueryComponent;
    let { query, name } = props;
    let queryName = name || query.name;
    return (
      <QueryContext.Consumer>
        {({ store, setStore }) => {
          return <QueryComponent store={store[queryName]} setStore={setStore} queryName={queryName} />;
        }}
      </QueryContext.Consumer>
    );
  }
}

// 连接器
const queryConnect = (query, options = {}) => WrappedComponent => {
  return class QueryConsumer extends Component {
    constructor(props) {
      super(props);
      this.QueryComponent = getQueryComponent({
        ...options,
        query,
        WrappedComponent,
      });
    }
    render() {
      let QueryComponent = this.QueryComponent;
      let queryName = options.name || query.name;
      console.log(queryName);
      return (
        <QueryContext.Consumer>
          {({ store, setStore }) => {
            return <QueryComponent {...this.props} store={store[queryName]} setStore={setStore} queryName={queryName} />;
          }}
        </QueryContext.Consumer>
      );
    }
  };
};
export default queryConnect;
