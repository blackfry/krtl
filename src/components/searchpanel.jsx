import React, { Component }from 'react';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import FontIcon from 'material-ui/FontIcon';


export class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            open2: false,
            count: 0
        };
    }

    // open search form container manually if it has been closed via search submit or other
    handlePanelClick() {
        this.setState({
            open2: !this.state.open2,
            count: 0
        });
    }

    componentDidUpdate() {
        if(this.props.SEARCH.searchInitiated && this.state.count === 0) {
            this.setState({open2: false, count: 1})
        }
    }

    render() {
        let {open, SEARCH: {searchPanelOpen}} = this.props;
        return (
            <div>
                <Button
                    onClick={ ()=>this.handlePanelClick()}
                    bsStyle="link">
                    <FontIcon
                        className="material-icons">search</FontIcon>
                </Button>
                <Panel
                    collapsible expanded={open || this.state.open2 || searchPanelOpen}
                    style={{borderColor: 'white', boxShadow: 'white', marginTop: '-40px' }}>
                    {this.props.children}
                </Panel>
            </div>
        );
    }
}