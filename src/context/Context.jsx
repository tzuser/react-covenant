import React from 'react';

let { Provider, Consumer } = React.createContext({ store: {}, setStore: () => {} });

class QueryProvider extends React.Component {
  state = {};
  setStore(name, value) {
    if (!this._isMounted) return;
    let newValue = value;
    if (this.state[name]) {
      newValue = Object.assign({}, this.state[name], value);
    }
    this.setState({ [name]: newValue });
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <Provider
        value={{
          store: this.state,
          setStore: this.setStore.bind(this),
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default { Provider: QueryProvider, Consumer };
