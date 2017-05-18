import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Actions from "../actions/BodyActions";
import Body from "../components/Body";

const BodyContainer = connect(
    function mapStateToProps(state) {
        return {
            ...state.Body,
            AST: state.Sidebar.AST
        };
    },
    function mapDispatchToProps(dispatch) {
        return bindActionCreators(Actions, dispatch);
    }
)(Body);

export default BodyContainer;