import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import SwipeableViews from 'react-swipeable-views';
import VideoSearch from './videosearchcontainer';
import SavedVideos from './savedvideos';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        padding: 10,
    },
};

@connect((state) => state)
export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            open: false
        };
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
            open: !this.state.open
        });
    };

    render() {
        return (
            <div>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    <Tab
                        icon={<FontIcon className="material-icons">search</FontIcon>}
                        label="Search Videos" value={0}/>
                    <Tab
                        icon={<FontIcon className="material-icons">favorite</FontIcon>}
                        label="My Videos" value={1}/>
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}>
                    <div className="page-container" style={{ fontFamily: 'Roboto,arial,sans-serif' }}>
                        <VideoSearch
                            open={this.state.open}
                            {...this.props} />
                        <br />
                    </div>
                    <div style={styles.slide}>
                        <SavedVideos {...this.props} />
                    </div>
                </SwipeableViews>
            </div>
        );
    }
}