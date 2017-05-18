import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Actions from "../actions/SidebarActions";
import Sidebar from "../components/Sidebar";

const SidebarContainer = connect(
    function mapStateToProps(state) {
        return state.Sidebar;
    },
    function mapDispatchToProps(dispatch) {
        return bindActionCreators(Actions, dispatch);
    }
)(Sidebar);

export default SidebarContainer;