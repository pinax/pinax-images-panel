var React = require("react");

var ProgressBar = React.createClass({
    propTypes: {
        percentageComplete: React.PropTypes.number.isRequired
    },
    render: function () {
        var style = {
            width: this.props.percentageComplete + "%"
        };
        return (
            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow={this.props.percentageComplete} aria-valuemin="0" aria-valuemax="100" style={style}>
                    {this.props.percentageComplete}%
                </div>
            </div>
        );
    }
});

module.exports = ProgressBar;
