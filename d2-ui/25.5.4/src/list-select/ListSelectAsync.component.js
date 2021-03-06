import React from 'react';
import ListSelect from './ListSelect.component';
import { Observable } from 'rx';
import log from 'loglevel';

const ListSelectAsync = React.createClass({
    propTypes: {
        source: React.PropTypes.instanceOf(Observable),
        onItemDoubleClick: React.PropTypes.func.isRequired,
        listStyle: React.PropTypes.object,
    },

    getInitialState() {
        return {
            listSource: [],
        };
    },

    componentWillMount() {
        if (!this.props.source) {
            return;
        }

        this.disposable = this.props.source
            .subscribe(
                (listValues) => this.setState({ listSource: listValues }),
                (error) => log.error(error)
            );
    },

    componentWillUnmount() {
        this.disposable && this.disposable.dispose();
    },

    render() {
        return (
            <ListSelect {...this.props}
                        onItemDoubleClick={this.props.onItemDoubleClick}
                        source={this.state.listSource}
                        listStyle={this.props.listStyle}
                />
        );
    },
});

export default ListSelectAsync;
