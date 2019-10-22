import React from 'react';
import {Label} from "semantic-ui-react";

const JobStatusLabel = ({job}) => {
    return (
        <div style={{display: 'inline-block'}}>
            {job.state === 'job_created' && <Label color="orange">
                Creating Server
            </Label>}
            {job.state === 'server_created' && <Label color="orange">
                Running Provision
            </Label>}
            {job.state === 'completed' && <Label color="green">
                Provision Completed
            </Label>}
            {job.state === 'failed' && <Label color="red">
                Provision Failed
            </Label>}
        </div>
    );
};

export default JobStatusLabel;
