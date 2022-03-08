const Restrict = (props) => {
  return props.roles.includes(props.userRole) ? props.children : null;
};

export default Restrict;
