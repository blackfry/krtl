import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Field, reduxForm } from 'redux-form'
import { TextField, RaisedButton, MenuItem, LinearProgress } from 'material-ui'
import { Slider } from 'redux-form-material-ui';
import { categories} from '../redux/constants'
import { renderSelectField } from './mui/SelectField';
import {

    getVideosInitiateAction,
    getVideoStatsInitiateAction
} from '../redux/actions';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const renderTextField = ({input, context, label, meta: {touched, error}, ...custom})=> (
    <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />
);
const required = value => value == null ? 'Required' : undefined

const provideVideoCategories = () => {
    return categories.map((product, i) => {
        return (
            <MenuItem key={i} value={product} primaryText={product}/>
        )
    })
};

const composeVideoCategories = () => {
    return (
        <Field
            name="videoCategory"
            component={renderSelectField}
            label="Video Category"
            validate={required}>
            { provideVideoCategories()}
        </Field>
    )
};


let SearchForm = props => {
    //let orderForm = typeof this.props.form.orderForm === 'undefined' ? {values: {minOrderBool: false}} : this.props.form.orderForm
    const {handleSubmit, pristine, submitting} = props;

    // const handleUpdateInput = searchText => {
    //     dispatch(getSearchTermsInitiateAction(searchText))
    // };


    return (
        <MuiThemeProvider>
            <div style={{padding: '30px'}}>
                <form onSubmit={handleSubmit}>
                    <Grid>
                        <Row>
                            <Col xs={12}>
                                {/*<div>*/}
                                    {/*<Field*/}
                                        {/*name="searchQuery2"*/}
                                        {/*onUpdateInput={handleUpdateInput}*/}
                                        {/*dataSource={['one', 'two', 'three',]}*/}
                                        {/*component={AutoComplete}*/}
                                        {/*floatingLabelText="Search"*/}
                                        {/*label="Search"*/}
                                        {/*hintText="Search"/>*/}
                                {/*</div>*/}

                                <div>
                                    <Field
                                        name="searchQuery"
                                        component={renderTextField}
                                        label="Search"
                                        floatingLabelText="Search"
                                        hintText="Search"/>
                                </div>

                                <div>
                                    { composeVideoCategories() }
                                </div>
                            </Col>
                            {/*<Col xs={12} style={{ marginTop: '20px'}}>*/}
                                {/*<Grid>*/}
                                    {/*<Row style={{ maxWidth: '245px' }}>*/}
                                        {/*<Col xs={6}>*/}
                                            {/*<div>Published Before</div>*/}
                                            {/*<div>*/}
                                                {/*<Field*/}
                                                    {/*style={{ height: '100px' }}*/}
                                                    {/*name="publishedBefore"*/}
                                                    {/*component={Slider}*/}
                                                    {/*axis="y-reverse"*/}
                                                    {/*defaultValue={0}*/}
                                                    {/*format={null}*/}
                                                    {/*min={0}*/}
                                                    {/*max={20}*/}
                                                    {/*step={1}/>*/}
                                            {/*</div>*/}
                                        {/*</Col>*/}
                                        {/*<Col xs={6} style={{ }}>*/}

                                            {/*<div>Published After</div>*/}
                                            {/*<div>*/}
                                                {/*<Field*/}
                                                    {/*style={{ height: '100px' }}*/}
                                                    {/*name="publishedAfter"*/}
                                                    {/*component={Slider}*/}
                                                    {/*axis="y-reverse"*/}
                                                    {/*defaultValue={0}*/}
                                                    {/*format={null}*/}
                                                    {/*min={0}*/}
                                                    {/*max={20}*/}
                                                    {/*step={1}/>*/}
                                            {/*</div>*/}
                                        {/*</Col>*/}
                                    {/*</Row>*/}
                                {/*</Grid>*/}
                            {/*</Col>*/}
                        </Row>
                    </Grid>
                    <div>
                        <RaisedButton
                            label="Search"
                            primary={true}
                            style={{margin: '12px'}}
                            type="submit"
                            disabled={pristine || submitting}
                        />
                    </div>
                </form>
            </div>
        </MuiThemeProvider>
    )
};

SearchForm = reduxForm({
    form: 'searchForm',
})(SearchForm);


export class SearchFormContainer extends Component {

    getVideoStats = () => {
        let dispatch = this.props.dispatch;
        let searchResults = this.props.SEARCH.searchResults;

        let searchIdArr = [];
        searchResults.map((result) => {
            searchIdArr.push(result.id.videoId)
        });
        dispatch(getVideoStatsInitiateAction(searchIdArr))
    };

    asyncFormSubmitHandler = values => {
        let dispatch = this.props.dispatch;
        dispatch(getVideosInitiateAction(values));
        if(this.props.SEARCH.searchSuccess) {
            this.getVideoStats()
        }
    };

    render() {

        if (this.props.SEARCH.searchInitiated && !this.props.SEARCH.searchSuccess) {
            return (
                <div style={{ marginTop: '20px' }}>

                </div>
            )
        }

        return (
            <div style={{maxWidth: '320px'}}>
                <SearchForm
                    dispatch={this.props.dispatch}
                    onSubmit={ this.asyncFormSubmitHandler }
                />
            </div>
        )
    }
}
