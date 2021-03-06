import React from "react";
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {ButtonGroup} from "@material-ui/core";
import {v4 as UUID} from 'uuid';

/**
 * Style to apply to the filter buttons
 * @type {(props?: any) => ClassNameMap<"root">}
 */
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
}));

/**
 * A function that is responsible to render the filter buttons
 * @param props of the filter button
 * @returns {JSX.Element} with the filter buttons
 * @constructor
 */
function FilterButton(props) {
    /**
     * A constant when its called gonna use the styles defined above
     * @type {classes<"root">}
     */
    const classes = useStyles();

    return (
        <ButtonGroup size="small">
            <Button
                id={UUID()}
                variant={props.isPressed ? "outlined" : "text"}
                className={classes.root}
                aria-pressed={props.isPressed}
                onClick={() => {
                    props.setFilter(props.name)
                }}
            >
                {props.name}
            </Button>
        </ButtonGroup>
    );
}

export default FilterButton;
