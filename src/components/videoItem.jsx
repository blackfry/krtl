import React, {Component} from 'react';
import {RaisedButton} from 'material-ui';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';


export default class extends Component {

    render() {
        const videoStyles = this.props.videoStyles;
        let saved = this.props.saved;
        let clickHandler = this.props.onClick;
        let buttonLabel = this.props.buttonLabel;

        let {
            video:{
                id: {videoId},
                snippet: {
                    title,
                    thumbnails: {
                        medium: {
                            height: thumbnailHeight,
                            url: thumbnailUrl,
                            width: thumbnailWidth
                        }
                    }
                },
                statistics: {viewCount, likeCount} = {key1: 0, key2: 0}
            }
        } = this.props;

        return (
            <div className="video-list-item" style={videoStyles.videoListItem}>
                <Grid>
                    <Row style={{marginBottom: '-30px'}}>
                        <div className="thumbnail-container" style={ videoStyles.thumbnailContainer}>
                            <div className="thumbnail" style={videoStyles.thumbnail}>
                                    <span className="thumbnail-simple" style={videoStyles.thumbnailSimple}>
                                        <img
                                            alt={'thumbnail'}
                                            height={thumbnailHeight}
                                            width={thumbnailWidth}
                                            src={thumbnailUrl}>
                                        </img>
                                    </span>
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <div className="details-container" style={videoStyles.detailsContainer}>
                            <div className="video-meta-container" style={videoStyles.videoMetaContainer}>
                                <Col xs={7} sm={7}>
                                    <h3 className="title" style={videoStyles.title}>
                                        {title}
                                    </h3>
                                    <ul className="video-meta-list" style={videoStyles.videoMetaList}>
                                        <li className="video-meta-list-item"
                                            style={videoStyles.videoMetaListItem}>{likeCount} likes
                                        </li>
                                        <li className="video-meta-list-item"
                                            style={videoStyles.videoMetaListItem}>{viewCount} views
                                        </li>
                                    </ul>
                                </Col>
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <div className="details-container" style={videoStyles.detailsContainer}>
                            <div className="video-meta-container" style={videoStyles.videoMetaContainer}>
                                <Col xs={5} sm={5}>
                                    <div className="video-save-button-container"
                                         style={videoStyles.videoSaveButtonContainer}>
                                        <RaisedButton
                                            label={buttonLabel}
                                            primary={true}
                                            style={{margin: '12px', minWidth: '60px'}}
                                            type="submit"
                                            disabled={saved}
                                            onClick={clickHandler.bind(videoId)}
                                        />
                                    </div>
                                </Col>
                            </div>
                        </div>
                    </Row>
                </Grid>
            </div>
        )
    }
}