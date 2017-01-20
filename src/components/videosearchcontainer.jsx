import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchFormContainer } from './searchform';
import { SearchPanel } from './searchpanel'
import  Video from './videolist';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';


@connect((state) => state)
export default class extends Component {
    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <div>
                            <SearchPanel
                                {...this.props}
                                // open state passed in from videoSearchContainer, triggered by transition between
                                // saved videos and search
                                open={this.props.open}>
                                <SearchFormContainer {...this.props} />
                            </SearchPanel>
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <Video {...this.props}/>
                        </div>
                    </Row>
                </Grid>
            </div>
        )
    }
}
