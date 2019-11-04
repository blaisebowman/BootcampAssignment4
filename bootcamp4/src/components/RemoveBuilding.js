import React from 'react';
import AddBuilding from "./AddBuilding";

class RemoveBuilding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            error: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.closeButtonRef = React.createRef();
    }
    handleToggleClick(){
        this.setState(prevState => ({showErr: !prevState.showErr}));
    }
    handleSubmit(event) {
        event.preventDefault();

        const code = this.state.code.toUpperCase();

        const exists = this.props.buildings.find((building, i) => {
            if (building === undefined) {
                console.log('undefined at: ' + i);
                return 0;
            }
            return building.code === code;
        });

        if (exists) {
            this.props.removeBuilding(code);
            this.closeButtonRef.current.click();
            this.setState({ error: false });
            event.target.reset();
        }
        else {
            this.setState({ error: true });
        }
    }
    handleChange(event) {
        this.setState({ code: event.target.value });
        if (this.state.error == true){
            this.setState({error: false});
        }
    }

    render() {
        return (
            <div
                className="modal fade"
                id="removeBuildingModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="removeBuildingModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body-remove">
                            {this.state.error && !this.state.showErr &&
                            <button
                                className="alert alert-danger"
                                role="alert"
                                onClick={this.handleToggleClick}
                            >
                                <b>Error: a building with this code does not exist!</b>
                            </button>

                            }
                            <form onSubmit={this.handleSubmit}
                            autocomplete = "off">
                                <div className="form-group">
                                    <label
                                        htmlFor="building-code"
                                        className="col-form-label required-field"
                                    >
                                        Code:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="building-code"
                                        name="code"
                                        onChange={this.handleChange}
                                        pattern="[a-zA-Z]{3}|[a-zA-Z]{4}"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                <div className="row justify-content-end">
                                    <button
                                        type="submit"
                                        className="btn btn-remove"
                                        ref={this.closeButtonRef}
                                    >
                                        <b>Click to remove Building from list</b>
                                    </button>
                                </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RemoveBuilding;