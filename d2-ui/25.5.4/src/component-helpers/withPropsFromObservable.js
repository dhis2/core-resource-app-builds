import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import log from 'loglevel';
import getDisplayName from 'recompose/getDisplayName';

export default function withPropsFromObservable(observable, BaseComponent) {
    class WithPropsFromComponent extends Component {
        constructor(props, context) {
            super(props, context);

            this.state = {
                isLoading: true,
            }
        }

        componentDidMount() {
            this.disposable = observable
                .subscribe(
                    (props) => this.setState({ isLoading: false, ...props }),
                    (error) => { log.error(`Failed to receive props for ${BaseComponent.displayName}`); log.error(error) }
                );
        }

        componentWillUnmount() {
            if (this.disposable && this.disposable.dispose) {
                this.disposable.dispose();
            }
        }

        render() {
            const { isLoading, ...componentProps } = this.state;

            if (this.state.isLoading) {
                return (
                    <CircularProgress />
                );
            }

            return (
                <BaseComponent {...componentProps} {...this.props} />
            );
        }
    }

    WithPropsFromComponent.displayName = `withPropsFrom(${getDisplayName(BaseComponent)})`;

    return WithPropsFromComponent;
}
