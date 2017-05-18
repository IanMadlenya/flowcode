import Joint from "jointjs";
import Activity from "./Activity";
import State from "./State";
import Condition from "./Condition";
import Link from "./Link";
import "../styles/Joint.scss";

// Initialize Joint Shapes
Joint.shapes.Activity = Activity;
Joint.shapes.State = State;
Joint.shapes.Condition = Condition;
Joint.shapes.link = Link;

export default Joint;