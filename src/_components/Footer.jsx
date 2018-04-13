import React,{ Component } from 'react';

class Footer extends Component{
    render(){
        return(
            <div className="navbar navbar-default navbar-fixed-bottom">
            <div className="container">
              <p className="navbar-text pull-left">© Address
                   <a href="http://tinyurl.com/tbvalid" target="_blank" >Location</a>
              </p>
              
                <a href="#"><small style="color:grey" className="fa fa-lg fa-skype pull-right">  </small></a>
                <a href="#"><small style="color:grey" className="fa fa-lg fa-google-plus pull-right">  </small></a>
                <a href="#"><small style="color:grey" className="fa fa-lg fa-linkedin pull-right">  </small></a>
                <a href="#"><small style="color:grey" className="fa fa-lg fa-twitter pull-right">  </small></a>
                <a href="#"><small style="color:grey" className="fa fa-lg fa-facebook pull-right">  </small></a>
            </div>
            
            
          </div>
        )
    }
}

export default Footer