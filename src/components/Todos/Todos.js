import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllItems , fetchDeleteItem , fetchCompleteItem} from '../../actions/items';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';

class Todos extends Component {
    render() {
        const { objectList } = this.props;
        return (
            <div>
                <div className='for-items'>
                    {!objectList.length ? <h3>Loading...</h3> :
                        <ul>
                            {objectList.map(item =>
                            <ListItem>
                                <li key={item.id}>
                                    <Link to={"/todos/" + item.id}><h3 className={item.completed ? 'completed' : 'non-completed'}>{item.title}</h3></Link>
                                    {new Date(item.expires_at).toLocaleString('en-GB', { timeZone: 'UTC' })}
                                    <Button className={item.completed ? 'red' : 'green'} onClick={() => this.props.actions.fetchCompleteItem(this.props.token,item.title)}><span>&#10003;</span></Button>
                                    <Button onClick={() => this.props.actions.fetchDeleteItem(this.props.token,item.id)}>Delete</Button>
                                </li>
                                </ListItem>)}
                        </ul>
                    }
                </div>
            </div>
        );
    }

    componentDidMount() {
        // console.log(this.props.token);
        this.props.actions.fetchAllItems(this.props.token);
    }

}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        fetchAllItems,
        fetchDeleteItem,
        fetchCompleteItem
    }, dispatch)
});

const mapStateToProps = ({ itemsReducer, loginErrorSuc }) => ({
    objectList: itemsReducer.data,
    token: loginErrorSuc.token
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);