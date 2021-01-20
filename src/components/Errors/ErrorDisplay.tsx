const ErrorDisplay = (props: any) => {
  console.log(props.for);

  return <div className="container mt-3 ">
    {
      props.errors?.filter((e: any) => {
        console.log(e, props.for)
        return e.forField == props.for;
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