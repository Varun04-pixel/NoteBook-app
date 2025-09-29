import { useEffect } from "react";

function Alert(props) {
  useEffect(() => {
    if (props.alert.isAlert) {
      const timer = setTimeout(() => {
        props.setAlert({
          isAlert: false,
          msg: "",
          color: ""
        })
      }, 1500)
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [props.alert, props.setAlert])
  return (
    props.alert.isAlert &&
    <div className="d-flex justify-content-center">
      <div
        className="position-fixed start-50 translate-middle-x text-center"
        style={{ top: "70px", zIndex: 1050, width: "90%" }}
      >
        <div className={`alert alert-${props.alert.color} w-100`} role="alert">
          {props.alert.msg}
        </div>
      </div>
    </div>

  );
}

export default Alert;
