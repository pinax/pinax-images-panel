import React from 'react';

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }
    render() {
        const perc = this.props.percentageComplete;
        const style = {
            width: `${perc}%`
        };
        return (
            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow={this.props.percentageComplete} aria-valuemin="0" aria-valuemax="100" style={style}>
                    {this.props.percentageComplete}%
                </div>
            </div>
        );
    }
}

ProgressBar.propTypes = {
    percentageComplete: React.PropTypes.number.isRequired
};

module.exports = ProgressBar;
