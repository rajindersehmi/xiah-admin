import useRestrictoin from "hooks/useRestriction";

function Restricted(props) {
  const restricted = useRestrictoin();

  if (!props.to) return props.children;

  return !restricted(props?.to) ? props.children : null;
}

export default Restricted;
