type Props = {
    text:string;
} 

const Toast = ({ text }:Props) =>(
<div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
  <div className="toast-header">
    <strong className="me-auto">Bootstrap</strong>
    <small>11 mins ago</small>
    <button type="button" className="btn-close ms-2 mb-1" data-bs-dismiss="toast" aria-label="Close">
      <span aria-hidden="true"></span>
    </button>
  </div>
  <div className="toast-body">
    Hello, world! This is a toast message.
  </div>
</div>
)

export default Toast;