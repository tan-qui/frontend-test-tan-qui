import { Component } from "react";


interface IProps {
  children: any
};
interface IState {
  hasError: any
};

class CustomError extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    // setTimeout(() => {
    //   window.location.reload()
    // }, 2000);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="customer-error">
          <div>
            <h1>Something went wrong</h1>
          </div>
          <div>
            <h1>Wait a moment...</h1>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CustomError;
