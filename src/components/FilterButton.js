import React from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {ButtonGroup} from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
}));

function FilterButton(props) {
    const classes = useStyles();

    return (
        <ButtonGroup size="small" aria-label="small outlined button group">
            <Button
                color={"red"}
                id={uuidv4()}
                variant={props.isPressed ? "outlined" : "text"}
                className={classes.root}
                aria-pressed={props.isPressed}
                onClick={
                    () => {
                        props.setFilter(props.name)
                    }
                }
            >{props.name}
            </Button>
        </ButtonGroup>
    );
}

export default FilterButton;
