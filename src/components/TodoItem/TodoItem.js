import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ItemForm from '../../components/ItemForm';
import {fetchOneItem} from '../../actions/items';

class TodoItem extends Component {
    render() {
        //let {match} = this.props;
        return (
            <div>
                <h1>{this.props.item}</h1>
                <ItemForm title={this.props.item}/>
            </div>
        );
    }

    componentDidMount(){
        this.props.actions.fetchOneItem(this.props.token,this.props.match.params.id);
    }

}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        fetchOneItem
    }, dispatch)
});

const mapStateToProps = ({ itemsReducer, loginErrorSuc }) => ({
    token: loginErrorSuc.token,
    item: itemsReducer.currItem 
});

export default connect(mapStateToProps,mapDispatchToProps)(TodoItem);