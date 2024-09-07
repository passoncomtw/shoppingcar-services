const HomeScreen = (props) => {
  return (<div>
    <h3>Home Screen</h3>
    <p>auth: {JSON.stringify(props.auth)}</p>
  </div>);
}

export default HomeScreen;
