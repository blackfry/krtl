import React, {Component} from 'react';
import { LinearProgress } from 'material-ui'
import { connect } from 'react-redux';
import { videoStyles } from '../stylesheets/inlineStyles';
import {
    saveFavouriteInitiateAction
} from '../redux/actions';

import VideoItem from './videoItem'
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';


class VideoContainer extends Component {

    clickHandler = (video) => {
        let dispatch = this.props.dispatch;
        dispatch(saveFavouriteInitiateAction(video))
    };

    composeVideoItems() {

        let videoItems = this.props.SEARCH.searchResults;
        return videoItems.map((video, i) => {
            return (
                <div>
                    <Col xs={12} sm={6} md={4}>
                        <VideoItem
                            key={i}
                            video={video}
                            videoStyles={videoStyles}
                            saved={false}
                            buttonLabel="Save"
                            onClick={ ()=>this.clickHandler(video) }
                        />
                    </Col>
                </div>
            )
        })
    }

    render() {

        if (!this.props.SEARCH.statsSuccess) {
            return (
                <div style={{marginTop: '20px'}}>
                    <LinearProgress/>
                </div>
            )
        }
        if (this.props.SEARCH.statsSuccess) {
            return (
                <div>
                    { this.composeVideoItems() }
                </div>
            )
        }
    }
}

@connect((state) => state)
export default class extends Component {

    render() {
        if (typeof this.props.SEARCH === 'undefined') {
            return (
                <div>

                </div>
            )
        }

        if (this.props.SEARCH.searchInitiated) {
            return (
                <div style={{marginTop: '20px'}}>

                </div>
            )
        }

        if (this.props.SEARCH.searchFailed) {
            return (
                <div>
                    Sorry there was a problem loading your videos. Please try again.
                </div>
            )
        }

        if (this.props.SEARCH.searchResultsEmpty) {
            return (
                <div>
                    Your query returned zero videos
                </div>
            )
        }

        if (this.props.SEARCH.searchSuccess) {
            return (
                <div className="page-container" style={videoStyles.pageContainer}>
                    <Grid>
                        <Row>
                            <VideoContainer
                                {...this.props} />
                        </Row>
                    </Grid>
                </div>
            )
        }

        return (
            <div>

            </div>
        )
    }
};

