const ErrorDisplay = (props: any) => {
  return <div className="container mt-3 ">
    {
      props.errors?.filter((e: any) => {
        return e.forField == props.for && !e.success;
      }).map((e: any) => {
        return (
          <div key={e} className="col-12">
            <div className="alert alert-danger" role="alert">
              {e.reason}
            </div>
          </div>
        )
      })}
  </div>

}

export default ErrorDisplay;