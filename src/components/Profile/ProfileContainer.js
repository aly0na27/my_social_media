import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileUser} from "../../redux/profile-reducer";
import {Navigate, redirect, useLocation, useNavigate, useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId
        if (!userId) {
            userId = 2
        }
        this.props.getProfileUser(userId);
    }

    render() {
        // if (!this.props.isAuth) {
        //     return <Navigate to={"/login"}/>
        // }
        return (
            <Profile {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,

    }
}



// const AuthRedirectComponent = (props) => {
//     if (!props.isAuth) {
//         return <Navigate to={"/login"}/>
//     }
//     return <ProfileContainer {...props}/>
// }

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

// AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent)
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}
export default connect(mapStateToProps, {getProfileUser})(withRouter(AuthRedirectComponent));

