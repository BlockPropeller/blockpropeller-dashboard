import React, {Fragment} from 'react';
import {Label} from "semantic-ui-react";

const ServerStateLabel = ({server}) => {
    return (
        <Fragment>
            {server.state === 'requested' && <Label color="orange">
                Server Requested
            </Label>}
            {server.state === 'ok' && <Label color="green">
                Running
            </Label>}
            {server.state === 'deleted' && <Label color="grey">
                Archived
            </Label>}
            {server.state === 'failed' && <Label color="red">
                Provision Failed
            </Label>}
        </Fragment>
    );
};

export default ServerStateLabel;
