import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

import { ChartPlayer } from '../_components/ChartPlayer';

class HomePage extends React.Component {
    constructor(){
        super()
        this.state={
            currentPlayers: null
        };
    }
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeletePlayer(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    handleClick(player_id) {
        this.setState({ currentPlayers:this.props.dispatch(userActions.getPlayersById(player_id)) });       
      }

    render() {
        const { player, players } = this.props;
        return (
            <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <h1>Players List</h1>
                    <p>You're logged in with React!!</p>
                    <h3>All registered users:</h3>
                </div>
            </div>    
                    {players.loading && <em>Loading users...</em>}
                    {players.error && <span className="text-danger">ERROR: {players.error}</span>}
                    {
                        players.data &&
                       <div className="row">
                            {
                                players.data.map((player, index) =>
                                <div className="col-md-3" key={index} onClick={
                                    () =>this.handleClick(player.player_id)}>
                                    <div className="col-md-3">
                                        <img className="img-fluid" src={player.player_portait} alt=""/>
                                        <h2 className=" title-small"><a href="#">{player.player_name}</a></h2>
                                        <p class="card-text"><small class="text-time"><em>{player.player_batting-styles}</em></small></p>
                                    </div>                               
                                </div>
                                )
                            }
                      </div>                        
                    }
                    
                    <ChartPlayer player={ this.state.currentPlayers }/>
                    
            </div>
            
            
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };