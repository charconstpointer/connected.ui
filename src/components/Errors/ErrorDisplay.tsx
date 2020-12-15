const ErrorDisplay = (props: any) => {
  return <div className="container mt-3 ">
    {
      props.errors?.map((e: any) => {
        return (
          <div key={e} className="col-12">
            <div className="alert alert-danger" role="alert">
              {e}
            </div>
          </div>
        )
      })}
  </div>

}

export default ErrorDisplay;