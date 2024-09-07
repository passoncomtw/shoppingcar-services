const PublicScreen = (props) => {
  return (<div>

    <h3>Public Screen</h3>
    <p>auth: {JSON.stringify(props.auth)}</p>
  </div>);
}

export default PublicScreen;
