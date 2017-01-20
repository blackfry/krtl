import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinearProgress } from 'material-ui'
import {
    loadSavedFavouritesInitiateAction,
} from '../redux/actions';
import { videoStyles } from '../stylesheets/inlineStyles';
import VideoItem  from './videoItem';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';


class VideoContainer extends Component {

    clickHandler = (video) => {
        localStorage.removeItem(video.id.videoId)
        let dispatch = this.props.dispatch;
        dispatch(loadSavedFavouritesInitiateAction())
    };

    composeVideoItems() {
        let videoItems = this.props.SAVED.savedResults;
        return videoItems.map((video, i) => {
            return (
                <div>
                    <Col xs={12} sm={6} md={4}>
                        <VideoItem
                            key={i}
                            video={video}
                            videoStyles={videoStyles}
                            saved={false}
                            buttonLabel="Remove"
                            onClick={ ()=>this.clickHandler(video) }
                        />
                    </Col>
                </div>
            )
        })
    }

    render() {
        if (!this.props.SAVED.loadSavedSuccess) {
            return (
                <div style={{ marginTop: '20px' }}>
                    <LinearProgress/>
                </div>
            )
        }
        if (this.props.SAVED.loadSavedSuccess) {
            return (
                <div>
                    { this.composeVideoItems() }
                </div>
            )
        }
        return (
            <div>
               fall back
            </div>
        )
    }
}



@connect((state) => state)
export default class extends Component {

    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(loadSavedFavouritesInitiateAction())
    }

    render() {
        if (typeof this.props.SAVED === 'undefined') {
            return (
                <div>
                    You have no saved favourites
                </div>
            )
        }


        if (this.props.SAVED.loadSavedSuccess) {
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
                You have no saved favourites
            </div>
        )
    }
}
